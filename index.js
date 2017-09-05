// @flow
'use strict';

const fs = require('fs');
const path = require('path');
const findUp = require('find-up');
const promisify = require('typeable-promisify');

const slice = Array.prototype.slice;

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
