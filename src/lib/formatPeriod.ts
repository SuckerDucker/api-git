const quarterName: Record<number, string> = {
  1: 'ENE-ABR',
  2: 'MAY-AGO',
  3: 'SEP-DIC',
};

export const formatPeriod = (period: number) => {
  const quarter = period.toString().slice(-1);
  const year = period.toString().slice(1, 3);
  const name = quarterName[Number(quarter)];

  return `${name} - 20${year}`;
};
