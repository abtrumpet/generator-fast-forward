const generatorFastForward = amount => (generator, input = [], throws = []) => {
  if (!Array.isArray(input))
    throw new TypeError("input must be an array");

  if (!Array.isArray(throws))
    throw new TypeError("throws must be an array");

  for (let x = 0; x < amount; x++) {
    const value = input &&
      input.find(y => y && y.index == x) &&
      input.find(y => y && y.index == x).value;

    const error = throws &&
      throws.find(y => y && y.index == x) &&
      throws.find(y => y && y.index == x).value;

    if (error)
      generator.throw(error);
    else if (value !== undefined)
      generator.next(value).value;
    else
      generator.next().value;
  }
};

module.exports = generatorFastForward;
