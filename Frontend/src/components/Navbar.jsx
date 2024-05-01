import { Link } from "react-router-dom";
import "./modules.css";
const Navbar = () => {
  const currUser = localStorage.getItem("token");
  return (
    <nav className="nav-list">
      <Link to="/" className="btn">
        Blog
      </Link>
      {currUser ? (
        <Link to="/" className="btn">
          Hi, {currUser}
        </Link>
      ) : (
        <Link to="/login" className="btn">
          Login/Signup
        </Link>
      )}
      {currUser ? (
        <Link to="/logout" className="btn">
          Logout
        </Link>
      ) : null}
      {currUser ? (
        <Link to="/myblogs" className="btn">
          My Blogs
        </Link>
      ) : null}
    </nav>
  );
};

export default Navbar;
