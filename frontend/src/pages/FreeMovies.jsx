import { useState } from "react";
import "../css/FreeMovies.css";

const freeMovies = [
  {
    id: "YE7VzlLtp-4",
    title: "Big Buck Bunny",
    year: 2008,
    duration: "10 min",
    genre: "Animation · Comedy",
    description: "A gentle giant rabbit has a peaceful day interrupted by three mischievous rodents.",
    credit: "© copyright 2008, Blender Foundation / www.bigbuckbunny.org",
    license: "Creative Commons Attribution 3.0",
    source: "https://peach.blender.org/about/",
    sourceName: "Blender Foundation"
  },
  {
    id: "eRsGyueVLvQ",
    title: "Sintel",
    year: 2010,
    duration: "15 min",
    genre: "Animation · Fantasy",
    description: "A young woman journeys across a harsh landscape in search of a dragon she once befriended.",
    credit: "© copyright Blender Foundation / durian.blender.org",
    license: "Creative Commons Attribution 3.0",
    source: "https://studio.blender.org/films/sintel/",
    sourceName: "Blender Foundation"
  },
  {
    id: "R6MlUcmOul8",
    title: "Tears of Steel",
    year: 2012,
    duration: "12 min",
    genre: "Sci-fi · Live action",
    description: "A science-fiction short film combining live action and visual effects.",
    credit: "(CC) Blender Foundation / mango.blender.org",
    license: "Creative Commons Attribution 3.0",
    source: "https://mango.blender.org/about/",
    sourceName: "Blender Foundation"
  }
];

function FreeMovies() {
  const [selectedMovie, setSelectedMovie] = useState(freeMovies[0]);

  return (
    <div className="free-movies-page">
      <section className="free-movies-hero">
        <span className="free-movies-eyebrow">OPEN CINEMA · FREE TO WATCH</span>
        <h1>Free <span>Movies</span></h1>
        <p>Watch a hand-picked collection of openly licensed films. No subscription required.</p>
      </section>

      <section className="free-player-section">
        <div className="free-player-heading">
          <div>
            <span className="free-now-playing">NOW PLAYING</span>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.year} · {selectedMovie.duration} · {selectedMovie.genre}</p>
          </div>
          <span className="license-pill">FREE · CC LICENSE</span>
        </div>

        <div className="free-video-frame">
          <iframe
            key={selectedMovie.id}
            src={`https://www.youtube-nocookie.com/embed/${selectedMovie.id}?autoplay=0&rel=0`}
            title={selectedMovie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="free-film-credit">
          <p>{selectedMovie.description}</p>
          <p><strong>Credit:</strong> {selectedMovie.credit}</p>
          <p><strong>License:</strong> {selectedMovie.license} · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">View license</a></p>
          <p><strong>Original source:</strong> <a href={selectedMovie.source} target="_blank" rel="noreferrer">{selectedMovie.sourceName}</a></p>
        </div>
      </section>

      <section className="free-catalog-section">
        <div className="free-catalog-heading">
          <div>
            <h2>Explore open movies</h2>
            <p>Select a title to play it in the player above.</p>
          </div>
          <span>{freeMovies.length} films</span>
        </div>

        <div className="free-movie-grid">
          {freeMovies.map((movie) => (
            <button
              type="button"
              key={movie.id}
              className={`free-movie-card ${selectedMovie.id === movie.id ? "selected" : ""}`}
              onClick={() => {
                setSelectedMovie(movie);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="free-movie-art">
                <span>▶</span>
                <small>OPEN MOVIE</small>
              </div>
              <div className="free-movie-card-info">
                <h3>{movie.title}</h3>
                <p>{movie.year} · {movie.duration}</p>
                <span>{movie.genre}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      <p className="free-movies-note">These are openly licensed short films, not a catalog of current commercial releases. Videos play through the official Blender Foundation YouTube uploads; each film's license and creator credit are shown above.</p>
    </div>
  );
}

export default FreeMovies;
