import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../service/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError("");
      } catch (err) {
        console.error("Error fetching popular movies:", err);
        setError("We couldn't load movies right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setError("");
    try {
      const searchResults = await searchMovies(searchQuery.trim());
      setMovies(searchResults);
    } catch (err) {
      console.error(err);
      setError("Movie search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const visibleMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <section className="home-hero">
        <span className="hero-eyebrow">YOUR NEXT MOVIE NIGHT STARTS HERE</span>
        <h1>Find your next <span>favorite</span> movie.</h1>
        <p>Explore popular movies, discover hidden gems and watch the trailers before you decide.</p>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search movies by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search movies"
          />
          <button className="search-button" type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Search"}
          </button>
        </form>
      </section>

      <section className="movies-section">
        <div className="movies-section-heading">
          <div>
            <h2>{searchQuery ? "Search results" : "Popular right now"}</h2>
            <p>{searchQuery ? "Movies matching your search" : "Hand-picked movies worth watching"}</p>
          </div>
        </div>

        <div className="movies-grid">
          {loading ? (
            <div className="home-message"><h3>Finding great movies...</h3><p>Just a moment.</p></div>
          ) : error ? (
            <div className="home-message"><h3>Something went wrong</h3><p>{error}</p></div>
          ) : visibleMovies.length > 0 ? (
            visibleMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <div className="home-message">
              <h3>No movies found</h3>
              <p>Try another movie title and search again.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;