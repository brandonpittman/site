const quotes = [
  {
    source: "Enchiridion 1.1",
    text: `We are responsible for some things, while there are others for which we cannot be held responsible. The former include our judgement, our impulse, our desire, aversion and our mental faculties in general; the latter include the body, material possessions, our reputation, status – in a word, anything not in our power to control.`,
  },
  {
    source: "Enchiridion 1.5",
    text: `Ask, ‘Is this something that is, or is not, in my control?’ And if it’s not one of the things that you control, be ready with the reaction, ‘Then it’s none of my concern.`,
  },
  {
    source: "Enchiridion 3",
    text: `When giving your wife or child a kiss, repeat to yourself, ‘I am kissing a mortal.’ Then you won’t be so distraught if they are taken from you.`,
  },
];

export default quotes.map((quote) => ({
  ...quote,
  author: "Epictetus",
}));
