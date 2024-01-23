import { useState, useEffect } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const key = "9375fc28";

export function App() {
  const [query, setQuery] = useState("sivaji");
  const [movies, setMovies] = useState([tempMovieData]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
      const fetchMovies = async () => {
        try {
          console.log("rendering");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`
          );

          if (!res.ok) throw new Error("something wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error(" movies not found");

          setMovies(data.Search);
        } catch (er) {
          setError(er.message);
        } finally {
          setIsLoading(false);
        }
      };
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  console.log("rendered");
  const handleSelectedMovie = (id) => {
    setSelectedId(id);
  };
  const handleWatchedmovies = () => {
    setSelectedId(null);
  };
  return (
    <>
      <NavBar movies={movies}>
        <Search query={query} setQuery={setQuery} />
      </NavBar>
      <Main>
        <Box>
          {/* {isloading ? <Loading /> : <MovieLists movies={movies} />} */}
          {isloading && <Loading />}
          {!isloading && !error && (
            <MovieLists movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <Errors message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onBack={handleWatchedmovies}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesLists watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const MovieDetails = ({ selectedId, onBack }) => {
  return (
    <>
      <button
        className="size-8 absolute left-2 top-2 bg-white text-black rounded-full"
        onClick={onBack}
      >
        {"<-"}
      </button>
      <p>{selectedId}</p>;
    </>
  );
};

const Errors = ({ message }) => {
  return <p className="text-xl font-semibold mt-4 text-center">{message}</p>;
};
const Loading = () => {
  return <p className="text-xl text-white font-semibold">...Loading</p>;
};
const NavBar = ({ children, movies }) => {
  return (
    <div className="flex flex-row justify-between sm:m-4 xl:mx-12 items-center px-4 sm:px-10 py-2 bg-indigo-600 rounded-xl shadow-xl gap-2 text-xs md:text-xl">
      <div className="flex sm:flex-row flex-col justify-center items-center gap-2">
        <span>🍿</span>
        <h1 className="sm:text-2xl font-bold">MoviePicker</h1>
      </div>
      {children}
      <p className="font-bold">
        Founds <strong>{movies?.length}</strong> result
      </p>
    </div>
  );
};
const Search = ({ query, setQuery }) => {
  return (
    <input
      className="px-4 py-2 rounded-md hover:-translate-y-1 transition-all text-indigo-100 font-semibold border-none  md:min-w-[30rem] shadow-md w-[150px]  focus:outline-none  bg-indigo-500"
      placeholder="Search Movies "
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
const Main = ({ children }) => {
  return (
    <main className="mt-8  h-[75vh] flex sm:flex-row flex-col gap-2 sm:w-[700px] xl:w-[900px] mx-auto">
      {children}
    </main>
  );
};

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="basis-1/2 relative overflow-auto bg-gray-700 rounded-xl shadow-xl">
      <button
        className="bg-black size-8 rounded-full absolute right-2 top-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "-" : "+"}
      </button>
      {!isOpen && children}
    </div>
  );
};

const MovieLists = ({ movies, onSelectMovie }) => {
  return (
    <ul className="">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li
      key={movie.imdbID}
      className="flex justify-start gap-8 px-4 py-4 items-center hover:bg-gray-600 transition-all border-b-2 border-gray-600"
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="size-14"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-sans leading-6 font-bold">{movie.Title}</h3>
        <div>
          <p>
            <span className="p-2 size-8 text-white">🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="p-4 flex flex-col gap-4 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold ">Movies you watched</h2>
      <div className="flex justify-around items-center">
        <p className="flex justify-start items-center gap-2">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="mini">
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p className="mini">
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p className="mini">
          <span>⏳</span>
          <span>{avgRuntime}</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesLists = ({ watched }) => {
  return (
    <ul className="">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie }) => {
  return (
    <li className="flex justify-start gap-8 px-4 py-4 items-center hover:bg-gray-600 border-b-2 transition-all border-gray-600">
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="size-14"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-sans leading-6 font-bold">{movie.Title}</h3>
        <div className="flex gap-2">
          <p className="mini">
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p className="mini">
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p className="mini">
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </div>
    </li>
  );
};
