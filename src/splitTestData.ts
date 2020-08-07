import { CsvTable } from './loadCsv.models';

const splitTestData = (
  features: CsvTable,
  labels: CsvTable,
  splitTest: true | number
) => {
  const dataLength = features.length;
  const testLength =
    typeof splitTest === 'number'
      ? Math.max(0, Math.min(splitTest, dataLength))
      : Math.floor(features.length / 2);
  const testStartIndex = dataLength - testLength;

  return {
    features: features.slice(0, testStartIndex),
    labels: labels.slice(0, testStartIndex),
    testFeatures: features.slice(testStartIndex),
    testLabels: labels.slice(testStartIndex),
  };
};

export default splitTestData;
