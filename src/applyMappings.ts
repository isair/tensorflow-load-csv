import { CsvTable, CsvReadOptions } from './loadCsv.models';

const applyMappings = (
  table: CsvTable,
  mappings: NonNullable<CsvReadOptions['mappings']>
) => {
  if (table.length < 2) {
    return table;
  }
  const mappingsByIndex = table[0].map((columnName) => mappings[columnName]);
  return table.map((row, index) =>
    index === 0 || !mappingsByIndex[index]
      ? row
      : row.map((value) => mappingsByIndex[index](value))
  );
};

export default applyMappings;
