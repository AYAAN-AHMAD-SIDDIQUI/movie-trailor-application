import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import FreeMovies from "./pages/FreeMovies";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";
function App() {
  return (
    <MovieProvider><NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/free-movies" element={<FreeMovies />} />
        </Routes>
      </main></MovieProvider>
     
    
  );
}

export default App;