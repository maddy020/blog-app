import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
import AppBar from "../components/AppBar";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import AllBlogs from "../components/AllBlogs";
import "../App.css";

const Home = () => {
  const currUser = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}`);
        setAllData(res.data.blogs);
        setData(res.data.blogs);
      } catch (error) {
        console.error("Error in setting the state", error);
      }
    }
    getBlogs();
  }, []);

  return (
    <>
      <div>
        <AppBar />

        <div className="main">
          <SearchBar data={data} setData={setData} allData={allData} />

          {data.length === 0 ? (
            <h1>No blogs found</h1>
          ) : (
            <div className="container">
              <AllBlogs data={data} itemsPerPage={2} />
            </div>
          )}
        </div>
      </div>
      {currUser ? (
        <Link to="/create" className="create">
          +
        </Link>
      ) : null}
    </>
  );
};

export default Home;
