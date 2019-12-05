# generator-fast-forward
A small utility to ease the stepping-through of ES6 generator code. I use it primarily for testing ES6 generators. Very simple to use, no external dependencies. Here is the test file:

```javascript
function* generator() {
  try {
    yield 1;
    const john = yield "john";
    yield 2;
    yield `${john}ny`;
    const su = yield "su";
    yield 3;
    yield `${su}san and ${john}ny`;
  } catch (error) {
    console.log(error);
  }
}

describe('generatorFF', () => {
  test('it works 1', () => {
    const gen = generator();
    generatorFF(0)(gen);

    expect(gen.next().value).toEqual(1);
  });

  test('it works 2', () => {
    const gen = generator();
    generatorFF(1)(gen);

    expect(gen.next().value).toEqual('john');
  });

  test('it works 3', () => {
    const gen = generator();
    generatorFF(2)(gen);

    expect(gen.next('john').value).toEqual(2);
  });

  test('it works 4', () => {
    const gen = generator();
    generatorFF(3)(gen, [{index: 2, value: 'john'}]);

    expect(gen.next().value).toEqual('johnny');
  });

  test('it works 5', () => {
    const gen = generator();
    generatorFF(4)(gen);

    expect(gen.next().value).toEqual('su');
  });

  test('it works 6', () => {
    const gen = generator();
    generatorFF(5)(gen);

    expect(gen.next('su').value).toEqual(3);
  });

  test('it works 7', () => {
    const gen = generator();
    generatorFF(6)(gen, [{index: 2, value: 'john'}, {index: 5, value: 'su'}]);

    expect(gen.next().value).toEqual('susan and johnny');
  });

  test('it works throws', () => {
    const gen = generator();
    sinon.spy(console, 'log');
    generatorFF(4)(gen, [], [{index: 3, value: new Error('error')}]);

    expect(console.log.calledOnce).toBe(true);
    console.log.restore();
  });
});
```
