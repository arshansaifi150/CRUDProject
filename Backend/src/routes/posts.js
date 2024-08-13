//@ts-nocheck
import express from "express";
import Post from "../models/Post.js";
import  upload, { deleteS3Object }  from "../middleware/uploadMiddleware.js";


const router = express.Router();

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: 1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get post by slug

router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    const post = await Post.findOne({ slug: slug });
    // console.log(post)
    res.send(post);
  } catch (error) {
    res.send(404).json({ error });
  }
});

// router.get("/Category/:slug", async (req, res) => {
//   const slug = req.params.slug;
//   try {
//     const post = await Post.findOne({ slug: slug });
//     // console.log(post)
//     res.send(post);
//   } catch (error) {
//     res.send(404).json({ error });
//   }
// });

//create a new post

router.post(
  "/",
  (req, res, next) => {
  // console.log("Received request body:", req.body);
  // console.log("Received files:", req.files);
  
  upload.single("featuredImage")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
  },
  async (req, res) => {
  try {
    // console.log("After Multer middleware - req.body:", req.body);
    // console.log("After Multer middleware - req.file:", req.file);

    const post = new Post({
      title: req.body.title,
      slug: req.body.slug,
      status: req.body.status,
      author: req.body.author,
      tags: req.body.tags,
      editorContent: req.body.editorContent,
      metaDescription: req.body.metaDescription,
      metaTitle: req.body.metaTitle,
      keyWords: req.body.keyWords,
      category: req.body.category,
        altText: req.body.altText,
    });

    if (req.file) {
      post.featuredImageUrl = req.file.location;
    }

    const newPost = await post.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(400).json({ error: error.message });
  }
  }
);
//delete post
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id)
    if (post.featuredImageUrl) {
      const key = post.featuredImageUrl.split('/').pop();
      try {
        await deleteS3Object(key);
        console.log(`Deleted S3 object with key: ${key}`);
      } catch (deleteError) {
        console.error("Error deleting S3 object:", deleteError);
        
        // For now, we'll continue even if S3 deletion fails
      }
    }
    const result = await Post.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.send(console.log("unable to delete"));
  }
});

//update post

router.put("/:slug", upload.single("featuredImage"), async (req, res) => {
  const slugParam = req.params.slug;

  const existingPost = await Post.findOne({ slug: slugParam });
  if (!existingPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  const {
    title,
    slug,
    author,
    editorContent,
    status,
    tags,
    metaDescription,
    metaTitle,
    keyWords,
    category,
    altText,
  } = req.body;

  try {
    let featuredImageUrl = req.body.featuredImageUrl;

    // If a new file was uploaded, update the featuredImageUrl
    if (req.file) {
      if (existingPost.featuredImageUrl) {
        // Extract the key from the existing URL
        const oldKey = existingPost.featuredImageUrl.split('/').pop();
        try {
          await deleteS3Object(oldKey);
        } catch (deleteError) {
          console.error("Error deleting old image, but continuing with update:", deleteError);
        }
      }
      featuredImageUrl = req.file.location; // or however you're storing the file path
    }

    const result = await Post.findOneAndUpdate(
      { slug: slugParam },
      {
        title,
        slug,
        author,
        editorContent,
        status,
        tags,
        featuredImageUrl,
        metaDescription,
        metaTitle,
        keyWords,
        category,
        altText,
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }
    // console.log(altText)
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Unable to update post", error: error.message });
  }
});

//get post by tag
router.get("/tag/:tag", async (req, res) => {
  try {
    const tag = req.params.tag;
    
    // Use $in operator to match any post that has the specified tag in its tags array
    const posts = await Post.find({ tags: { $in: [tag] } });
    
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found with the specified tag" });
    }
    
    res.json(posts);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "An error occurred while fetching posts" });
  }
});

router.get('/uploads',async(req,res)=>{
  try {
    const featuredImage = await Post.find()
  } catch (error) {
    
  }
})

export default router;
