import { useState, useId } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

function DirectorForm() {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  const nameId = useId() // Generates a unique ID for the name input
  const bioId = useId()  // Generates a unique ID for the bio textarea
  const navigate = useNavigate() // Function to change the URL programmatically
  const { setDirectors } = useOutletContext() // Function to update the parent's state

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDirector = { name, bio, movies: [] }
    
    fetch("http://localhost:4000/directors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDirector)
    })
    .then(r => {
        if (!r.ok) { throw new Error("failed to add director")}
        return r.json()
    })
    .then(data => {
        // 3. Handle context/state changes
        // We take the existing directors and append the newly created 'data'
        setDirectors((prevDirectors) => [...prevDirectors, data])
        
        // 4. Navigate to newly created director page
        // We use the ID returned from the server to go to /directors/[id]
        navigate(`/directors/${data.id}`)
    })
    .catch(console.log)
  }

  return (
    <div>
      <h2>Add New Director</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor={nameId}>Name:</label>
        <input
          id={nameId}
          type="text"
          placeholder="Director's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor={bioId}>Bio:</label>
        <textarea
          id={bioId}
          placeholder="Director's Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <button type="submit">Add Director</button>
      </form>
    </div>
  )
}

export default DirectorForm