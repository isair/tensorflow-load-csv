import shuffle from '../src/shuffle';

const data = [1, 2, 3, 4];

test('Shuffling without a seed should change order', () => {
  expect(shuffle(data)).toEqual([4, 3, 1, 2]);
});

test('Shuffling should not modify the original array', () => {
  expect(shuffle(data)).not.toEqual(data);
});

test('Shuffling with a number seed should change order', () => {
  expect(shuffle(data, 7)).toEqual([3, 2, 4, 1]);
});

test('Shuffling with a string seed should change order', () => {
  expect(shuffle(data, 'hello')).toEqual([2, 4, 3, 1]);
});

test('Shuffling with different seeds should produce different results', () => {
  const results = [shuffle(data, 7), shuffle(data, 'hello')];
  expect(results[0]).not.toEqual(results[2]);
});
