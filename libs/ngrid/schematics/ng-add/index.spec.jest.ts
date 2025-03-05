import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

import { createTestApp, getFileContent } from '../utils/testing';
import * as messages from './messages';


describe(`ng add '@pebula/ngrid'`, () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async() => {
    runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
    appTree = await createTestApp(runner);
  });

  it(`should add missing dependencies to 'package.json'`, async() => {
    const tree = await runner.runSchematic('ng-add', {}, appTree);
    const {dependencies} = JSON.parse(getFileContent(tree, '/package.json'));

    expect(dependencies['@pebula/ngrid']).toBeDefined();
    expect(dependencies['@angular/cdk']).toBeDefined();
    expect(dependencies['@angular/material']).not.toBeDefined();
    expect(dependencies['@ng-bootstrap/ng-bootstrap']).not.toBeDefined();
  });

  it(`should add missing dependencies to 'package.json' with uiPlugin material`, async() => {
    const tree = await runner.runSchematic('ng-add', { uiPlugin: 'material' }, appTree);
    const {dependencies} = JSON.parse(getFileContent(tree, '/package.json'));

    expect(dependencies['@pebula/ngrid']).toBeDefined();
    expect(dependencies['@angular/cdk']).toBeDefined();
    expect(dependencies['@angular/material']).toBeDefined();
    expect(dependencies['@ng-bootstrap/ng-bootstrap']).not.toBeDefined();
  });


  it(`should add missing dependencies to 'package.json' with uiPlugin bootstrap`, async() => {
    const tree = await runner.runSchematic('ng-add', { uiPlugin: 'bootstrap' }, appTree);
    const {dependencies} = JSON.parse(getFileContent(tree, '/package.json'));

    expect(dependencies['@pebula/ngrid']).toBeDefined();
    expect(dependencies['@angular/cdk']).toBeDefined();
    expect(dependencies['@angular/material']).not.toBeDefined();
    expect(dependencies['@ng-bootstrap/ng-bootstrap']).toBeDefined();
  });

  it(`should report when specified 'project' is not found`, async() => {
    let message = '';
    try {
      await runner.runSchematic('ng-add', {project: 'test'}, appTree);
    } catch (e) {
      message = e.message;
    } finally {
      expect(message).toBe(messages.noProject('test'));
    }
  });
});
