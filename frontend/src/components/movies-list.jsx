import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [isLoading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);
  useEffect(() => {
    retrieveMovies();
  }, [currentPage]);
  const retrieveMovies = () => {
    setCurrentSearchMode("");
    setLoading(true);
    MovieDataService.getAll(currentPage)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveRatings = () => {
    setLoading(true);
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const find = (query, by) => {
    MovieDataService.find(query, by, currentPage)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
  };
  const findByRating = () => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };
  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);
  useEffect(() => {
    //retrieveMovies();
    retrieveNextPage();
  }, [currentPage]);
  const retrieveNextPage = () => {
    if (currentSearchMode === "findByTitle") findByTitle();
    else if (setCurrentSearchMode === "findByRating") findByRating();
    else retrieveMovies();
  };
  return (
    <div className='App'>
      <Container className='mt-4' style={{ minHeight: "100vh" }}>
        <h1>Movies</h1>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type='text'
                  placeholder='Search by title'
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                className='mt-2'
                variant='primary'
                type='button'
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as='select' onChange={onChangeSearchRating}>
                  {ratings.map((rating, index) => {
                    return (
                      <option key={index} value={rating}>
                        {rating}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                className='mt-2'
                variant='primary'
                type='button'
                onClick={findByRating}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        {!isLoading ? (
          <>
            <br />
            Showing page: {currentPage}.
            <Button
              variant='link'
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Get next {entriesPerPage} results
            </Button>
            <Row className='mt-4'>
              {movies.map((movie) => {
                return (
                  <Col key={movie._id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img src={movie.poster + "/100px180"} />
                      <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>Rating: {movie.rated}</Card.Text>
                        <Card.Text>{movie.plot}</Card.Text>
                        <Button
                          variant='outline-primary'
                          as={Link}
                          to={"/movies/" + movie._id}
                        >
                          View Reviews
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          <Row className='justify-content-center'>
            <Spinner className='mt-4' animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </Row>
        )}
        <br />
        Showing page: {currentPage}.
        <Button
          variant='link'
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Get next {entriesPerPage} results
        </Button>
      </Container>
    </div>
  );
}
export default MoviesList;
