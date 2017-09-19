// @flow
'use strict';

const fs = require('fs');
const cpr = require('cpr');
const path = require('path');
const findUp = require('find-up');
const promisify = require('typeable-promisify');

const slice = Array.prototype.slice;
const TEMP_PATH = path.join('/tmp', 'jest-fixture-');

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
  return promisify(cb => fs.mkdtemp(TEMP_PATH, cb));
}

function createTempDirSync() {
  return fs.mkdtempSync(TEMP_PATH);
}

function copyDir(sourceDir /*: string */, destDir /*: string */) {
  return promisify(cb => cpr(sourceDir, destDir, cb));
}

function copyDirIntoTempDir(sourceDir /*: string */) {
  return createTempDir().then(tempDir => copyDir(sourceDir, tempDir).then(files => ({tempDir, files})));
}

function copyFixtureIntoTempDir(cwd /*: string */ /*::, ...fileParts: Array<string> */) {
  return getFixturePath.apply(null, arguments).then(fixturePath => copyDirIntoTempDir(fixturePath));
}

module.exports = {
  getFixturePath,
  getFixturePathSync,
  createTempDir,
  createTempDirSync,
  copyDir,
  copyDirIntoTempDir,
  copyFixtureIntoTempDir,
};
