const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  likes: [
    {
      user: {
        type: String,
        required: true,
      },
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
