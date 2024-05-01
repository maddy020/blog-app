/* eslint-disable react/prop-types */
import { useRef } from "react";

const SearchBar = ({ allData, setData }) => {
  const inputRef = useRef(null);

  const handleChange = async () => {
    try {
      const value = inputRef.current.value;
      if (value.length === 0) {
        setData(allData);
      } else {
        const blogItem1 = allData.filter((blog) =>
          blog.title.toLowerCase().includes(value.toLowerCase())
        );
        const blogItem2 = allData.filter((blog) =>
          blog.subtitle.toLowerCase().includes(value.toLowerCase())
        );
        setData(blogItem1 || blogItem2);
      }
    } catch (error) {
      console.error("Error in setting the state", error);
    }
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search articles"
        onChange={handleChange}
        ref={inputRef}
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
