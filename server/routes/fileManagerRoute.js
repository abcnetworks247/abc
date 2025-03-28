const router = require("express").Router();
const {
  UploadFile,
  GetFiles,
  DeleteFile,
  DeleteMultipleFiles,
} = require("../controllers/fileManagerController");
const authCheker = require("../middlewares/adminAuthChecker");


const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.route("/upload").post(authCheker, upload.single("image"), UploadFile);
router
  .route("/file/upload")
  .post(authCheker, upload.single("image"), UploadFile);
router.route("/files").get(authCheker, GetFiles);
router.route("/file/:id").delete(authCheker, DeleteFile);
router.route("/files/delete").post(authCheker, DeleteMultipleFiles);

module.exports = router;
