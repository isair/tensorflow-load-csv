import { CsvTable } from './loadCsv.models';

const splitTestData = (
  features: CsvTable,
  labels: CsvTable,
  splitTest: true | number
) => {
  const length =
    typeof splitTest === 'number'
      ? Math.max(0, Math.min(splitTest, features.length - 1))
      : Math.floor(features.length / 2);

  return {
    testFeatures: features.slice(length),
    testLabels: labels.slice(length),
    features: features.slice(0, length),
    labels: labels.slice(0, length),
  };
};

export default splitTestData;
