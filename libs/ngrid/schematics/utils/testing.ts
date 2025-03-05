import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

// export { getFileContent } from '@schematics/angular/utility/test';

import { Tree } from '@angular-devkit/schematics';

export function getFileContent(tree: Tree, filePath: string): string {
  const file = tree.read(filePath);
  if (!file) {
    throw new Error(`File ${filePath} does not exist.`);
  }
  return file.toString('utf-8');
}

function createWorkspace(runner: SchematicTestRunner): Promise<UnitTestTree> {
  return runner
      .runExternalSchematic('@schematics/angular', 'workspace', {
        name: 'workspace',
        version: '10.0.0',
        newProjectRoot: 'projects',
      });
}

/**
 * Creates a sample workspace with two applications: 'app' (default) and 'second-app'
 */
export async function createTestApp(runner: SchematicTestRunner, appOptions = {}): Promise<UnitTestTree> {
  let tree = await createWorkspace(runner);
  tree =
      await runner.runExternalSchematic('@schematics/angular', 'application', {name: 'app', ...appOptions}, tree);

  return runner
      .runExternalSchematic('@schematics/angular', 'application', {name: 'second-app', ...appOptions}, tree);
}
