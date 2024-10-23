import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Header from "../components/Navbar";
import Footer from "../components/footer";

const CreatePostPage = () => {
  const post = {
    id: "id",
    title: "Post Title",
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    author: "John Doe",
    own: true,
  };
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
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  required
                  name="title"
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
                />
              </Form.Group>

              <Form.Group controlId="formImageUrl" className="mt-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="image"
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
