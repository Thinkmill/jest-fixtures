// @flow
'use strict';

const fs = require('fs');
const path = require('path');
const findUp = require('find-up');
const promisify = require('typeable-promisify');

function getFixturePath(cwd /*: string */, ...fileParts /*: Array<string> */) {
  return findUp(path.join('__fixtures__', ...fileParts), { cwd });
}

function getFixturePathSync(cwd /*: string */, ...fileParts /*: Array<string> */) {
  return findUp.sync(path.join('__fixtures__', ...fileParts), { cwd });
}

function getTempPath(name) {
  return path.join('/tmp', name + '-');
}

function createTempDir(name /*: string */) {
  return promisify(cb => fs.mkdtemp(getTempPath(name), cb));
}

function createTempDirSync(name /*: string */) {
  return fs.mkdtempSync(getTempPath(name));
}

module.exports = {
  getFixturePath,
  getFixturePathSync,
  createTempDir,
  createTempDirSync,
};
