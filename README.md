# tensorflow-load-csv

A library that aims to remove the overhead of creating tensors from CSV files completely; allowing you to dive right into the fun parts of your ML project.

- Lightweight.
- Fast.
- Flexible.
- TypeScript compatible.
- 100% test coverage.

## Installation

NPM:
sh
```
npm install tensorflow-load-csv
```

Yarn:
sh
```
yarn add tensorflow-load-csv
```

## Usage

Simple usage:
js
```
import loadCsv from 'tensorflow-load-csv';

const { features, labels } = loadCsv('./data.csv', {
  featureColumns: ['lat', 'lng', 'height'],
  labelColumns: ['temperature'],
});
```

Advanced usage:
js
```
import loadCsv from 'tensorflow-load-csv';

const {
  features,
  labels,
  testFeatures,
  testLabels,
  mean,    // tensor holding mean of features, ignores testFeatures
  variance // tensor holding variance of features, ignores testFeatures
} = loadCsv('./data.csv', {
  featureColumns: ['lat', 'lng', 'height'],
  labelColumns: ['temperature'],
  shuffle: true,
  splitTest: true,   // Splits your data in half. You can also provide a certain row count for the test data.
  prependOnes: true, // Prepends a column of 1s to your features and testFeatures tensors, useful for linear regression.
  standardise: true, // Calculates the standard deviation for each feature and testFeature column and standardises the values in those columns. Does not touch labels.
});
```
