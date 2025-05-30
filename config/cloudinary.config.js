require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "svg"],
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 3 * 1024 * 1024,
  },
});

const deletedFromCloudinary = async (publicid) => {
  try {
    const result = await cloudinary.uploader.destroy(publicid);
    console.log("cloudinary delete result", result);
  } catch (error) {
    console.log("cant delete from cloudinary");
  }
};

module.exports = { upload, deletedFromCloudinary };
