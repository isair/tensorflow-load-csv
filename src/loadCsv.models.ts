export interface CsvReadOptions {
  featureColumns: string[];
  labelColumns: string[];
  /**
   * If true, shuffles all rows.
   */
  shuffle?: boolean;
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
   * If true, calculates the standard deviation for each feature and testFeature column and standardises the values in those columns. Does not touch labels.
   */
  standardise?: boolean;
}
