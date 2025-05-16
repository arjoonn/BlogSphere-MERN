import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./partials/Navbar";
import Addblog from "./Addblog";
import View from "./View";
import Blogs from "./Blogs";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
          <Route path="/add-new" element={<Addblog />} />
          <Route path="/blogs/:id" element={<View />} />
          <Route path="/blogs" element={<Blogs/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
