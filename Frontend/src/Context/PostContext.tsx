//@ts-nocheck
// PostContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [allpostsContext, setAllpostsContext] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/posts`);
        const data = response.data;
        setAllpostsContext(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, []);

  return (
    <PostContext.Provider value={{ allpostsContext, setAllpostsContext }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);