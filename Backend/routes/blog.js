const express = require("express");
const router = express.Router();
const Blog = require("../model/Blog");
const User = require("../model/User");
const multer = require("multer");
const getUser = require("../middleware");
const {
  handleUpload,
  handleSignup,
  handleLogin,
  handlecreate,
  handlereturn,
  handleDelete,
  handleUpdate,
  handleComment,
  handleDeleteComment,
  handleLike,
} = require("./../controllers/blog");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../uploads/");
//   },
// });
// const upload = multer({ storage: storage });
const upload = multer({ dest: "../uploads/" });

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({ blogs: blogs });
  } catch (error) {
    return res.status(404).send("Not Found");
  }
});

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.post("/create", getUser, handlecreate);

router.get("/read/:id", handlereturn);

router.get("/myblogs", getUser, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email: email }).populate("blogs");
    return res.status(200).json({ blogs: user.blogs });
  } catch (error) {
    return res.status(404).send("Not Found");
  }
});

router.delete("/myblogs/delete/:id", getUser, handleDelete);

router.put("/edit/:id", handleUpdate);

router.post("/upload", upload.single("file"), handleUpload);

router.get("/logout", (req, res) => {
  res.status(200).clearCookie("token").json({ msg: "Logged Out Successfully" });
});

router.post("/like", getUser, handleLike);

router.post("/comments", getUser, handleComment);

router.delete("/comments/:id1/:id2", handleDeleteComment);

module.exports = router;
