import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserComments } from "./UserComments";
import { postComment } from "../utils/axiosHelper";
import { toast } from "react-toastify";
import { useAuth } from "../utils/AuthContext";

export const CommentComponent = ({ postid, comments }) => {
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // comment api call
    const response = await postComment(postid, {
      comment,
    });

    if (response.status == "success") {
      // reload
      toast.success(response.message);

      window.location.reload();
    } else {
      toast.error(response.message);
    }
  };

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      {user ? (
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              value={comment}
              onChange={handleOnChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      ) : (
        ""
      )}

      <UserComments comments={comments} />
    </div>
  );
};
