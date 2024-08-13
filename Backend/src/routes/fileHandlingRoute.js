// import express from 'express';
// import upload from '../middleware/uploadMiddleware.js';

// const router = express.Router();

// router.post('/uploadImage', (req, res, next) => {
//   upload.single('file')(req, res, (err) => {
//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(500).json({ error: 'File upload failed', details: err.message });
//     }
    
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }
    
//     console.log('File uploaded successfully:', req.file);
    
//     res.json({ 
//       message: 'File uploaded successfully',
//       fileUrl: req.file.location // This is the S3 URL
//     });
//   });
// });

// export default router;