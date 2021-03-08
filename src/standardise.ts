import * as tf from '@tensorflow/tfjs';

const standardise = (
  features: tf.Tensor<tf.Rank>,
  testFeatures: tf.Tensor<tf.Rank>,
  indicesToStandardise: boolean[]
): {
  features: tf.Tensor<tf.Rank>;
  testFeatures: tf.Tensor<tf.Rank>;
} => {
  let newFeatures, newTestFeatures;

  if (features.shape.length < 2 || testFeatures.shape.length < 2) {
    throw new Error(
      'features and testFeatures must have at least two dimensions'
    );
  }

  if (features.shape[1] !== testFeatures.shape[1]) {
    throw new Error(
      'Length of the second dimension of features and testFeatures must be the same'
    );
  }

  if (features.shape[1] !== indicesToStandardise.length) {
    throw new Error(
      'Length of indicesToStandardise must match the length of the second dimension of features'
    );
  }

  if (features.shape[1] === 0) {
    return { features, testFeatures };
  }

  for (let i = 0; i < features.shape[1]; i++) {
    let featureSlice = features.slice([0, i], [features.shape[0], 1]);
    let testFeatureSlice = testFeatures.slice(
      [0, i],
      [testFeatures.shape[0], 1]
    );
    if (indicesToStandardise[i]) {
      const sliceMoments = tf.moments(featureSlice);
      featureSlice = featureSlice
        .sub(sliceMoments.mean)
        .div(sliceMoments.variance.pow(0.5));
      testFeatureSlice = testFeatureSlice
        .sub(sliceMoments.mean)
        .div(sliceMoments.variance.pow(0.5));
    }
    if (!newFeatures) {
      newFeatures = featureSlice;
    } else {
      newFeatures = newFeatures.concat(featureSlice, 1);
    }
    if (!newTestFeatures) {
      newTestFeatures = testFeatureSlice;
    } else {
      newTestFeatures = newTestFeatures.concat(testFeatureSlice, 1);
    }
  }

  return {
    features: newFeatures as tf.Tensor<tf.Rank>,
    testFeatures: newTestFeatures as tf.Tensor<tf.Rank>,
  };
};

export default standardise;
