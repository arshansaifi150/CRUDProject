import express from "express";
import mongoose from "mongoose";
import  upload  from "./src/middleware/uploadMiddleware.js";
import { Visit, Career, Contact, Enquiry } from "./src/models/models.js";
import cors from "cors";
import dotenv from "dotenv";

import morgan from "morgan";
import postRoutes from "./src/routes/posts.js";
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import cookieParser from "cookie-parser";
import propertyRoutes from "./src/routes/propertyRoutes.js";
import sitemapRouter from './src/routes/sitemapRouter.js'

// import fileRoute from './src/routes/fileHandlingRoute.js'

import path from "path";
import { fileURLToPath } from 'url';
import FormData from "./src/models/FormData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

//send images to frontend
// app.use('/uploads', (req, res, next) => {
//   console.log('Requested file:', req.url);
//   next();
// });
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://test.symbiosisinfra.com",
      
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);

app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "compute-pressure=*");
  next();
});
app.use(express.json());
app.use(morgan("dev"));

const URI = process.env.MONGO_DB_URI;
if (!URI) {
  console.error("MongoDB URI is not defined.");
  process.exit(1);
}

app.use(cookieParser());

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected");
    startServer();
  })
  .catch((error) => {
    console.error(
      "Database connection error:",
      error instanceof Error ? error.message : "An unknown error occurred"
    );
    process.exit(1);
  });

// Visit API routes
app.post("/visits", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      project,
      receiveUpdates,
      date,
      time,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !phoneNumber || !project || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const visit = new Visit({
      firstName,
      lastName,
      email,
      phoneNumber,
      project,
      receiveUpdates,
      date,
      time,
    });

    await visit.save();

    res.status(200).json({ message: "Visit form submitted successfully" });
  } catch (error) {
    console.error("Error handling visit form submission:", error);
    res.status(500).json({ error: "Error submitting visit form" });
  }
});

// Career API routes
app.post("/careers", upload.single("resume"), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      currentCompany,
      currentCtc,
      expectedCtc,
      earliestStartDate,
      role,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !mobile || !role || !req.file) {
      // If validation fails, delete the uploaded file
      if (req.file) {
        await deleteS3Object(req.file.key);
      }
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resumeUrl = req.file.location; // S3 URL of the uploaded file

    const career = new Career({
      firstName,
      lastName,
      email,
      mobile,
      currentCompany,
      currentCtc,
      expectedCtc,
      earliestStartDate,
      role,
      resume: resumeUrl, // Save S3 URL
    });

    await career.save();

    res.status(200).json({ message: "Career form submitted successfully" });
  } catch (error) {
    console.error("Error handling career form submission:", error);
    // If there's an error, attempt to delete the uploaded file
    if (req.file) {
      try {
        await deleteS3Object(req.file.key);
      } catch (deleteError) {
        console.error("Error deleting S3 object:", deleteError);
      }
    }
    res.status(500).json({ error: "Error submitting career form" });
  }
});

// Contact API routes
app.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, mobile, email, message, receiveUpdates } =
      req.body;

    // Validation
    if (!firstName || !lastName || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const contact = new Contact({
      firstName,
      lastName,
      mobile,
      email,
      message,
      receiveUpdates,
    });

    await contact.save();

    res.status(200).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    res.status(500).json({ error: "Error submitting contact form" });
  }
});

// Enquiry API routes
app.post("/enquiries", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      city,
      phoneNumber,
      project,
      receiveUpdates,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !phoneNumber || !project || !country) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const enquiry = new Enquiry({
      firstName,
      lastName,
      email,
      country,
      city,
      phoneNumber,
      project,
      receiveUpdates,
    });

    await enquiry.save();

    res.status(200).json({ message: "Enquiry form submitted successfully" });
  } catch (error) {
    console.error("Error handling enquiry form submission:", error);
    res.status(500).json({ error: "Error submitting enquiry form" });
  }
});

//forData api
app.post("/formData", async (req, res) => {
 try {
  const formData = new FormData({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    propertyId:req.body.propertyId,
    receiveUpdates:req.body.receiveUpdates
  })

  

  const form = await formData.save()
  res.status(200).json(form);

 } catch (error) {
    console.log("Error: ",error)
 }
});


app.use("/posts", postRoutes);

app.use("/", authRoutes);
app.use("/", categoryRoutes);
app.use("/", propertyRoutes);
app.use('/sitemap.xml', sitemapRouter);
// app.use('/',fileRoute)
function startServer() {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
