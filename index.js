// @flow
'use strict';

const fs = require('fs-extra');
const path = require('path');
const findUp = require('find-up');
const promisify = require('typeable-promisify');
const onExit = require('signal-exit');
const rimraf = require('rimraf');

const slice = Array.prototype.slice;
const TEMP_PATH = path.join('/tmp', 'jest-fixture-');
const TEMP_DIRS_CREATED = [];

function toFixturesDir(fileParts) {
  return path.join.apply(null, ['__fixtures__'].concat(fileParts));
}

function getFixturePath(cwd /*: string */ /*::, ...fileParts: Array<string> */) {
  let args = Array.prototype.slice.call(arguments, 1);
  return findUp(toFixturesDir(args), { cwd });
}

function getFixturePathSync(cwd /*: string */ /*::, ...fileParts: Array<string> */) {
  let args = Array.prototype.slice.call(arguments, 1);
  return findUp.sync(toFixturesDir(args), { cwd });
}

function createTempDir() {
  return promisify(cb => fs.mkdtemp(TEMP_PATH, cb)).then(tempDir => {
    TEMP_DIRS_CREATED.push(tempDir);
    return tempDir;
  });
}

function createTempDirSync() {
  let tempDir = fs.mkdtempSync(TEMP_PATH);
  TEMP_DIRS_CREATED.push(tempDir);
  return tempDir;
}

function copyDir(sourceDir /*: string */, destDir /*: string */) {
  return promisify(cb => fs.copy(sourceDir, destDir, cb));
}

function copyDirIntoTempDir(sourceDir /*: string */) {
  return createTempDir().then(tempDir => copyDir(sourceDir, tempDir).then(() => (tempDir)));
}

function copyFixtureIntoTempDir(cwd /*: string */ /*::, ...fileParts: Array<string> */) {
  return getFixturePath.apply(null, arguments).then(fixturePath => copyDirIntoTempDir(fixturePath));
}

function cleanupTempDirs() {
  TEMP_DIRS_CREATED.forEach(tempDir => {
    try {
      rimraf.sync(tempDir);
    } catch (err) {}
  });
  TEMP_DIRS_CREATED.length = 0;
}

onExit(cleanupTempDirs);

module.exports = {
  getFixturePath,
  getFixturePathSync,
  createTempDir,
  createTempDirSync,
  copyDir,
  copyDirIntoTempDir,
  copyFixtureIntoTempDir,
  cleanupTempDirs,
};
