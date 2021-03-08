import * as tf from '@tensorflow/tfjs';

import standardise from '../src/standardise';

test('it should throw an error when features does not have more than one dimension', () => {
  expect(() =>
    standardise(tf.tensor([1, 2]), tf.tensor([[1], [2]]), [true])
  ).toThrowError('features and testFeatures must have at least two dimensions');
});

test('it should throw an error when testFeatures does not have more than one dimension', () => {
  expect(() =>
    standardise(tf.tensor([[1], [2]]), tf.tensor([1, 2]), [true])
  ).toThrowError('features and testFeatures must have at least two dimensions');
});

test('it should throw an error when features and testFeatures have different lengths for their second dimensions', () => {
  expect(() =>
    standardise(
      tf.tensor([
        [1, 2],
        [1, 2],
      ]),
      tf.tensor([[1], [2]]),
      [true, true]
    )
  ).toThrowError(
    'Length of the second dimension of features and testFeatures must be the same'
  );
});

test('it should throw an error when length of indicesToStandardise does not match the length of the second dimension of features', () => {
  expect(() =>
    standardise(
      tf.tensor([
        [1, 2],
        [1, 2],
      ]),
      tf.tensor([
        [3, 4],
        [3, 4],
      ]),
      [true]
    )
  ).toThrowError(
    'Length of indicesToStandardise must match the length of the second dimension of features'
  );
});

test('it should return the exact same tensors as the inputs when there are 0 columns', () => {
  const features = tf.tensor([[], []]);
  const testFeatures = tf.tensor([[], []]);
  const result = standardise(features, testFeatures, []);
  expect(result.features).toBe(features);
  expect(result.testFeatures).toBe(testFeatures);
});

test('it should standardise only the requested second dimension slices', () => {
  const result = standardise(
    tf.tensor([
      [1, 2, 3],
      [0, 0, 4],
    ]),
    tf.tensor([
      [0, 1, 3],
      [0, 0, 4],
    ]),
    [true, true, false]
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(result.features.arraySync()).toBeDeepCloseTo(
    [
      [1, 1, 3],
      [-1, -1, 4],
    ],
    3
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(result.testFeatures.arraySync()).toBeDeepCloseTo(
    [
      [-1, 0, 3],
      [-1, -1, 4],
    ],
    3
  );
});
