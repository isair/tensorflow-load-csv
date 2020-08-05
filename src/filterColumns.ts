import { CsvTable } from './loadCsv.models';

const filterColumns = (table: CsvTable, columnNames: string[]) => {
  const indexKeepDecisions = table[0].map(
    (header) => columnNames.indexOf(header as string) > -1
  );
  return table.map((row) =>
    row.filter((_, index) => indexKeepDecisions[index])
  );
};

export default filterColumns;
