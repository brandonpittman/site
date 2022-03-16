import generateContext from "react-generate-context";
import React from "react";

type Context = [
  number,
  {
    inc: () => void;
    dec: () => void;
  }
];

type Props = {
  startingCount: number;
};

/**
 * `generateContext` receives a custom hook function that manages the `value`
 * passed to the Provider under the hood. The function takes any `props` passed
 * to the Provider
 */
const useGetCounterValue = ({ startingCount }: Props): Context => {
  const [state, setState] = React.useState(startingCount);
  const handlers = React.useMemo(
    () => ({
      inc: () => {
        setState((s) => s + 1);
      },
      dec: () => {
        setState((s) => s - 1);
      },
    }),
    []
  );

  return [state, handlers];
};

/**
 * The defaultValue to be passed to the underlying `createContext` function
 */
const defaultValue: Context = [
  0,
  {
    inc: () => {},
    dec: () => {},
  },
];

/**
 * generateContext returns a tuple of a Provider and a custom
 * hook to consume the context. Array destructuring allows you
 * to name the Provider and hook whatever you need to easily
 */
export const [CounterProvider, useCounter] = generateContext<Context, Props>(
  useGetCounterValue,
  defaultValue
);
