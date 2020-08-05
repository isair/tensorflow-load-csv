/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@tensorflow/tfjs-node';

import loadCsv from '../src';

const filePath = './assets/csv/simple.csv';

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

test('Shuffling should work and preserve feature - label pairs', () => {
  const { features, labels } = loadCsv(filePath, {
    featureColumns: ['lat', 'lng'],
    labelColumns: ['country'],
    shuffle: true,
  });
  // @ts-ignore
  expect(features.arraySync()).toBeDeepCloseTo(
    [
      [102, -164],
      [5, 40.34],
      [0.234, 1.47],
      [-93.2, 103.34],
    ],
    3
  );
  expect(labels.arraySync()).toMatchObject([
    ['Landotzka'],
    ['Landistan'],
    ['SomeCountria'],
    ['SomeOtherCountria'],
  ]);
});

test('Shuffling with a custom seed should work', () => {
  const { features, labels } = loadCsv(filePath, {
    featureColumns: ['lat', 'lng'],
    labelColumns: ['country'],
    shuffle: 'hello-is-it-me-you-are-looking-for',
  });
  // @ts-ignore
  expect(features.arraySync()).toBeDeepCloseTo(
    [
      [5, 40.34],
      [102, -164],
      [0.234, 1.47],
      [-93.2, 103.34],
    ],
    3
  );
  expect(labels.arraySync()).toMatchObject([
    ['Landistan'],
    ['Landotzka'],
    ['SomeCountria'],
    ['SomeOtherCountria'],
  ]);
});

test('Loading with all extra options other than shuffle as true should work', () => {
  const {
    features,
    labels,
    testFeatures,
    testLabels,
    mean,
    variance,
  } = loadCsv(filePath, {
    featureColumns: ['lat', 'lng'],
    labelColumns: ['country'],
    splitTest: true,
    prependOnes: true,
    standardise: true,
  });
  // @ts-ignore
  expect(features.arraySync()).toBeDeepCloseTo(
    [
      [1, 1, -1],
      [1, -1, 1],
    ],
    3
  );
  expect(labels.arraySync()).toMatchObject([
    ['SomeCountria'],
    ['SomeOtherCountria'],
  ]);
  // @ts-ignore
  expect(testFeatures.arraySync()).toBeDeepCloseTo(
    [
      [1, 1.102, -0.236],
      [1, 3.178, -4.248],
    ],
    3
  );
  expect(testLabels.arraySync()).toMatchObject([['Landistan'], ['Landotzka']]);
  // @ts-ignore
  expect(mean.arraySync()).toBeDeepCloseTo([-46.482, 52.404], 3);
  // @ts-ignore
  expect(variance.arraySync()).toBeDeepCloseTo([2182.478, 2594.374], 3);
});
