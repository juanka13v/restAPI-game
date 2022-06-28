const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "NewGames",
  });
}

async function deleteImage(id) {
  return await cloudinary.uploader.destroy(id);
}

module.exports = { uploadImage, deleteImage };
