import { useEffect, useMemo, useRef, useState } from "react";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  // Evita recrear options en cada render
  const opts = useMemo(() => options, [options]);

  // ✅ Evita "parpadeo" por StrictMode (doble montaje en dev)
  const didFetchOnceRef = useRef(false);

  useEffect(() => {
    if (!url) return;

    // En StrictMode dev, el efecto se ejecuta 2 veces.
    // Si ya tenemos data, no volvemos a poner loading=true (evita flash).
    if (didFetchOnceRef.current && data) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        // Solo activamos loading si no tenemos data aún
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, opts]);

  return { data, loading, error };
};
