import { CsvTable } from './loadCsv.models';

/**
 * Filters and re-orders columns in a given CSV table.
 *
 * Where n is the number of non-header cells in `table`, `m` is the number of header cells in `table`, and h is the number of items in `headers`
 *
 * Time complexity: O(n + mh)
 *
 * Space complexity: O(n + m + h)
 */
const filterColumns = (table: CsvTable, headers: string[]) => {
  const indexKeepDecisions = table[0].map((columnName) =>
    headers.includes(columnName as string)
  );
  const filteredColumnNames = table[0].filter((_, i) => indexKeepDecisions[i]);
  const indexMap = filteredColumnNames.map((columnName) =>
    headers.indexOf(columnName as string)
  );
  return table.map((row) => {
    const newRow = new Array(indexMap.length);
    for (let i = 0, j = 0; i < row.length; i++) {
      if (!indexKeepDecisions[i]) continue;
      newRow[indexMap[j++]] = row[i];
    }
    return newRow;
  });
};

export default filterColumns;
