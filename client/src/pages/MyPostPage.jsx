import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Navbar";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import { FloatingButton } from "../components/FloatingButton";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserPost } from "../utils/axiosHelper";

const MyPostPage = () => {
  const [userPost, setUserPost] = useState([]);

  const getPost = async () => {
    const response = await fetchUserPost();
    if (response.status == "error") {
      console.log("error");
    } else {
      setUserPost(response.data);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Header />
      <Link to="/mypost/create">
        <FloatingButton />
      </Link>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ width: "66%", margin: "0 auto" }}
      >
        <Row className="mt-4">
          <Col className="text-center">
            <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center">
              {userPost.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default MyPostPage;
