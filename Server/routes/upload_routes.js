import express from "express";
import upload  from "../config/multer.js";
import Product from "../model/addproduct.js"
const router = express.Router();

router.post("/uploads", upload.array("images", 5), async (req, res) => {
  try {
    if (req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least one image." });
    }    

    const fileNames = req.files.map((file) => file.filename);

    const savedImage = await Product.create({ images: fileNames });

    res.json({ message: "Images uploaded and saved successfully!", document: savedImage });
  } catch (error) {
    res.status(500).json({ error: "Error uploading images" });
  }
});

export default router; 