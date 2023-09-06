import "./createPost.css";
import post from "../assets/post.svg";
import BlogForm from "../components/BlogForm";
export default function CreatePost() {
  return (
      <div className="blog-section">
        <h1 className="title">
          <img src={post} width={45} alt="Post" />Create Post
        </h1>
        <BlogForm />
      </div>
  );
}







