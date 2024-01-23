import { useState, useEffect } from "react";
import { Rating } from "./components/Rating";

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
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
      const fetchMovies = async () => {
        try {
          console.log("query Details");
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
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    console.log(watched);
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
              onBack={handleCloseMovie}
              onAddOnMovie={handleAddWatched}
              onCloseMovie={handleCloseMovie}
              watched={watched}
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

const MovieDetails = ({
  selectedId,
  onBack,
  onAddOnMovie,
  onCloseMovie,
  watched,
}) => {
  const [movie, setMovie] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actor: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );
      const data = await res.json();
      console.log(data);
      setMovie(data);
      setLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  const handleAdd = () => {
    const newMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: !isNaN(imdbRating) ? Number(imdbRating) : 0,
      runtime: !isNaN(runtime) ? Number(runtime.split(" ").at(0)) : 0,
      userRating: !isNaN(userRating) ? Number(userRating) : 0,
    };
    onAddOnMovie(newMovie);
    onCloseMovie();
  };
  const onWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  console.log(watchedUserRating);
  return (
    <>
      {isLoading ? (
        <p className="text-xl text-center">...Loading</p>
      ) : (
        <div>
          <header className="flex gap-4 bg-gray-800 shadow-md">
            <button
              className="size-8 absolute left-2 top-2 bg-white text-black rounded-full "
              onClick={onBack}
            >
              &larr;
            </button>
            <img
              src={poster}
              alt={`Poster of ${movie} movie`}
              className="aspect-auto size-1/3 sm:size-3/2 "
            />
            <div className="basis 1/2 flex flex-col justify-center items-center gap-2 text-sm sm:text-md">
              <h2 className=" text-xl font-bold">{title}</h2>
              <p className="">
                {released} &bull; {runtime}
              </p>
              <p className="text-center">{genre}</p>
              <p>
                <span>⭐️</span>
                <span className="font-bold sm:text-xl">{imdbRating}</span> IMDB
                rating
              </p>
            </div>
          </header>
          <section className="flex flex-col justify-center items-center gap-2 p-4">
            <div className="p-2 bg-gray-800 mt-2 mx-2 rounded-xl shadow-xl">
              {!onWatched ? (
                <>
                  <Rating onsetRating={setUserRating} />
                  {userRating > 0 && (
                    <button
                      className="bg-purple-700 px-6 rounded-md mx-20 text-[16px] hover:scale-[0.8] py-2 transition-all"
                      onClick={handleAdd}
                    >
                      Add to Lists
                    </button>
                  )}
                </>
              ) : (
                <p className="p-4 sm:text-xl font-bold">
                  You rated with movie <span>⭐️</span>
                  {watchedUserRating}
                </p>
              )}
            </div>

            <p className="leading-4 text-md">
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
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
    <main className="mt-8  h-[75vh] flex sm:flex-row flex-col gap-2 sm:w-[800px] xl:w-[900px] mx-auto">
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
  console.log(watched);
  const avgImdbRating = average(watched.map((movie) => movie?.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie?.userRating));
  const avgRuntime = average(watched.map((movie) => movie?.runtime));

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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p className="mini">
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p className="mini">
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)}</span>
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
        src={movie.poster}
        alt={`${movie.title} poster`}
        className="size-14"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-sans leading-6 font-bold">{movie.Title}</h3>
        <div className="flex gap-2 justify-end">
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
          <button className="bg-red-600 p-1 rounded-sm mx-8">X</button>
        </div>
      </div>
    </li>
  );
};
