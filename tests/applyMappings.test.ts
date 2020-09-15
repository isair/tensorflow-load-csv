/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CsvReadOptions } from '../src/loadCsv.models';
import applyMappings from '../src/applyMappings';

const data = [
  ['lat', 'lng', 'height', 'temperature'],
  [0.234, 1.47, 849.7, 64.4],
  [-293.2, 103.34, 715.2, 73.4],
];

const mappings: NonNullable<CsvReadOptions['mappings']> = {
  height: (ft) => Number(ft) * 0.3048, // feet to meters
  temperature: (f) => (Number(f) - 32) / 1.8, // fahrenheit to celsius
};

test('Applying mappings works correctly', () => {
  const mappedData = applyMappings(data, mappings);
  // @ts-ignore
  expect(mappedData).toBeDeepCloseTo(
    [
      ['lat', 'lng', 'height', 'temperature'],
      [0.234, 1.47, 258.98856, 18],
      [-293.2, 103.34, 217.99296, 23],
    ],
    3
  );
});

test('Applying mappings does not break with a table with just headers', () => {
  const tableOnlyHeaders = [['lat', 'lng', 'height', 'temperature']];
  const mappedData = applyMappings(tableOnlyHeaders, mappings);
  expect(mappedData).toMatchObject(tableOnlyHeaders);
});

test('Applying mappings does not break with an empty table', () => {
  const mappedData = applyMappings([], mappings);
  expect(mappedData).toMatchObject([]);
});
