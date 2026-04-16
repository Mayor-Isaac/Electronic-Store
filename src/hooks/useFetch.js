import { useQuery } from '@tanstack/react-query';

export default function useFetch({queryFn, key}) {
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: queryFn,
  });

  return { isPending, error, data };
}
