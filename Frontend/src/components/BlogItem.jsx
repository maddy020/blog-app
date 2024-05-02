import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const BlogItem = ({ item }) => {
  const route = window.location.pathname;
  return (
    <>
      <hr />
      <div className="item">
        <img
          src="https://res.cloudinary.com/dfkws35ot/image/upload/v1705928836/bsfoz90cur84h74a2akn.png"
          alt="img"
          width={200}
          height={200}
          className="homeImage"
        />
        <div style={{ width: "80%" }}>
          <h2>{item.title}</h2>
          <p className="subtitle">{item.subtitle}</p>
          <div className="readbtn">
            <Link className="btn" to={`/read/${item.id}`}>
              Read more
            </Link>
            {route == "/myblogs" && (
              <>
                <Link className="btn" to={`/edit/${item.id}`}>
                  Edit
                </Link>
                <Link className="btn" to={`/myblogs/delete/${item.id}`}>
                  Delete
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

BlogItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    // Add any other properties you have in the 'item' object
  }).isRequired,
};

export default BlogItem;
