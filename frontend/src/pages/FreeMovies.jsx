import { useMemo, useState } from "react";
import "../css/FreeMovies.css";

const freeMovies = [
  {
    id: "TLkA0RELQ1g",
    title: "Elephants Dream",
    year: 2006,
    duration: "11 min",
    genre: "Animation",
    language: "English",
    type: "Open short film",
    description: "Two characters explore a strange, endless machine in the world's first open movie.",
    credit: "Blender Foundation",
    license: "Creative Commons (open movie)",
    source: "https://orange.blender.org/download/",
    sourceName: "Official film page"
  },
  {
    id: "YE7VzlLtp-4",
    title: "Big Buck Bunny",
    year: 2008,
    duration: "10 min",
    genre: "Animation · Comedy",
    language: "No dialogue",
    type: "Open short film",
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
    language: "English",
    type: "Open short film",
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
    genre: "Sci-fi · Action",
    language: "English",
    type: "Open short film",
    description: "A science-fiction film combining live action and visual effects.",
    credit: "(CC) Blender Foundation / mango.blender.org",
    license: "Creative Commons Attribution 3.0",
    source: "https://mango.blender.org/about/",
    sourceName: "Blender Foundation"
  },
  {
    id: "Y-rmzh0PI3c",
    title: "Cosmos Laundromat",
    year: 2015,
    duration: "12 min",
    genre: "Animation · Fantasy",
    language: "English",
    type: "Open short film",
    description: "On a desolate island, a sheep meets an unusual salesman who offers him a new life.",
    credit: "Blender Institute",
    license: "Open movie · free to share",
    source: "https://studio.blender.org/projects/cosmos-laundromat/",
    sourceName: "Official Blender Studio"
  }
];

const collections = [
  {
    title: "Blender Studio Open Films",
    tag: "OFFICIAL · OPEN MOVIES",
    description: "Explore creator-released animation, sci-fi, comedy and fantasy shorts from Blender Studio.",
    url: "https://studio.blender.org/films/",
    link: "Browse official films"
  },
  {
    title: "Open Movie Downloads",
    tag: "OFFICIAL · FREE",
    description: "Find official film pages, credits and downloads for Blender Foundation open movie projects.",
    url: "https://www.blender.org/about/projects/",
    link: "Explore Blender projects"
  },
  {
    title: "Public Domain Film Archive",
    tag: "CHECK RIGHTS BY TITLE",
    description: "Browse historical film records and verify each title's public-domain status before watching or reusing it.",
    url: "https://commons.wikimedia.org/wiki/Category:Films",
    link: "Browse film archive"
  }
];

const genres = ["All", "Animation", "Comedy", "Fantasy", "Sci-fi", "Action"];

function FreeMovies() {
  const [selectedMovie, setSelectedMovie] = useState(freeMovies[0]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();
    return freeMovies.filter((movie) => {
      const matchesSearch = !query || [movie.title, movie.genre, movie.language, movie.year.toString()]
        .some((value) => value.toLowerCase().includes(query));
      const matchesGenre = activeGenre === "All" || movie.genre.toLowerCase().includes(activeGenre.toLowerCase());
      return matchesSearch && matchesGenre;
    });
  }, [search, activeGenre]);

  return (
    <div className="free-movies-page">
      <section className="free-movies-hero">
        <span className="free-movies-eyebrow">OPEN CINEMA · FREE TO WATCH</span>
        <h1>Your Free <span>Movie Hub</span></h1>
        <p>Discover open movies, classic cinema and free Hindi movie collections — without a subscription.</p>
        <div className="free-hero-stats">
          <span><strong>{freeMovies.length}+</strong> playable open films</span>
          <span><strong>3</strong> curated movie collections</span>
          <span><strong>₹0</strong> subscription</span>
        </div>
      </section>

      <section className="free-player-section">
        <div className="free-player-heading">
          <div>
            <span className="free-now-playing">NOW PLAYING</span>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.year} · {selectedMovie.duration} · {selectedMovie.genre}</p>
          </div>
          <span className="license-pill">OPENLY RELEASED</span>
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
          <p><strong>Creator:</strong> {selectedMovie.credit}</p>
          <p><strong>Release:</strong> {selectedMovie.type} · {selectedMovie.language}</p>
          <p><strong>License:</strong> {selectedMovie.license} · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">License information</a></p>
          <p><strong>Original source:</strong> <a href={selectedMovie.source} target="_blank" rel="noreferrer">{selectedMovie.sourceName}</a></p>
        </div>
      </section>

      <section className="free-collections-section">
        <div className="free-section-heading">
          <div><span className="free-section-kicker">MORE TO EXPLORE</span><h2>Movie collections</h2></div>
          <p>Full-length catalogues and official sources</p>
        </div>
        <div className="free-collection-grid">
          {collections.map((collection) => (
            <article className="free-collection-card" key={collection.title}>
              <span>{collection.tag}</span>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <a href={collection.url} target="_blank" rel="noreferrer">{collection.link} ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="free-catalog-section">
        <div className="free-catalog-heading">
          <div><span className="free-section-kicker">WATCH INSIDE THE APP</span><h2>Open movie library</h2><p>Choose a film to play it in the player above.</p></div>
          <span>{filteredMovies.length} of {freeMovies.length} films</span>
        </div>
        <div className="free-movie-controls">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search movies, genre or year..."
            aria-label="Search free movies"
          />
          <div className="free-genre-filters" aria-label="Filter by genre">
            {genres.map((genre) => (
              <button type="button" key={genre} className={activeGenre === genre ? "active" : ""} onClick={() => setActiveGenre(genre)}>{genre}</button>
            ))}
          </div>
        </div>
        {filteredMovies.length ? (
          <div className="free-movie-grid">
            {filteredMovies.map((movie) => (
              <button
                type="button"
                key={movie.id}
                className={`free-movie-card ${selectedMovie.id === movie.id ? "selected" : ""}`}
                onClick={() => {
                  setSelectedMovie(movie);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="free-movie-art"><span>▶</span><small>PLAY OPEN MOVIE</small></div>
                <div className="free-movie-card-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.year} · {movie.duration} · {movie.language}</p>
                  <span>{movie.genre}</span>
                </div>
              </button>
            ))}
          </div>
        ) : <p className="free-empty-state">No movies match that search. Try another title or genre.</p>}
      </section>

      <p className="free-movies-note">This page embeds creator-released open films. The external collections are independent catalogues and may have regional restrictions or different copyright rules. Always use the rights-holder's official upload; availability can change.</p>
    </div>
  );
}

export default FreeMovies;
