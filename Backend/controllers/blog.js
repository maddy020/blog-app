const User = require("../model/User");
const Blog = require("../model/Blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) return res.status(400).send("User Already Exists");
    const salt = await bcrypt.genSalt(10);
    const hpassword = await bcrypt.hash(password, salt);
    const user = new User({ email: email, password: hpassword, name: name });
    await user.save();
    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error("Error in signup", error);
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ msg: "Invalid Password" });
  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.secret
  );
  const decoded = jwt.verify(token, process.env.secret);
  return res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({
      token: decoded.name,
      msg: "Logged In Successfully",
    });
}

async function handleLogout(req, res) {
  return res
    .status(200)
    .clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" })
    .json({ msg: "Logged Out Successfully" });
}

async function handlecreate(req, res) {
  try {
    const rest = await Blog.create({
      id: Math.floor(Math.random() * 1000),
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      author: req.user.name,
    });
    //adding the blog to the user schema
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $push: { blogs: rest._id } }
    );
    return res.status(200).json({ message: "created" });
  } catch (error) {
    console.error("Error in updating to database", error);
  }
}

async function handlereturn(req, res) {
  try {
    const id = parseInt(req.params.id);
    const blog = await Blog.findOne({ id });
    if (!blog) return res.status(404).send("Not Found");
    return res.status(200).send(blog);
  } catch (error) {
    console.error("Error in getting the blog", error);
  }
}

async function handleDelete(req, res) {
  try {
    const id = req.params.id;
    const blogId = await Blog.findOne({ id: id });
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { blogs: blogId._id } }
    );

    await Blog.findOneAndDelete({ id: id });

    return res.status(200).send("Deleted Successfully");
  } catch (error) {
    console.log(error);
    return res.status(401).send("Unable to delete at this moment ");
  }
}

async function handleUpdate(req, res) {
  try {
    const id = parseInt(req.params.id);
    const blog = req.body;
    await Blog.findOneAndUpdate(
      { id: id },
      {
        title: blog.title,
        subtitle: blog.subtitle,
        content: blog.content,
      }
    );

    return res.status(200).send("Updated Successfully");
  } catch (error) {
    console.error("Error in updating the blog", error);
  }
}

async function handleUpload(req, res) {
  try {
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath);
    console.log(result);
    return res.status(200).send(result.secure_url);
  } catch (error) {
    console.log("Error in uploading the image", error);
    return res.status(401).send("Error in uploading the image");
  }
}

async function handleComment(req, res) {
  try {
    console.log(req.body.blogid);
    console.log(req.body);
    await Blog.findOneAndUpdate(
      { _id: req.body.blogid },
      {
        $push: { comments: { user: req.user.name, content: req.body.comment } },
      }
    );

    return res.send("Comment added successfully");
  } catch (error) {
    console.log("Error", error);
  }
}

async function handleDeleteComment(req, res) {
  try {
    const id = req.params.id2;
    const blogid = req.params.id1;
    await Blog.findOneAndUpdate(
      { _id: blogid },
      {
        $pull: { comments: { _id: id } },
      }
    );
    return res.status(200).send("Successfully Deleted");
  } catch (error) {
    console.log("Error in deleting the comment", error);
  }
}

async function handleLike(req, res) {
  try {
    const username = req.user.name;
    const id = req.body.id;
    await Blog.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: { likes: { user: username } },
      }
    );
    return res.status(200).send("Successfully hit the route");
  } catch (error) {
    console.log("Error in likeroute", error);
  }
}

module.exports = {
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
};
