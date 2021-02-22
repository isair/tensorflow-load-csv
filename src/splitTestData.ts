import { CsvTable } from './loadCsv.models';

const splitTestData = (
  features: CsvTable,
  labels: CsvTable,
  splitTest: true | number | string
) => {
  if (
    typeof splitTest === 'string' &&
    (!splitTest.endsWith('%') || splitTest.length <= 1)
  ) {
    throw new Error(
      'When test length is a string, it must be a percentage ending with %'
    );
  }

  const dataLength = features.length;
  const testLength =
    typeof splitTest === 'number'
      ? splitTest
      : typeof splitTest === 'string'
      ? Math.floor((Number.parseInt(splitTest.slice(0, -1)) * dataLength) / 100)
      : Math.floor(features.length / 2);
  const testLengthBounded = Math.max(0, Math.min(testLength, dataLength));
  const testStartIndex = dataLength - testLengthBounded;

  return {
    features: features.slice(0, testStartIndex),
    labels: labels.slice(0, testStartIndex),
    testFeatures: features.slice(testStartIndex),
    testLabels: labels.slice(testStartIndex),
  };
};

export default splitTestData;
