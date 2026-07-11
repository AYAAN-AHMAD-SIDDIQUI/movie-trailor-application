import { useState } from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";
import { getMovieTrailer } from "../service/api";

function MovieCard({ movie }) {
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useMovieContext();

  const favorite = isFavorite(movie.id);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  function onAddToFavorites(e) {
    e.preventDefault();

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  const playTrailer = async (e) => {
    e.preventDefault();
    setLoadingTrailer(true);
    try {
      const key = await getMovieTrailer(movie.id);
      if (key) {
        setTrailerKey(key);
      } else {
        alert("Trailer not available for this movie.");
      }
    } catch (err) {
      console.error("Failed to load trailer:", err);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const closeTrailer = () => setTrailerKey(null);

  return (
    <>
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-poster.png"
            }
            alt={movie.title}
          />

          <div className="movie-overlay">
            <button
              className={`favorite-button ${favorite ? "active" : ""}`}
              onClick={onAddToFavorites}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              {favorite ? "♥" : "♡"}
            </button>

            <button
              className="trailer-button"
              onClick={playTrailer}
              disabled={loadingTrailer}
            >
              {loadingTrailer ? "Loading..." : "▶ Watch Trailer"}
            </button>
          </div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>

      {trailerKey && (
        <div className="trailer-modal-overlay" onClick={closeTrailer}>
          <div
            className="trailer-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="trailer-close-button" onClick={closeTrailer}>
              ✕
            </button>
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MovieCard;