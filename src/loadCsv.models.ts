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
   * Used for transforming values of entire columns. Key is column label, value is transformer function. Each value belonging to
   * that column will be put through the transformer function and be overwritten with the return value of it.
   */
  mappings?: {
    [columnName: string]: (
      value: string | number
    ) => string | number | string[] | number[];
  };
  /**
   * If true, shuffles all rows with a fixed seed, meaning that shuffling the same data will always result in the same shuffled data.
   *
   * You can pass a string instead of a boolean to customise the shuffle seed.
   */
  shuffle?: boolean | string;
  /**
   * If true, splits your features and labels in half and moves them into testFeatures and testLabels.
   *
   * If a number value is provided, splits that many rows and moved them into testFeatures and testLabels instead.
   *
   * You can also pass it a percentage string, e.g. 10%. An error will be thrown if the string is not formatted correctly.
   */
  splitTest?: true | number | string;
  /**
   * If true, prepends a column of 1s to your features and testFeatures tensors.
   */
  prependOnes?: boolean;
  /**
   * Calculates mean and variance for given columns using data only in features, then standardises the values in features and testFeatures. Does not touch labels.
   */
  standardise?: string[];
  /**
   * Useful for classification problems, if you have mapped a column's values to an array using `mappings`, you can choose to flatten it here so that each element becomes a new column.
   *
   * Throws an error if any of the values in the given column is not an array, or their sizes differ from each other.
   */
  flatten?: string[];
}

export type CsvTable = (string | number)[][];
