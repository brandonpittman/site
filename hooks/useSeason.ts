export const useSeason = (date: Date) => {
  const md = (month, day) => ({ month, day });
  const toMd = (date) => md(date.getMonth(), date.getDate());

  const before = (md1, md2) =>
    md1.month < md2.month || (md1.month === md2.month && md1.day <= md2.day);

  const after = (md1, md2) => !before(md1, md2);

  const between = (mdX, mdLow, mdHigh) =>
    after(mdX, mdLow) && before(mdX, mdHigh);

  const season = (date, seasons) =>
    ((md = toMd(date)) =>
      Object.keys(seasons).find((season) => seasons[season](md)))();

  const MARCH_EQUINOX = md(2, 20);
  const JUNE_SOLSTICE = md(5, 21);
  const SEPTEMBER_EQUINOX = md(8, 23);
  const DECEMBER_SOLSTICE = md(11, 21);
  const NEW_YEAR = md(0, 1);

  const seasons = {
    Spring: (d) => between(d, MARCH_EQUINOX, JUNE_SOLSTICE),
    Summer: (d) => between(d, JUNE_SOLSTICE, SEPTEMBER_EQUINOX),
    Fall: (d) => between(d, SEPTEMBER_EQUINOX, DECEMBER_SOLSTICE),
    Winter: (d) =>
      between(d, DECEMBER_SOLSTICE, NEW_YEAR) ||
      between(d, NEW_YEAR, MARCH_EQUINOX),
  };

  return season(date, seasons);
};

export default useSeason;