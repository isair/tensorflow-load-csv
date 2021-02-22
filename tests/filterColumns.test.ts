import filterColumns from '../src/filterColumns';

const data = [
  ['lat', 'lng', 'country'],
  ['0.234', '1.47', 'SomeCountria'],
  ['-293.2', '103.34', 'SomeOtherCountria'],
];

test('Filtering a single column works correctly', () => {
  const result = filterColumns(data, ['lng']);
  expect(result).toMatchObject([['lng'], ['1.47'], ['103.34']]);
});

test('Filtering multiple columns works correctly', () => {
  const result = filterColumns(data, ['country', 'lng']); // Column order from the CSV should be preserved.
  expect(result).toMatchObject([
    ['lng', 'country'],
    ['1.47', 'SomeCountria'],
    ['103.34', 'SomeOtherCountria'],
  ]);
});
