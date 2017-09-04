# jest-fixtures

> [WIP]

## Installation

```sh
yarn add --dev jest-fixtures
```

## API

##### `getFixturePath(cwd, name)`

```js
import {getFixturePath} from 'jest-fixtures';

test('foo', async () => {
  let fixturePath = await getFixturePath(__dirname, 'foo');
  // ...
});
```

##### `getFixturePathSync(cwd, name)`

```js
import {getFixturePathSync} from 'jest-fixtures';

test('foo', () => {
  let fixturePath = getFixturePathSync(__dirname, 'foo');
  // ...
});
```

##### `loadFixture(fixturePath)` _[unimplemented]_

```js
import {getFixturePath, loadFixture} from 'jest-fixtures';

test('foo', async () => {
  let fixturePath = await getFixturePath(__dirname, 'foo');
  let fixture = await loadFixture(fixturePath);
  // ...
});
```

##### `loadFixtureSync(fixturePath)` _[unimplemented]_

```js
import {getFixturePathSync, loadFixtureSync} from 'jest-fixtures';

test('foo', () => {
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

test('foo', async () => {
  let fixturePath = await getFixturePath(__dirname, 'foo');
  let fixture = await loadFixture(fixturePath);
  fs.__setFixture__(fixture);
  // ...
});
```
