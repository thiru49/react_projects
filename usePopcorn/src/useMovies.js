import { useState, useEffect } from "react";

const key = "9375fc28";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);

  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      const fetchMovies = async () => {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("something wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error(" movies not found");

          setMovies(data.Search);
          setError("");
        } catch (er) {
          if (er.name !== "AbortError") {
            console.log(er.message);
            setError(er.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      /* handleCloseMovie(); */
      fetchMovies();
      return () => {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isloading, error };
}
