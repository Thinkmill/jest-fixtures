# jest-fixtures

> [WIP]

## Installation

```sh
yarn add --dev jest-fixtures
```

## API

##### `getFixturePath(cwd, ...fileParts)`

```js
import {getFixturePath} from 'jest-fixtures';

test('example', async () => {
  let fixturePath = await getFixturePath(__dirname, 'fixture-name');
  let fixtureFilePath = await getFixturePath(__dirname, 'fixture-name', 'file.txt');
  // ...
});
```

##### `getFixturePathSync(cwd, ...fileParts)`

```js
import {getFixturePathSync} from 'jest-fixtures';

test('example', () => {
  let fixturePath = getFixturePathSync(__dirname, 'fixture-name');
  let fixtureFilePath = getFixturePathSync(__dirname, 'fixture-name', 'file.txt');
  // ...
});
```

##### `createTempDir()`

```js
import {createTempDir} from 'jest-fixtures';

test('example', async () => {
  let tempDirPath = await createTempDir();
  // ...
});
```

##### `createTempDirSync()`

```js
import {createTempDirSync} from 'jest-fixtures';

test('example', () => {
  let tempDirPath = createTempDirSync();
  // ...
});
```

##### `copyDir()`

```js
import {copyDir} from 'jest-fixtures';

test('example', async () => {
  await copyDir('/path/to/source/dir', '/path/to/dest/dir');
  // ...
});
```

##### `copyDirIntoTempDir()`

```js
import {copyDirIntoTempDir} from 'jest-fixtures';

test('example', async () => {
  let tempDir = await copyDirIntoTempDir('/path/to/source/dir');
  // ...
});
```

##### `copyFixtureIntoTempDir()`

```js
import {copyFixtureIntoTempDir} from 'jest-fixtures';

test('example', async () => {
  let tempDir = await copyFixtureIntoTempDir(__dirname, 'fixture-name');
  // ...
});
```

<!--

##### `loadFixture(fixturePath)` _[unimplemented]_

```js
import {getFixturePath, loadFixture} from 'jest-fixtures';

test('example', async () => {
  let fixturePath = await getFixturePath(__dirname, 'foo');
  let fixture = await loadFixture(fixturePath);
  // ...
});
```

##### `loadFixtureSync(fixturePath)` _[unimplemented]_

```js
import {getFixturePathSync, loadFixtureSync} from 'jest-fixtures';

test('example', () => {
  let fixturePath = getFixturePathSync(__dirname, 'foo');
  let fixture = loadFixtureSync(fixturePath);
  // ...
});
```

##### `createFsMock()` _[unimplemented]_

```js
// __mocks__/fs.js
import {createFsMock} from 'jest-fixtures';
module.exports = createFsMock();
```

##### `fsMock.__setFixture__(fixture)` _[unimplemented]_

```js
// __mocks__/fs.js
import {createFsMock} from 'jest-fixtures';
module.exports = createFsMock();
```

```js
import {getFixturePath, loadFixture} from 'jest-fixtures';
import * as fs from 'fs';

jest.mock('fs');

test('example', async () => {
  let fixturePath = await getFixturePath(__dirname, 'foo');
  let fixture = await loadFixture(fixturePath);
  fs.__setFixture__(fixture);
  // ...
});
```

-->
