import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { Context } from "../App";
import { useContext } from "react";

const Movie = () => {
  const [user] = useContext(Context);
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });
  let { id } = useParams();
  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, user.id)
      .then(() => {
        setMovie((prevState) => {
          prevState.reviews.splice(index, 1);
          return { ...prevState };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getMovie(id);
  }, [id]);
  return (
    <div>
      <Container className='mt-4'>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as='h5'>{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {user && (
                  <Link to={"/movies/" + id + "/review"}>Add Review</Link>
                )}
              </Card.Body>
            </Card>
            <br />
            <h2>Reviews</h2>
            <br />
            {movie.reviews.map((review, index) => {
              return (
                <Container key={index}>
                  <div>
                    <h5>
                      {review.name +
                        " reviewed on " +
                        moment(review.date).format("DD/MM/YYYY")}
                    </h5>
                    <p>{review.review}</p>
                    {user && user.id === review.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={"/movies/" + id + "/review"}
                            state={{ currentReview: review }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant='link'
                            onClick={() => deleteReview(review._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </div>
                </Container>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Movie;
