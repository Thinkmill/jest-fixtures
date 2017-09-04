// @flow
'use strict';

const path = require('path');
const findUp = require('find-up');

function getFixturePath(cwd /*: string */, name /*: string */) {
  return findUp(path.join('__fixtures__', name), { cwd });
}

function getFixturePathSync(cwd /*: string */, name /*: string */) {
  return findUp.sync(path.join('__fixtures__', name), { cwd });
}

module.exports = {
  getFixturePath,
  getFixturePathSync,
};
