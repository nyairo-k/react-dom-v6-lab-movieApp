// 1. Native Import: useOutletContext to get data, Link to navigate
import { useOutletContext, Link } from "react-router-dom";


const DirectorList = () => {
    // Replace me
    const { directors } = useOutletContext();

    const displayDirectors = directors.map(d => (
        <li key={d.id}>
            <Link typeof="button" to={`${d.id}`}>{d.name}</Link>
        </li>
    ))

    return (
        <ul>
            {displayDirectors}
        </ul>
    );
}


export default DirectorList;

    