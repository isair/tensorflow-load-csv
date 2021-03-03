import { CsvTable, CsvReadOptions } from './loadCsv.models';

const applyMappings = (
  table: CsvTable,
  mappings: NonNullable<CsvReadOptions['mappings']>,
  columnsToFlatten: Set<string> = new Set([])
) => {
  const columnNames = table[0];
  const columnArrayLengths = new Array(columnNames.length);
  const mappingsByIndex = columnNames.map((columnName) => mappings[columnName]);
  const shouldFlattenByIndex = columnNames.map((columnName) =>
    columnsToFlatten.has(columnName as string)
  );
  for (let i = 1; i < table.length; i++) {
    table[i] = table[i].flatMap((value, columnIndex) => {
      const mapping = mappingsByIndex[columnIndex];
      const shouldFlatten = shouldFlattenByIndex[columnIndex];
      if (!mapping) {
        return value;
      }
      const mappedValue = mapping(value);
      if (!shouldFlatten) {
        return mappedValue;
      }
      if (!Array.isArray(mappedValue)) {
        throw new Error(
          `Column '${columnNames[columnIndex]}' is marked to be flattened but its mapping function did not return an array`
        );
      }
      if (columnArrayLengths[columnIndex] === undefined) {
        columnArrayLengths[columnIndex] = mappedValue.length;
        for (let j = 1; j < mappedValue.length; j++) {
          table[0].splice(columnIndex, 0, columnNames[columnIndex]);
        }
      } else if (columnArrayLengths[columnIndex] !== mappedValue.length) {
        throw new Error(
          `Mapping function for column '${columnNames[columnIndex]}' needs to always return arrays of the same length`
        );
      }
      return mappedValue;
    });
  }
};

export default applyMappings;
