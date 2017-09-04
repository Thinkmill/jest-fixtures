// @flow
'use strict';

const path = require('path');
const findUp = require('find-up');

function getFixturePath(cwd /*: string */, ...fileParts /*: Array<string> */) {
  return findUp(path.join('__fixtures__', ...fileParts), { cwd });
}

function getFixturePathSync(cwd /*: string */, ...fileParts /*: Array<string> */) {
  return findUp.sync(path.join('__fixtures__', ...fileParts), { cwd });
}

module.exports = {
  getFixturePath,
  getFixturePathSync,
};
