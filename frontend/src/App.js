import { Routes, Route, Link } from "react-router-dom";
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App(props) {
  const [user, setUser] = useState(null);
  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
  return (
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
        <Route
          path={"/movies/:id/review"}
          element={<AddReview {...props} login={login} />}></Route>
        <Route
          path={"/movies/:id/"}
          element={<Movie {...props} login={login} />}></Route>
        <Route
          path={"/login"}
          element={<Login {...props} login={login} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
