import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
} from "../models/postSchema.js";
import { authenticateJWT } from "../middleware/authenticate.js";

const router = express.Router();

// get all posts
router.get("/", async (req, res) => {
  try {
    let data = await getPosts();

    let postData = [...data];

    const respObj = {
      status: "success",
      message: "All Posts Fetched!",
      data: postData,
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: "error",
      message: "Error fetching",
      error: {
        code: 500,
        details: err.message || "Erro fetching post",
      },
    };

    return res.status(500).send(errObj);
  }
});

// create post
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const { user } = req;

    const postData = await createPost({
      title,
      content,
      image,
      author: user._id,
    });

    const respObj = {
      status: "success",
      message: "Post Created Successfully!",
    };

    return res.status(201).send(respObj);
  } catch (err) {
    const errObj = {
      status: "error",
      message: "Error creating",
      error: {
        code: 500,
        details: err.message || "Error creating post",
      },
    };

    return res.status(500).send(errObj);
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postData = await getPostById(id);

    const respObj = {
      status: "success",
      message: "Successfully Fetched Post",
      data: postData,
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: "error",
      message: "Error fetching",
      error: {
        code: 500,
        details: err.message || "Error fetching post",
      },
    };

    return res.status(500).send(errObj);
  }
});

// delete post
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const postData = await getPostById(id);

    if (!postData) {
      const errObj = {
        status: "error",
        message: "Not Found",
        error: {
          code: 400,
          details: "Post not found",
        },
      };

      return res.status(404).send(errObj);
    }

    if (postData.author._id.toString() !== user._id) {
      const errObj = {
        status: "error",
        message: "Unauthorized",
        error: {
          code: 403,
          details: "You are not authorized!",
        },
      };

      return res.status(403).send(errObj);
    }

    await deletePost(id);

    const respObj = {
      status: "success",
      message: "Post Deleted Successfully!",
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: "error",
      message: "Error Deleting",
      error: {
        code: 500,
        details: err.message || "Error Deleting post",
      },
    };

    return res.status(500).send(errObj);
  }
});

export default router;
