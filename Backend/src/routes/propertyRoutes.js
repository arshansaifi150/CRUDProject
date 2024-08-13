import express from "express";
import { Property } from "../models/models.js";
import upload, { deleteS3Object } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create new property
router.post("/properties", upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 30 }
]), async (req, res) => {
  try {
    const propertyData = {
      title: req.body.title,
      price: req.body.price,
      bathrooms: req.body.bathrooms,
      area: req.body.area,
      location: req.body.location,
      propertyType: req.body.propertyType,
      googleMapEmbeddedUrl: req.body.googleMapEmbeddedUrl,
      about_builder: req.body.about_builder,
      address: req.body.address,
      overview: req.body.overview,
      downloads: req.body.downloads,
      types: req.body.types,
      youtubeVideoUrl: req.body.youtubeVideoUrl
    };

    // Handle multiple selections for bedrooms and other array fields
    ['bedrooms', 'amenities', 'highlights', 'neighbourhood'].forEach(field => {
      propertyData[field] = Array.isArray(req.body[field]) ? req.body[field] : [req.body[field]].filter(Boolean);
    });

    if (req.files['image']) {
      propertyData.image = req.files['image'][0].location;
    }

    if (req.files['gallery']) {
      propertyData.gallery = req.files['gallery'].map(file => file.location);
    }

    const property = new Property(propertyData);
    const newProperty = await property.save();
    res.status(201).json({ message: "Property created successfully", newProperty });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Error creating property", status: false });
  }
});

// Get all properties
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find().sort({ _id: -1 });
    res.json({ data: properties, status: true });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Error fetching properties", status: false });
  }
});

// Get a single property
router.get("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found", status: false });
    }
    res.json({ data: property, status: true });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "Error fetching property", status: false });
  }
});

// Update property
router.put("/properties/:id", upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 30 }
]), async (req, res) => {
  const id = req.params.id;
  try {
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    const updateData = {
      title: req.body.title,
      price: req.body.price,
      bathrooms: req.body.bathrooms,
      area: req.body.area,
      location: req.body.location,
      propertyType: req.body.propertyType,
      googleMapEmbeddedUrl: req.body.googleMapEmbeddedUrl,
      about_builder: req.body.about_builder,
      address: req.body.address,
      overview: req.body.overview,
      downloads: req.body.downloads,
      types: req.body.types,
      youtubeVideoUrl: req.body.youtubeVideoUrl
    };

    // Handle multiple selections for bedrooms and other array fields
    ['bedrooms', 'amenities', 'highlights', 'neighbourhood'].forEach(field => {
      updateData[field] = Array.isArray(req.body[field]) ? req.body[field] : [req.body[field]].filter(Boolean);
    });

    // ... rest of the update logic remains the same

    const updateProperty = await Property.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updateProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Unable to update property", error: error.message });
  }
});

// Delete property
router.delete("/properties/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Delete main image from S3
    if (property.image) {
      const imageKey = property.image.split('/').pop();
      await deleteS3Object(imageKey);
    }

    // Delete gallery images from S3
    for (let galleryImageUrl of property.gallery) {
      const galleryImageKey = galleryImageUrl.split('/').pop();
      await deleteS3Object(galleryImageKey);
    }

    const deleteProperty = await Property.findByIdAndDelete(id);
    res.status(200).json({ message: "Property deleted successfully", deleteProperty });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Unable to delete Property", error: error.message });
  }
});

export default router;