//@ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import Category from './Category';
import PostDetails from '../pages/PostDetails';



function CategoryOrPost() {
    const CATEGORIES = ['Gurgaon-Property','Home-Decor']; // Replace with your actual category names
  const { param } = useParams();

  if (CATEGORIES.includes(param)) {
    return <Category category={param} />;
  } else {
    return <PostDetails slug={param} />;
  }
}

export default CategoryOrPost;