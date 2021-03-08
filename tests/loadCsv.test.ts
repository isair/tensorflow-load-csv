/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@tensorflow/tfjs-node';

import loadCsv from '../src';

const filePath = './assets/csv/simple.csv';

test('Loading an empty table should throw an error', () => {
  expect(() =>
    loadCsv('./assets/csv/empty.csv', {
      featureColumns: ['feature'],
      labelColumns: ['label'],
    })
  ).toThrowError('CSV file can not be shorter than two rows');
});

test('Loading a table with just headers should throw an error', () => {
  expect(() =>
    loadCsv('./assets/csv/headers.csv', {
      featureColumns: ['feature'],
      labelColumns: ['label'],
    })
  ).toThrowError('CSV file can not be shorter than two rows');
});

test('Loading with only the required options should work', () => {
  const { features, labels } = loadCsv(filePath, {
    featureColumns: ['lat', 'lng'],
    labelColumns: ['country'],
  });
  // @ts-ignore
  expect(features.arraySync()).toBeDeepCloseTo(
    [
      [0.234, 1.47],
      [-93.2, 103.34],
      [5, 40.34],
      [102, -164],
    ],
    3
  );
  expect(labels.arraySync()).toMatchObject([
    ['SomeCountria'],
    ['SomeOtherCountria'],
    ['Landistan'],
    ['Landotzka'],
  ]);
});

test('Loading with all extra options should work', () => {
  const { features, labels, testFeatures, testLabels } = loadCsv(filePath, {
    featureColumns: ['lat', 'lng'],
    labelColumns: ['country'],
    mappings: {
      country: (name) => (name as string).toUpperCase(),
      lat: (lat) => ((lat as number) > 0 ? [0, 1] : [1, 0]), // South or North classification
    },
    flatten: ['lat'],
    shuffle: true,
    splitTest: true,
    prependOnes: true,
    standardise: ['lng'],
  });
  // @ts-ignore
  expect(features.arraySync()).toBeDeepCloseTo(
    [
      [1, 0, 1, 1],
      [1, 0, 1, -1],
    ],
    3
  );
  expect(labels.arraySync()).toMatchObject([['LANDISTAN'], ['SOMECOUNTRIA']]);
  // @ts-ignore
  expect(testFeatures.arraySync()).toBeDeepCloseTo(
    [
      [1, 1, 0, 4.241],
      [1, 0, 1, -9.514],
    ],
    3
  );
  expect(testLabels.arraySync()).toMatchObject([
    ['SOMEOTHERCOUNTRIA'],
    ['LANDOTZKA'],
  ]);
});

test('Loading with custom seed should use the custom seed', () => {
  const { features } = loadCsv(filePath, {
    featureColumns: ['lat', 'lng'],
    labelColumns: ['country'],
    shuffle: true,
  });
  const { features: featuresCustom } = loadCsv(filePath, {
    featureColumns: ['lat', 'lng'],
    labelColumns: ['country'],
    shuffle: 'sdhjhdf',
  });
  // @ts-ignore
  expect(features).not.toBeDeepCloseTo(featuresCustom, 1);
});
