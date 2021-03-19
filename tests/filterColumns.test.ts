import filterColumns from '../src/filterColumns';

const data = [
  ['lat', 'lng', 'country'],
  ['0', '1.47', 'SomeCountria'],
  ['1', '103.34', 'SomeOtherCountria'],
];

test('Filtering a single column works correctly', () => {
  const result = filterColumns(data, ['lng']);
  expect(result).toMatchObject([['lng'], ['1.47'], ['103.34']]);
});

test('Filtering multiple columns works correctly, respects order in second argument, does not break with multiple same name columns', () => {
  const result = filterColumns(data, ['country', 'lat']); // Column order from the CSV should be preserved.
  expect(result).toMatchObject([
    ['country', 'lat'],
    ['SomeCountria', '0'],
    ['SomeOtherCountria', '1'],
  ]);
});
