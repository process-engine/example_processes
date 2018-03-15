'use strict';

const gulptraum = require('gulptraum');
const gulptraumTypescriptPlugin = require('gulptraum-typescript');
const tsconfig = require('tsconfig');
const spawn = require('child_process').spawn;

const buildSystemConfig = {
};

const buildSystem = new gulptraum.BuildSystem(buildSystemConfig);

buildSystem.config = buildSystemConfig;

const tsConfigObj = tsconfig.loadSync('.');

const typeScriptConfig = Object.assign({
  compileToModules: ['commonjs']
}, tsConfigObj.config);

const gulp = require('gulp');



gulp.task('au-build', (done) => {

  spawn('au', ['build'], {
    cwd: 'frontend/',
    stdio: 'inherit'
  }).on('close', done);
});

buildSystem
  .registerPlugin('typescript', gulptraumTypescriptPlugin, typeScriptConfig)
  .registerTasks(gulp);
