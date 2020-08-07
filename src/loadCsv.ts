import fs from 'fs';

import * as tf from '@tensorflow/tfjs';
import { shuffle } from 'shuffle-seed';

import { CsvReadOptions, CsvTable } from './loadCsv.models';
import filterColumns from './filterColumns';
import splitTestData from './splitTestData';

const defaultShuffleSeed = 'mncv9340ur';

const loadCsv = (filename: string, options: CsvReadOptions) => {
  const {
    featureColumns,
    labelColumns,
    shuffle: shouldShuffle = false,
    splitTest = false,
    prependOnes = false,
    standardise = false,
  } = options;

  const data = fs
    .readFileSync(filename, { encoding: 'utf-8' })
    .split('\n')
    .map((line) => line.split(','))
    .filter((row) => row.length !== 0 && (row.length !== 1 || row[0] !== ''))
    .map((row, i) =>
      i === 0
        ? row
        : row.map((element) => {
            const number = parseFloat(element.replace('"', ''));
            return Number.isNaN(number) ? element : number;
          })
    );

  const tables: { [key: string]: CsvTable } = {
    labels: filterColumns(data, labelColumns),
    features: filterColumns(data, featureColumns),
    testFeatures: [],
    testLabels: [],
  };

  tables.labels.shift();
  tables.features.shift();

  if (shouldShuffle) {
    const seed =
      typeof shouldShuffle === 'string' ? shouldShuffle : defaultShuffleSeed;
    tables.features = shuffle(tables.features, seed);
    tables.labels = shuffle(tables.labels, seed);
  }

  if (splitTest) {
    Object.assign(
      tables,
      splitTestData(tables.features, tables.labels, splitTest)
    );
  }

  let features = tf.tensor(tables.features);
  let testFeatures = tf.tensor(tables.testFeatures);

  const labels = tf.tensor(tables.labels);
  const testLabels = tf.tensor(tables.testLabels);

  const { mean, variance } = tf.moments(features, 0);

  if (standardise) {
    features = features.sub(mean).div(variance.pow(0.5));
    testFeatures = testFeatures.sub(mean).div(variance.pow(0.5));
  }

  if (prependOnes) {
    features = tf.ones([features.shape[0], 1]).concat(features, 1);
    testFeatures = tf.ones([testFeatures.shape[0], 1]).concat(testFeatures, 1);
  }

  return {
    features,
    labels,
    testFeatures,
    testLabels,
    mean,
    variance,
  };
};

export default loadCsv;
