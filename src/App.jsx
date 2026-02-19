import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import DirectorContainer from "./pages/DirectorContainer"
import DirectorList from "./pages/DirectorList"
import DirectorForm from "./pages/DirectorForm"
import DirectorCard from "./pages/DirectorCard"
import MovieCard from "./pages/MovieCard"
import MovieForm from "./pages/MovieForm"


const App = () => {
    return (

        <BrowserRouter>
        <Routes>
            {/* Top level routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* Nested Route: DirectorContainer acts as a Layout for directors */}
            <Route path="/directors" element={<DirectorContainer />}>
                {/* Index route: What shows up at "/directors" exactly */}
                <Route index element={<DirectorList />} />
                <Route path="new" element={<DirectorForm />} />
                
                {/* Nested Route: DirectorCard shows a specific director */}
                <Route path=":id" element={<DirectorCard />}>
                    {/* Nested Route: Specific movie details or adding a movie */}
                    <Route path="movies/new" element={<MovieForm />} />
                    <Route path="movies/:movieId" element={<MovieCard />} />
                </Route>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App
