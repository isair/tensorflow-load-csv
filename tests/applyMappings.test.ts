/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CsvTable } from '../src/loadCsv.models';
import applyMappings from '../src/applyMappings';
import { mulberry32 } from '../src/shuffle';

let data: CsvTable = [];

beforeEach(() => {
  data = [
    ['lat', 'lng', 'height', 'temperature'],
    [0.234, 1.47, 849.7, 64.4],
    [-293.2, 103.34, 715.2, 73.4],
  ];
});

test('Applying mappings works correctly', () => {
  applyMappings(data, {
    height: (ft) => Number(ft) * 0.3048, // feet to meters
    temperature: (f) => (Number(f) - 32) / 1.8, // fahrenheit to celsius
  });
  // @ts-ignore
  expect(data).toBeDeepCloseTo(
    [
      ['lat', 'lng', 'height', 'temperature'],
      [0.234, 1.47, 258.98856, 18],
      [-293.2, 103.34, 217.99296, 23],
    ],
    3
  );
});

test('Flattening works correctly', () => {
  applyMappings(
    data,
    {
      height: (ft) => (Number(ft) < 800 ? [1, 0] : [0, 1]), // short, long classification
    },
    new Set(['height'])
  );
  // @ts-ignore
  expect(data).toBeDeepCloseTo(
    [
      ['lat', 'lng', 'height', 'height', 'temperature'],
      [0.234, 1.47, 0, 1, 64.4],
      [-293.2, 103.34, 1, 0, 73.4],
    ],
    3
  );
});

test('Flattening throws an error when value is not an array', () => {
  expect(() =>
    applyMappings(
      data,
      {
        height: (ft) => Number(ft) * 2,
      },
      new Set(['height'])
    )
  ).toThrowError(
    "Column 'height' is marked to be flattened but its mapping function did not return an array"
  );
});

test('Flattening throws an error when array lengths for the same column differ', () => {
  expect(() =>
    applyMappings(
      data,
      {
        height: (ft) => {
          const arr = new Array(Math.floor(mulberry32(Number(ft))() * 10));
          arr[0] = ft;
          return arr;
        },
      },
      new Set(['height'])
    )
  ).toThrowError(
    "Mapping function for column 'height' needs to always return arrays of the same length"
  );
});
