import axios from "axios";
const rootAPI = import.meta.env.VITE_API_URL;
const postEP = rootAPI + "/post";
const authEP = rootAPI + "/auth";
const userEP = rootAPI + "/user";

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
  const obj = { method: "get", url: postEP };
  return await apiProcessor(obj);
};

export const fetchPost = async (postId) => {
  const obj = {
    method: "get",
    url: `${postEP}/${postId}`,
  };
  return await apiProcessor(obj);
};


export const fetchUser = async () => {
  const obj = {
    method: "get",
    url: `${userEP}`,
    headers:{
      jwtToken: localStorage.getItem("jwtToken")
    }
  };
  return await apiProcessor(obj);
};


export const createPost = async (data) => {
  let token = localStorage.getItem("jwtToken");
  const obj = {
    method: "post",
    url: `${postEP}`,
    data: data,
    headers:
    {
      Authorization: `Bearer ${token}`
    }
  }
  return await apiProcessor(obj);
}

export const fetchUserPost = async () => {
  let token = localStorage.getItem("jwtToken");
  const obj = {
    method: "get",
    url: `${userEP}/post`,
    headers:{
      Authorization: `Bearer ${token}`
    }
  };
  return await apiProcessor(obj);
};
