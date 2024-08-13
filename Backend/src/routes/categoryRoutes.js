import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

//get post by categoryName

router.get('/Category/:category', async (req, res) => {
  
    console.log("Category param:", req.params.category);
    
    try {
      const category = req.params.category;
      const posts = await Post.find({ category: category });
      
      
      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found for this category" });
      }
      
    
      res.send(posts);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred while fetching posts" });
    }
  });



  

  export default router