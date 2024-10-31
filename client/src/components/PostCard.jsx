import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../utils/AuthContext";

const PostCard = ({ post, likeFunction, deleteFunction }) => {
  const navigate = useNavigate();
  const { userid } = useAuth();

  const updateFunction = (id) => {
    navigate("/mypost/update?id=" + id);
  };

  return (
    <>
      <Card className="post">
        <Card.Img
          variant="top"
          src={post.image}
          style={{ height: "200px", width: "100%", objectFit: "cover" }}
        />
        <Card.Body className="text-start">
          <Card.Title className="d-flex justify-content-between ">
            <Link
              to={"/article?id=" + post._id}
              className=""
              style={{
                maxWidth: "200px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {post.title.slice(0, 30)} ...
            </Link>
            <div className="edit-btns">
              <div className="like-counter">
                <FontAwesomeIcon
                  icon={faHeart}
                  size="sm"
                  style={{
                    cursor: "pointer",
                    color: post.likes.includes(userid) ? "red" : "grey",
                  }}
                  title="Like Article"
                  onClick={() => likeFunction(post._id)} // Example action
                />
                {post.likes.length}
              </div>

              {post.owner ? (
                <>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="sm"
                    style={{ cursor: "pointer", color: "black" }}
                    title="Update Article"
                    onClick={() => updateFunction(post._id)} // Example action
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="sm"
                    style={{ cursor: "pointer", color: "black" }}
                    title="Delete Article"
                    onClick={() => deleteFunction(post._id)} // Example action
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </Card.Title>
          <hr />
          <Card.Text>
            {post.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
          </Card.Text>
          <strong className="author-info">- {post.author?.username}</strong>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostCard;
