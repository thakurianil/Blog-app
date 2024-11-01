import axios from "axios";
const rootAPI = import.meta.env.VITE_API_URL;
const postEP = rootAPI + "/post";
const authEP = rootAPI + "/auth";
const userEP = rootAPI + "/user";

export const getJWTtoken = () => {
  const token = localStorage.getItem("accessJWT");
  return token;
};

export const setJWTtoken = (token) => {
  localStorage.setItem("accessJWT", token);
};

export const removeJWTtoken = () => {
  localStorage.removeItem("accessJWT"); // Clear the token on logout
};

export const userLogin = async (loginInfo) => {
  const obj = {
    method: "post",
    url: `${authEP}/login`,
    data: loginInfo,
  };

  return await apiProcessor(obj);
};

const apiProcessor = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error?.response?.data?.error || error.message,
    };
  }
};

export const fetchPosts = async () => {
  const obj = { method: "get", url: postEP + "?page=1&limit=10" };
  return await apiProcessor(obj);
};

export const fetchPost = async (postId) => {
  const obj = {
    method: "get",
    url: `${postEP}/${postId}`,
  };
  return await apiProcessor(obj);
};

export const fetchMyPost = async () => {
  let token = getJWTtoken();

  const obj = {
    method: "get",
    url: userEP + "/post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await apiProcessor(obj);
};

export const signup = async (formData) => {

  const obj = {
    method: "post",
    url: authEP + "/signup",
    data: formData,
  };

  return await apiProcessor(obj);
}

export const createPost = async (postData) => {
  let token = getJWTtoken();
  const obj = {
    method: "post",
    url: postEP,
    data: postData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await apiProcessor(obj);
};

export const updatePost = async (id, postData) => {
  let token = getJWTtoken();
  const obj = {
    method: "patch",
    url: postEP + "/" + id,
    data: postData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await apiProcessor(obj);
};

export const likePost = async (id) => {
  let token = getJWTtoken();
  const obj = {
    method: "patch",
    url: postEP + "/like/" + id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await apiProcessor(obj);
};

export const deletePost = async (id) => {
  let token = getJWTtoken();

  const obj = {
    method: "delete",
    url: postEP + "/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return await apiProcessor(obj);
};

export const verifyToken = async () => {
  let token = getJWTtoken();

  const obj = {
    method: "get",
    url: authEP + "/verify",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return await apiProcessor(obj);
};

export const fetchSearchPost = async (query) => {
  const obj = {
    method: "get",
    url: postEP + "/search/" + query,
  };

  return await apiProcessor(obj);
};

export const postComment = async (id, commentObj) => {
  let token = getJWTtoken();

  const obj = {
    method: "post",
    url: postEP + "/comment/" + id,
    data: commentObj,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return await apiProcessor(obj);
};
