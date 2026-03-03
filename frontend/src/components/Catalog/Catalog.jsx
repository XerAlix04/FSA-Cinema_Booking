import { useState } from 'react'
import moviesData from '../../movies.json'
import './catalog.css'
import MovieCard from '../MovieCard/MovieCard'

function Catalog() {
  const [movies] = useState(moviesData)

  return (
    <div className="catalog-container">
      <h1>Danh Sách Phim Đang Chiếu</h1>
      
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Catalog
