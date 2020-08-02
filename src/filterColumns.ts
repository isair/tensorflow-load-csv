const filterColumns = (data: (string | number)[][], columnNames: string[]) => {
  const indexKeepDecisions = data[0].map(
    (header) => columnNames.indexOf(header as string) > -1
  );
  return data.map((row) => row.filter((_, index) => indexKeepDecisions[index]));
};

export default filterColumns;
