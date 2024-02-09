import { useState, useEffect, useRef } from "react";
import StarRating from "./components/StarRating";

import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const key = "9375fc28";

export function App() {
  const [query, setQuery] = useState("");
  const { movies, isloading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [selectedId, setSelectedId] = useState(null);

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
  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
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
              onEditRating={handleDeleteWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesLists
                watched={watched}
                onDelete={handleDeleteWatched}
              />
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
  onEditRating,
}) => {
  const [movie, setMovie] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating]
  );

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

      setMovie(data);
      setLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = "MoviePicker";
    };
  }, [title]);

  useKey("Escape", onCloseMovie);

  const handleAdd = () => {
    const newMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: !isNaN(imdbRating) ? Number(imdbRating) : 0,
      runtime: !isNaN(runtime) ? Number(runtime.split(" ").at(0)) : 0,
      userRating: !isNaN(userRating) ? Number(userRating) : 0,
      CounterRatingDecision: countRef.current,
    };
    console.log(newMovie);
    onAddOnMovie(newMovie);
    onCloseMovie();
  };
  const onWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

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
                  <StarRating
                    onSetRating={setUserRating}
                    size={24}
                    maxRating={10}
                    className="p-4"
                  />
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
                  <button
                    className="text-xs rounded-sm bg-purple-500 p-1 m-2"
                    onClick={() => onEditRating(selectedId)}
                  >
                    Edit
                  </button>
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
  const inputE1 = useRef(null);
  //listening enter event in dom
  useKey("enter", () => {
    if (document.activeElement === inputE1.current) return;
    inputE1.current.focus();
    setQuery("");
  });

  return (
    <input
      className="px-4 py-2 rounded-md hover:-translate-y-1 transition-all text-indigo-100 font-semibold border-none  md:min-w-[30rem] shadow-md w-[150px]  focus:outline-none  bg-indigo-500"
      placeholder="Search Movies "
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputE1}
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

const WatchedMoviesLists = ({ watched, onDelete }) => {
  return (
    <ul className="">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbId} onDelete={onDelete} />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie, onDelete }) => {
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
          <button
            className=" bg-red-600 p-1 rounded-sm mx-8"
            onClick={() => onDelete(movie.imdbId)}
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
};
