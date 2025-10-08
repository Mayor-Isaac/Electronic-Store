import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function useFetch({url, key}) {
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: () =>
      fetch(url).then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
    
  return data;
}
