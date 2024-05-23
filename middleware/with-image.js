import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dlubvqgvr',
  api_key: '967419773818131',
  api_secret: 'dWOxZ-Jo7OO469HO4WClkQBJT6I',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'images',
      format: 'jpg',
    };
  },
});

const upload = multer({ storage: storage });

export default upload.single('image');
