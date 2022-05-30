import React, { useState } from "react";
import MovieDataService from "../services/movies";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Context } from "../App";
import { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const AddReview = () => {
  const [user] = useContext(Context);
  const { id } = useParams();

  let editing = false;
  let initialReviewState = "";

  const location = useLocation();
  const { currentReview } = location.state;
  console.log(currentReview);
  if (currentReview && location.state) {
    editing = true;
    initialReviewState = currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  // keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false);
  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };
  const saveReview = () => {
    var data = {
      review: review,
      name: user.name,
      user_id: user.id,
      movie_id: id, // get movie id derect from url
    };
    if (editing) {
      // get existing review id
      data.review_id = currentReview._id;
      MovieDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then(() => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      {submitted ? (
        <div style={{ width: "60%" }} className='mx-auto mt-4'>
          <h4>Review submitted successfully</h4>
          <Link to={"/movies/" + id}>Back to Movie</Link>
        </div>
      ) : (
        <Form style={{ width: "60%" }} className='mx-auto mt-4'>
          <Form.Group>
            <Form.Label>
              {editing ? "Edit " : "Create "}
              Review
            </Form.Label>
            <Form.Control
              type='text'
              required
              value={review}
              onChange={onChangeReview}
            />
          </Form.Group>
          <Button variant='primary' onClick={saveReview} className='mt-2'>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};
export default AddReview;
