import splitTestData from '../src/splitTestData';

const tables = {
  features: [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ],
  labels: [[9], [10], [11], [12]],
};

test('Default splitting, splits in half', () => {
  const { features, labels, testFeatures, testLabels } = splitTestData(
    tables.features,
    tables.labels,
    true
  );
  expect(features).toMatchObject([
    [1, 2],
    [3, 4],
  ]);
  expect(labels).toMatchObject([[9], [10]]);
  expect(testFeatures).toMatchObject([
    [5, 6],
    [7, 8],
  ]);
  expect(testLabels).toMatchObject([[11], [12]]);
});

test('Splitting a fixed amount works', () => {
  const { features, labels, testFeatures, testLabels } = splitTestData(
    tables.features,
    tables.labels,
    1
  );
  expect(features).toMatchObject([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  expect(labels).toMatchObject([[9], [10], [11]]);
  expect(testFeatures).toMatchObject([[7, 8]]);
  expect(testLabels).toMatchObject([[12]]);
});

test('Splitting more than row length splits all rows into test data', () => {
  const { features, labels, testFeatures, testLabels } = splitTestData(
    tables.features,
    tables.labels,
    tables.features.length * 2
  );
  expect(features).toMatchObject([]);
  expect(labels).toMatchObject([]);
  expect(testFeatures).toMatchObject([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ]);
  expect(testLabels).toMatchObject([[9], [10], [11], [12]]);
});

test('Splitting less than or equal to 0 places all rows into normal data', () => {
  [0, -1].forEach((splitLength) => {
    const { features, labels, testFeatures, testLabels } = splitTestData(
      tables.features,
      tables.labels,
      splitLength
    );
    expect(features).toMatchObject([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);
    expect(labels).toMatchObject([[9], [10], [11], [12]]);
    expect(testFeatures).toMatchObject([]);
    expect(testLabels).toMatchObject([]);
  });
});

test('Using a percentage works', () => {
  const { features, labels, testFeatures, testLabels } = splitTestData(
    tables.features,
    tables.labels,
    '25%'
  );
  expect(features).toMatchObject([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  expect(labels).toMatchObject([[9], [10], [11]]);
  expect(testFeatures).toMatchObject([[7, 8]]);
  expect(testLabels).toMatchObject([[12]]);
});

test('Passing a string that is not a percentage throws an error', () => {
  expect(() => splitTestData(tables.features, tables.labels, 'hello')).toThrow(
    'When test length is a string, it must be a percentage ending with %'
  );
});
