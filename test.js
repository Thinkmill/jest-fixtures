// @flow
'use strict';

const fixtures = require('./');
const fs = require('fs');
const path = require('path');

const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const NESTED_DIR = path.join(FIXTURES_DIR, 'nested');

const FOO_DIR = path.join(FIXTURES_DIR, '__fixtures__', 'foo');
const BAR_DIR = path.join(NESTED_DIR, '__fixtures__', 'bar');

const FOO_FILE_TXT = path.join(FOO_DIR, 'file.txt');

describe('getFixturePath()', () => {
  it('should work in the current dir', () => {
    return fixtures.getFixturePath(NESTED_DIR, 'bar').then(fixturePath => {
      expect(fixturePath).toEqual(BAR_DIR);
    });
  });

  it('should work in the parent dir', () => {
    return fixtures.getFixturePath(NESTED_DIR, 'foo').then(fixturePath => {
      expect(fixturePath).toEqual(FOO_DIR);
    });
  });

  it('should work with a nested file', () => {
    return fixtures.getFixturePath(NESTED_DIR, 'foo', 'file.txt').then(fixturePath => {
      expect(fixturePath).toEqual(FOO_FILE_TXT);
    });
  });
});

describe('getFixturePathSync()', () => {
  it('should work in the current dir', () => {
    let fixturePath = fixtures.getFixturePathSync(NESTED_DIR, 'bar');
    expect(fixturePath).toEqual(BAR_DIR);
  });

  it('should work in the parent dir', () => {
    let fixturePath = fixtures.getFixturePathSync(NESTED_DIR, 'foo');
    expect(fixturePath).toEqual(FOO_DIR);
  });

  it('should work with a nested file', () => {
    let fixturePath = fixtures.getFixturePathSync(NESTED_DIR, 'foo', 'file.txt');
    expect(fixturePath).toEqual(FOO_FILE_TXT);
  });
});

describe('createTempDir', () => {
  it('should create a directory in /tmp', () => {
    return fixtures.createTempDir().then(dirName => {
      expect(dirName.startsWith('/tmp/jest-fixture-')).toBe(true);
      let stat = fs.statSync(dirName);
      expect(stat.isDirectory()).toBe(true);
    });
  });
});

describe('createTempDirSync', () => {
  it('should create a directory in /tmp', () => {
    let dirName = fixtures.createTempDirSync();
    expect(dirName.startsWith('/tmp/jest-fixture-')).toBe(true);
    let stat = fs.statSync(dirName);
    expect(stat.isDirectory()).toBe(true);
  });
});

function assertCopiedFiles(tempDir) {
  expect(fs.lstatSync(path.join(tempDir, 'symlink-to-file')).isSymbolicLink()).toBe(true);
  expect(fs.lstatSync(path.join(tempDir, 'file.txt')).isFile()).toBe(true);
  expect(fs.lstatSync(path.join(tempDir, 'nested')).isDirectory()).toBe(true);
  expect(fs.lstatSync(path.join(tempDir, 'nested', 'nested-file.txt')).isFile()).toBe(true);
}

describe('copyDir', () => {
  it('should copy files into a directory', () => {
    let tempDir = fixtures.createTempDirSync();
    let fixturePath = fixtures.getFixturePathSync(NESTED_DIR, 'bar');

    return fixtures.copyDir(fixturePath, tempDir).then(() => {
      assertCopiedFiles(tempDir);
    });
  });
});

describe('copyDirIntoTempDir', () => {
  it('should copy files into a directory', () => {
    let fixturePath = fixtures.getFixturePathSync(NESTED_DIR, 'bar');
    return fixtures.copyDirIntoTempDir(fixturePath).then(tempDir => {
      assertCopiedFiles(tempDir);
    });
  });
});

describe('copyFixtureIntoTempDir', () => {
  it('should copy files into a directory', () => {
    return fixtures.copyFixtureIntoTempDir(NESTED_DIR, 'bar').then(tempDir => {
      assertCopiedFiles(tempDir);
    });
  });
});
