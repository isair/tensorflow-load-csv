import { CsvTable, CsvReadOptions } from './loadCsv.models';

const applyMappings = (
  table: CsvTable,
  mappings: CsvReadOptions['mappings']
) => {
  const mappingsByIndex = table[0].map((columnName) => mappings[columnName]);
  return table.map((row, index) =>
    index === 0 || !mappingsByIndex[index]
      ? row
      : row.map((value) => mappingsByIndex[index](value))
  );
};

export default applyMappings;
