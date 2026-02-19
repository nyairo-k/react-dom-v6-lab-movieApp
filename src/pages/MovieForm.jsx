import { useState, useId, useEffect, useRef } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function MovieForm() {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [genres, setGenres] = useState("")

  
  const titleId = useId()
  const navigate = useNavigate()
  const titleInputRef = useRef(null) // Create a reference for the title input

  
  const { director, setDirectors } = useOutletContext()
  
  //  Side Effect: Focus the title input when the form loads
  useEffect(() => {
    titleInputRef.current.focus()
  }, [])

  if (!director) { return <h2>Director not found.</h2>}

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMovie = {
      id: uuidv4(), // Generates a new UUID string to match your db.json style
      title,
      time: parseInt(time),
      genres: genres.split(",").map((genre) => genre.trim()),
    }

    // Ensure director.id is used correctly in the template literal
    fetch(`http://localhost:4000/directors/${director.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movies: [...director.movies, newMovie] })
    })
    .then(r => {
      if (!r.ok) throw new Error("failed to add movie")
      return r.json()
    })
    .then(updatedDirector => {
      // Update the main list in DirectorContainer
      setDirectors(prev => prev.map(d => d.id === updatedDirector.id ? updatedDirector : d))
      // Navigate using the new movie's UUID
      navigate(`/directors/${director.id}/movies/${newMovie.id}`)
    })
  }

  return (
    <div>
      <h2>Add New Movie to {director.name}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor={titleId}>Title:</label>
        <input
          id={titleId}
          ref={titleInputRef} 
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  )
}

export default MovieForm