import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./App.css"
import { Home, Navbar, Login, imageGenerationForm } from "./components"

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/generate" Component={imageGenerationForm} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
