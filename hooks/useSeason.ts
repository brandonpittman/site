export type MonthDate = {
  month: number;
  day: number;
};

export const useSeason = (date: Date) => {
  const md = (month: number, day: number): MonthDate => ({ month, day });
  const toMd = (date: Date) => md(date.getMonth(), date.getDate());

  const before = (md1: MonthDate, md2: MonthDate) =>
    md1.month < md2.month || (md1.month === md2.month && md1.day <= md2.day);

  const after = (md1: MonthDate, md2: MonthDate) => !before(md1, md2);

  const between = (mdX: MonthDate, mdLow: MonthDate, mdHigh: MonthDate) =>
    after(mdX, mdLow) && before(mdX, mdHigh);

  const seasons = {
    Spring: (d: MonthDate) => between(d, MARCH_EQUINOX, JUNE_SOLSTICE),
    Summer: (d: MonthDate) => between(d, JUNE_SOLSTICE, SEPTEMBER_EQUINOX),
    Fall: (d: MonthDate) => between(d, SEPTEMBER_EQUINOX, DECEMBER_SOLSTICE),
    Winter: (d: MonthDate) =>
      between(d, DECEMBER_SOLSTICE, NEW_YEAR) ||
      between(d, NEW_YEAR, MARCH_EQUINOX),
  };

  type Seasons = typeof seasons;

  const season = (date: Date, seasons: Seasons) =>
    ((md = toMd(date)) =>
      Object.keys(seasons).find((season) => seasons[season](md)))();

  const MARCH_EQUINOX = md(2, 20);
  const JUNE_SOLSTICE = md(5, 21);
  const SEPTEMBER_EQUINOX = md(8, 23);
  const DECEMBER_SOLSTICE = md(11, 21);
  const NEW_YEAR = md(0, 1);

  return season(date, seasons) || "Winter";
};

export default useSeason;
