import React from 'react'
import { fetchUser } from '../utils/axiosHelper';

export const AutoLogin = async() => {
  const jwtToken = localStorage.getItem("jwtToken");

  if(jwtToken){
    const {status, user}  = await fetchUser;
    return status === "success" ?  user: {};
  }
}
