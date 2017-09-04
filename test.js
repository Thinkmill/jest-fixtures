// @flow
'use strict';

const {getFixturePath, getFixturePathSync} = require('./');
const path = require('path');

const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const NESTED_DIR = path.join(FIXTURES_DIR, 'nested');

const FOO_DIR = path.join(FIXTURES_DIR, '__fixtures__', 'foo');
const BAR_DIR = path.join(NESTED_DIR, '__fixtures__', 'bar');

const FOO_FILE_TXT = path.join(FOO_DIR, 'file.txt');

describe('getFixturePath()', () => {
  it('should work in the current dir', async () => {
    let fixturePath = await getFixturePath(NESTED_DIR, 'bar');
    expect(fixturePath).toEqual(BAR_DIR);
  });

  it('should work in the parent dir', async () => {
    let fixturePath = await getFixturePath(NESTED_DIR, 'foo');
    expect(fixturePath).toEqual(FOO_DIR);
  });

  it('should work with a nested file', async () => {
    let fixturePath = await getFixturePath(NESTED_DIR, 'foo', 'file.txt');
    expect(fixturePath).toEqual(FOO_FILE_TXT);
  });
});

describe('getFixturePathSync()', () => {
  it('should work in the current dir', () => {
    let fixturePath = getFixturePathSync(NESTED_DIR, 'bar');
    expect(fixturePath).toEqual(BAR_DIR);
  });

  it('should work in the parent dir', () => {
    let fixturePath = getFixturePathSync(NESTED_DIR, 'foo');
    expect(fixturePath).toEqual(FOO_DIR);
  });

  it('should work with a nested file', () => {
    let fixturePath = getFixturePathSync(NESTED_DIR, 'foo', 'file.txt');
    expect(fixturePath).toEqual(FOO_FILE_TXT);
  });
});
