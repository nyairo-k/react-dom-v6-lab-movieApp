import { useState, useEffect, useId } from "react"
import { useParams, useOutletContext } from "react-router-dom"

function MovieCard() {
  const { movieId } = useParams() // Grabs ':movieId' from the URL
  const { director } = useOutletContext() // Grabs 'director' from DirectorCard
  const movieSectionId = useId() // Generates a unique ID for this movie view
  

  const [likes, setLikes] = useState(0)

  if (!director) return <h2>Director not found.</h2>
  
  // CHANGE: Compare movie IDs as strings
  const movie = director.movies.find(m => String(m.id) === String(movieId))
  
  if (!movie) return <h2>Movie not found.</h2>

  return (
    <div id={movieSectionId}>
      <h2>{movie.title}</h2>
      <p>⏱️ Duration: {movie.time} minutes</p>
      <p>🎬 Genres: {movie.genres.join(", ")}</p>
      <button onClick={() => setLikes(prev => prev + 1)}>
        ❤️ Likes: {likes}
      </button>
    </div>
  )
}

export default MovieCard