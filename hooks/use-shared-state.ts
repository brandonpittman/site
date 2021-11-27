import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useSharedState = (key: string, initial: any) => {
  const { data: state, mutate: setState } = useSWR(key, fetcher, {
    fallbackData: initial,
  });
  return [state, setState];
};

export default useSharedState;
