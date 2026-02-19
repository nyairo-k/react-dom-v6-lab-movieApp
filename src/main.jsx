import "./index.css"
import ReactDOM from "react-dom/client"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
// We don't need BrowserRouter here anymore because it's inside App!
root.render(<App />)