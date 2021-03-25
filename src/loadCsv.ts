import fs from 'fs';

import * as tf from '@tensorflow/tfjs';

import { CsvReadOptions, CsvTable } from './loadCsv.models';
import filterColumns from './filterColumns';
import splitTestData from './splitTestData';
import applyMappings from './applyMappings';
import shuffle from './shuffle';
import standardise from './standardise';

const defaultShuffleSeed = 'mncv9340ur';

const parseCsv = (filename: string) =>
  fs
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

const loadCsv = (
  filename: string,
  {
    featureColumns,
    labelColumns,
    mappings = {},
    shuffle: shouldShuffleOrSeed = false,
    splitTest,
    prependOnes = false,
    standardise: columnsToStandardise = [],
    flatten = [],
  }: CsvReadOptions
) => {
  const data = parseCsv(filename);

  if (data.length < 2) {
    throw new Error('CSV file can not be shorter than two rows');
  }

  const tables: { [key: string]: CsvTable } = {
    labels: filterColumns(data, labelColumns),
    features: filterColumns(data, featureColumns),
    testFeatures: [],
    testLabels: [],
  };

  const flattenSet = new Set(flatten);

  applyMappings(tables.labels, mappings, flattenSet);
  applyMappings(tables.features, mappings, flattenSet);

  tables.labels.shift();
  const featureColumnNames = tables.features.shift() as string[];

  if (shouldShuffleOrSeed) {
    const seed =
      typeof shouldShuffleOrSeed === 'string'
        ? shouldShuffleOrSeed
        : defaultShuffleSeed;
    tables.features = shuffle(tables.features, seed);
    tables.labels = shuffle(tables.labels, seed);
  }

  if (splitTest) {
    Object.assign(
      tables,
      splitTestData(tables.features, tables.labels, splitTest)
    );
  }

  return tf.tidy(() => {
    let features = tf.tensor(tables.features);
    let testFeatures = tf.tensor(tables.testFeatures);

    const labels = tf.tensor(tables.labels);
    const testLabels = tf.tensor(tables.testLabels);

    if (columnsToStandardise.length > 0) {
      const result = standardise(
        features,
        testFeatures,
        featureColumnNames.map((c) => columnsToStandardise.includes(c))
      );
      features = result.features;
      testFeatures = result.testFeatures;
    }

    if (prependOnes) {
      features = tf.ones([features.shape[0], 1]).concat(features, 1);
      testFeatures = tf
        .ones([testFeatures.shape[0], 1])
        .concat(testFeatures, 1);
    }

    return {
      features,
      labels,
      testFeatures,
      testLabels,
    };
  });
};

export default loadCsv;
