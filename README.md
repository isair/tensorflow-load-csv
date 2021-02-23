# tensorflow-load-csv

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-f8bc45.svg)](https://github.com/prettier/prettier)

![workflows](https://github.com/isair/tensorflow-load-csv/workflows/Release/badge.svg?branch=master)

A library that aims to remove the overhead of creating tensors from CSV files completely; allowing you to dive right into the fun parts of your ML project.

- [Lightweight](https://bundlephobia.com/result?p=tensorflow-load-csv).
- Fast.
- Flexible.
- TypeScript compatible.
- 100% test coverage.

## Documentation

You can find the docs [here](https://barissencan.com/tensorflow-load-csv/).

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
  mappings: {
    height: (ft) => ft * 0.3048, // feet to meters
    temperature: (f) => (f - 32) / 1.8, // fahrenheit to celsius
  }, // Map values based on which column they are in before they are loaded into tensors.
  shuffle: true, // Pass true to shuffle with a fixed seed, or a string to use it as a seed for the shuffling.
  splitTest: true, // Splits your data in half. You can also provide a certain row count for the test data, or a percentage string (e.g. 10%).
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
