import multer, { StorageEngine, Multer } from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const imagesDir = "./public/images";
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir); 
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name; 
    const extension = path.extname(file.originalname); 
    const uniqueId = uuidv4(); 
    const newFilename = `${originalName}_${uniqueId}${extension}`;
    cb(null, newFilename);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload: Multer = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
