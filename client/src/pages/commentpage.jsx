import React, { useState } from "react";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { fetchPost, postComment } from "../utils/axiosHelper";
import { Await } from "react-router";
import { useEffect } from "react";
import UserComments from "../components/UserComments";
import { getPostById } from "../../../api/src/models/postSchema";
const CommentPage = ({ postid, comments,}) => {
  const navigate = useNavigator();
    const [formData, setFormData] = useState({
    comment: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const response = await postComment(postid, formData);
    getPostById(postid);
    
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter comment content"
            required
            name="comment"
            value={formData.comment}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Button className="mb-3 " variant="primary" type="submit">
          Add Comment
        </Button>
      </Form>
      <UserComments data={comments || []}
      />
    </>
  );
};

export default CommentPage;
