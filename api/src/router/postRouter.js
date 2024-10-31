import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  searchPost,
  updatePost,
} from "../models/postSchema.js";
import { authenticateJWT } from "../middleware/authenticate.js";

const router = express.Router();

// get all posts
router.get("/", async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let data = await getPosts(page, limit);

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
    console.log(err);
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

router.get("/search/:query", async (req, res) => {
  //query call
  const { query } = req.params;
  const postData = await searchPost({
    title: { $regex: new RegExp(query, "i") },
  });

  // const postData = await searchPost({
  //   $or: [
  //     { title: { $regex: new RegExp(query, "i") } },
  //     { content: { $regex: new RegExp(query, "i") } },
  //   ],
  // });

  const respObj = {
    status: "success",
    message: "post found",
    data: postData,
  };

  return res.send(respObj);
});

router.patch("/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const postData = req.body;
    const updatedData = await updatePost(id, postData);
    const respObj = {
      status: "success",
      message: "Post updated successfully",
    };

    return res.status(200).send(respObj);
  } catch (err) {
    console.log(err);
    const errObj = {
      status: "error",
      message: "Error updating",
      error: {
        code: 500,
        details: err.message || "Error updating post",
      },
    };

    return res.status(errObj.error.code).send(errObj);
  }
});

router.patch("/like/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const postData = await getPostById(id);

    let likedList = postData.likes;

    if (likedList.includes(req.user._id)) {
      likedList = likedList.filter((item) => item != req.user._id);
    } else {
      likedList.push(req.user._id);
    }

    const updatedData = await updatePost(id, { likes: likedList });

    console.log(updatedData);

    const respObj = {
      status: "success",
      message: "Post liked",
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: "error",
      message: "Erro liking post!",
      error: {
        code: 500,
        message: err.message || "Error liking post",
      },
    };
    return res.status(errObj.error.code).send(errObj);
  }
});

router.post("/comment/:id", authenticateJWT, async (req, res) => {
  // receive from url
  const { id } = req.params;
  // receive from comment form data
  const { comment } = req.body;

  try {
    // retrieve old comments from database
    const postData = await getPostById(id);

    // old comment list
    let commentList = postData.comments;

    // new comment
    let newCommentObject = {
      comment: comment,
      userid: req.user._id,
    };

    // add new comment to old comment list
    commentList.push(newCommentObject);

    const updatedData = await updatePost(id, { comments: commentList });

    const respObj = {
      status: "success",
      message: "Successfully Commented",
    };

    return res.status(200).send(respObj);
  } catch (err) {
    const errObj = {
      status: "error",
      message: "Erro commenting in the post!",
      error: {
        code: 500,
        message: err.message || "Error commenting in the post",
      },
    };
    return res.status(errObj.error.code).send(errObj);
  }
});

export default router;
