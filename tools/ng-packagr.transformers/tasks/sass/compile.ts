import * as Path from 'path';
import { dest, task, series } from 'gulp';

import * as log from 'ng-packagr/lib/utils/log';

import { EntryPointTaskContext, Job } from 'ng-cli-packagr-tasks';
import { CopyFile } from 'ng-cli-packagr-tasks/dist/tasks/copy-file';

import { buildScssPipeline } from './build-scss-pipeline';

declare module 'ng-cli-packagr-tasks/dist/build/hooks' {
  interface NgPackagrBuilderTaskSchema {
    sassCompile: {
      entries: string[];
    }
  }
}

async function sassCompileTask(context: EntryPointTaskContext) {
  const globalContext = context.context();
  if (context.epNode.data.entryPoint.isSecondaryEntryPoint) {
    return;
  }

  const { builderContext, root, projectRoot, sourceRoot, options } = globalContext;

  // In Angular 19, we need to access the configuration differently
  // Try to find sassCompile configuration in the options
  if (!options || typeof options !== 'object') {
    return;
  }

  // Cast options to any to bypass TypeScript checks and explore its structure
  const anyOptions = options as any;

  // Check the structure of options to find where sassCompile config might be
  let sassCompileConfig;

  if (anyOptions.sassCompile) {
    sassCompileConfig = anyOptions.sassCompile;
  } else if (anyOptions.tasks?.data?.sassCompile) {
    sassCompileConfig = anyOptions.tasks.data.sassCompile;
  } else if (anyOptions.data?.sassCompile) {
    sassCompileConfig = anyOptions.data.sassCompile;
  }

  // Log what's available to help debug
  console.log('Options structure:', Object.keys(anyOptions));

  if (!sassCompileConfig) {
    log.info('No sassCompile configuration found in options');
    return;
  }

  const copyPatterns = CopyFile.createCopyPatterns(
    sassCompileConfig.entries,
    root,
    projectRoot,
    sourceRoot,
  );
  log.info('Compiling sass bundles...');

  const destPath = Path.join(root, copyPatterns[0].to);

  const taskName = context.epNode.data.entryPoint.moduleId + ':css';
  task(taskName, () => {
    return buildScssPipeline(copyPatterns[0].context, [ Path.join(root, 'node_modules/') ], true).pipe(dest(destPath));
  });

  try {
    await new Promise<void>( (resolve, reject) => {
      series(taskName)( (err?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    builderContext.logger.error(err.toString());
    throw err;
  }
}

@Job({
  schema: Path.resolve(__dirname, 'compile.schema.json'),
  selector: 'sassCompile',
  hooks: {
    writePackage: {
      before: sassCompileTask
    }
  }
})
export class SassCompile { }
