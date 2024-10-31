import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [{ type: String }],
  comments: [
    {
      comment: { type: String, required: true },
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      commentedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("post", postSchema);

export const getPosts = async (page, limit) => {
  return await Post.find().populate("author").limit(limit);
};

export const getPostById = async (id) => {
  return await Post.findById(id).populate("author comments.userid");
};

export const createPost = async (post) => {
  const newPost = new Post(post);
  return await newPost.save();
};

export const updatePost = async (id, updateData) => {
  const data = await Post.findByIdAndUpdate(
    id,
    {
      $set: updateData,
    },
    { new: true }
  );

  return data;
};

export const deletePost = async (id) => {
  await Post.findByIdAndDelete(id);
};

export const searchPost = async (query, projection) => {
  const data = Post.find(query, projection).populate({
    path: "author",
    select: "-_id",
  });
  return data;
};
