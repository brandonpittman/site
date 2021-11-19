import useSWR from "swr";

const useSharedState = (key: string, initial: any) => {
  const { data: state, mutate: setState } = useSWR(key, {
    initialData: initial,
  });
  return [state, setState];
};

export default useSharedState;
