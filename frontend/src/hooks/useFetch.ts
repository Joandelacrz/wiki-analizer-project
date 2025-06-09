import { useEffect, useState } from "react";

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetcher()
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setError("Error al cargar datos"))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [fetcher]);

  return { data, loading, error };
}
