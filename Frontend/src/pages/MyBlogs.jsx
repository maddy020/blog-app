import { useState, useEffect } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import BlogList from "../components/BlogList";
const MyBlogs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/myblogs`,
          {
            withCredentials: true,
          }
        );
        setData(res.data.blogs);
      } catch (error) {
        console.error("Error in setting the state", error);
      }
    }
    getBlogs();
  }, []);

  return (
    <div>
      <AppBar />
      {data.length === 0 ? <h1>No blogs found</h1> : <BlogList data={data} />}
    </div>
  );
};

export default MyBlogs;
