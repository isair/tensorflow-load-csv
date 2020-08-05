# tensorflow-load-csv

A library that aims to remove the overhead of creating tensors from CSV files completely; allowing you to dive right into the fun parts of your ML project.

- Lightweight.
- Fast.
- Flexible.
- TypeScript compatible.
- 100% test coverage.

## Installation

NPM:
```sh
npm install tensorflow-load-csv
```

Yarn:
```sh
yarn add tensorflow-load-csv
```

## Usage

Simple usage:
```js
import loadCsv from 'tensorflow-load-csv';

const { features, labels } = loadCsv('./data.csv', {
  featureColumns: ['lat', 'lng', 'height'],
  labelColumns: ['temperature'],
});

features.print();
labels.print();
```

Advanced usage:
```js
import loadCsv from 'tensorflow-load-csv';

const {
  features,
  labels,
  testFeatures,
  testLabels,
  mean, // tensor holding mean of features, ignores testFeatures
  variance, // tensor holding variance of features, ignores testFeatures
} = loadCsv('./data.csv', {
  featureColumns: ['lat', 'lng', 'height'],
  labelColumns: ['temperature'],
  shuffle: true, // Pass true to shuffle with a fixed seed, or a string to use it as a seed for the shuffling.
  splitTest: true, // Splits your data in half. You can also provide a certain row count for the test data.
  prependOnes: true, // Prepends a column of 1s to your features and testFeatures tensors, useful for linear regression.
  standardise: true, // Calculates mean and variance for each feature column using data only in features, then standardises the values in features and testFeatures. Does not touch labels.
});

features.print();
labels.print();

testFeatures.print();
testLabels.print();

mean.print();
variance.print();
```
