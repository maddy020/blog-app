import BlogItem from "./BlogItem";
import PropTypes from "prop-types";
const BlogList = ({ data }) => {
  return (
    <div style={{ width: "100%" }}>
      <ul className="itemList">
        {data.map((item, index) => (
          <BlogItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

BlogList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BlogList;
