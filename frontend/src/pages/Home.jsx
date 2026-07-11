import MovieCard from "../components/MovieCard"
import { useState,useEffect } from 'react'
import "../css/Home.css"
import { searchMovies, getPopularMovies } from "../service/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
       const [error, setError] = useState(null);
      
       const [loading, setLoading] = useState(false);
    useEffect(() => {
      const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
      }
      loadPopularMovies();
    }, [])
    const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input 
                type="text" 
                placeholder="Search for a movie..." 
             value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button type="submit">Search</button>
            </form>
            
            <div className="movies-grid">
                {movies.map((movie) => (
                    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                        <MovieCard key={movie.id} movie={movie} />
                    )
                ))}
            </div>
        </div>
    )
}

export default Home