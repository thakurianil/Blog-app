import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { createPost } from "../utils/axiosHelper";

const CreatePostPage = () => {


  const  initialState = {
    id: "",
    title: "",
    content: "",
    author: "",
    own:true,
  }
  const [formData , setFormData] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
    
  }

  const handleOnSubmit = async(e) =>{
    e.preventDefault();
    const response = await createPost(formData);
    console.log("Form Data:", formData);

  }


  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center"
        style={{ width: "66%", margin: "0 auto" }}
      >
        <Row style={{ width: "100%" }}>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>Create Post</h1>
            <hr />
            <Form onSubmit={handleOnSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title" 
                  required
                  name="title"
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId="formContent" className="mt-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter post content"
                  required
                  name="content"
                  onChange={handleOnChange}

                />
              </Form.Group>

              <Form.Group controlId="formImageUrl" className="mt-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="image"
                  onChange={handleOnChange}

                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Create Post
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CreatePostPage;
