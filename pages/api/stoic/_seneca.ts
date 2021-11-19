const quotes = [
  {
    source: "Consolation to Helvia",
    text: `Being without your country is not misery: you have thoroughly taught yourself by your studies to know that to a wise man every place is his country.`,
  },
  {
    source: "Consolation to Helvia",
    text: `So fate has decreed that nothing maintains the same condition forever.`,
  },
  {
    source: "Consolation to Helvia",
    text: `Is it not madness and the worst form of derangement to want so much though you can hold so little? Therefore, though you may increase your income and extend your estates, you will never increase the capacity of your bodies.`,
  },
  {
    source: "Consolation to Helvia",
    text: `So an exile’s poverty brings no hardship; for no place of exile is so barren that it cannot abundantly support a man.`,
  },
  {
    source: "Consolation to Helvia",
    text: `If you regard your last day not as a punishment but as a law of nature, the breast from which you have banished the dread of death no fear will dare to enter.`,
  },
];

export default quotes.map((quote) => ({
  ...quote,
  author: "Seneca",
}));
