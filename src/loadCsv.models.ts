export interface CsvReadOptions {
  /**
   * Names of the columns to be included in the features and testFeatures tensors.
   */
  featureColumns: string[];
  /**
   * Names of the columns to be included in the labels and testLabels tensors.
   */
  labelColumns: string[];
  /**
   * If true, shuffles all rows with a fixed seed, meaning that shuffling the same data will always result in the same shuffled data.
   *
   * You pass a string instead of a boolean to customise the shuffle seed.
   */
  shuffle?: boolean | string;
  /**
   * If true, splits your features and labels in half and moves them into testFeatures and testLabels.
   *
   * If a number value is provided, splits that many rows and moved them into testFeatures and testLabels instead.
   */
  splitTest?: boolean | number;
  /**
   * If true, prepends a column of 1s to your features and testFeatures tensors.
   */
  prependOnes?: boolean;
  /**
   * If true, calculates mean and variance for each feature column using data only in features, then standardises the values in features and testFeatures. Does not touch labels.
   */
  standardise?: boolean;
}

export type CsvTable = (string | number)[][];
