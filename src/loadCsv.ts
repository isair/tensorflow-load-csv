import fs from 'fs';

import * as tf from '@tensorflow/tfjs';
import { shuffle } from 'shuffle-seed';

import { CsvReadOptions } from './loadCsv.models';
import filterColumns from './filterColumns';

const shuffleSeed = 'mncv9340ur'; // TODO: Randomise this.

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

  let labels = filterColumns(data, labelColumns);
  let features = filterColumns(data, featureColumns);
  let testFeatures: (string | number)[][] = [];
  let testLabels: (string | number)[][] = [];

  features.shift();
  labels.shift();

  if (shouldShuffle) {
    features = shuffle(features, shuffleSeed);
    labels = shuffle(labels, shuffleSeed);
  }

  if (splitTest) {
    const length =
      typeof splitTest === 'number'
        ? Math.max(0, Math.min(splitTest, features.length - 1))
        : Math.floor(features.length / 2);

    testFeatures = features.slice(length);
    testLabels = labels.slice(length);
    features = features.slice(0, length);
    labels = labels.slice(0, length);
  }

  let featuresTensor = tf.tensor(features);
  let testFeaturesTensor = tf.tensor(testFeatures);

  const labelsTensor = tf.tensor(labels);
  const testLabelsTensor = tf.tensor(testLabels);

  const { mean, variance } = tf.moments(featuresTensor, 0);

  if (standardise) {
    featuresTensor = featuresTensor.sub(mean).div(variance.pow(0.5));
    testFeaturesTensor = testFeaturesTensor.sub(mean).div(variance.pow(0.5));
  }

  if (prependOnes) {
    featuresTensor = tf
      .ones([featuresTensor.shape[0], 1])
      .concat(featuresTensor, 1);
    testFeaturesTensor = tf
      .ones([testFeaturesTensor.shape[0], 1])
      .concat(testFeaturesTensor, 1);
  }

  return {
    features: featuresTensor,
    labels: labelsTensor,
    testFeatures: testFeaturesTensor,
    testLabels: testLabelsTensor,
    mean,
    variance,
  };
};

export default loadCsv;
