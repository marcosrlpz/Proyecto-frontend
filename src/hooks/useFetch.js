import { useEffect, useMemo, useRef, useState } from "react";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  const opts = useMemo(() => options, [options]);

  const didFetchOnceRef = useRef(false);

  useEffect(() => {
    if (!url) return;
    if (didFetchOnceRef.current && data) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        if (!data) setLoading(true);
        setError(null);

        const res = await fetch(url, { ...opts, signal: controller.signal });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }

        const json = await res.json();
        setData(json);

        didFetchOnceRef.current = true;
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [url, opts]);

  return { data, loading, error };
};
