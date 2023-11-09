import { useEffect } from "react";
import { useState } from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Details from "./Pages/Details";

const unauthenticatedRoutes = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
    </Routes>
  )
}

const authenticatedRoutes = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/details" element={<Details/>}/>
    </Routes>
  )
}

function App() {

  const [routes, setRoutes] = useState(unauthenticatedRoutes)
  const [accessToken] = useState(localStorage.getItem("drive-rent-access-token"))

  useEffect(() => {
    if (localStorage.getItem("drive-rent-access-token"))
      setRoutes(() => authenticatedRoutes)
    else
      setRoutes(() => unauthenticatedRoutes)
  }, [accessToken])

  return (
    <BrowserRouter>
      {typeof routes === "function" && routes()}
    </BrowserRouter>
  )
}

export default App
