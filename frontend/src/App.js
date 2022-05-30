import { Routes, Route, Link } from "react-router-dom";
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { createContext } from "react";
export const Context = createContext();
function App() {
  const [user, setUser] = useState(null);
  async function logout() {
    setUser(null);
  }
  return (
    <Context.Provider value={[user, setUser]}>
      <div className='App'>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand as={Link} to='/'>
            19521589
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to={"/movies"}>
                Movies
              </Nav.Link>
              {user ? (
                <Nav.Link onClick={logout}>Logout User</Nav.Link>
              ) : (
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path={"/"} element={<MoviesList />} />;
          <Route path={"/movies"} element={<MoviesList />} />;
          <Route path={"/movies/:id/review"} element={<AddReview />}></Route>
          <Route path={"/movies/:id/"} element={<Movie />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
        </Routes>
      </div>
    </Context.Provider>
  );
}
export default App;
