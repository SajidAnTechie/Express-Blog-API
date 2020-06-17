const multer = require("multer");
const createError = require("../utilis/createError");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);

  cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}).single("projectImage");

const ProjectImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) throw createError(400, err);

    next();

    // Everything went fine.
  });
};

module.exports = ProjectImage;
