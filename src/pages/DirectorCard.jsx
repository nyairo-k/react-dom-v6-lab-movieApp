// pages/DirectorCard.jsx
import { useParams, useOutletContext, Link, Outlet } from "react-router-dom";

function DirectorCard() {
    const { id } = useParams();
    const { directors, setDirectors } = useOutletContext();

    
    const director = directors.find(d => String(d.id) === String(id));


    if (directors.length === 0) return <h2>Loading...</h2>;

    if (!director) {
        return <h2>Director not found.</h2>
    }

    return (
        <div>
            <h2>{director.name}</h2>
            <p>{director.bio}</p>
            <h3>Movies:</h3>
            <ul>
                {director.movies.map((movie) => (
                    <li key={movie.id}>
                        {/* We use movie.id here which is a UUID string */}
                        <Link to={`movies/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to={`movies/new`}>Add New Movie</Link>
            {/* Pass setDirectors so children can update the main list */}
            <Outlet context={{ director, setDirectors }} />
        </div>
    )
}

export default DirectorCard;