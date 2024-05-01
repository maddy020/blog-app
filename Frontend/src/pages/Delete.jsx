import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Delete = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/")[3];

  useEffect(() => {
    async function deleteBlog() {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/myblogs/delete/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log("Blog deleted successfully");
        navigate("/myblogs");
      } catch (error) {
        console.error("Error in deleting the blog", error.response); // Log the error response for debugging
        // You can handle the error based on the response status or other conditions
        if (error.response && error.response.status === 404) {
          // Handle not found error
          console.error("Blog not found");
        } else {
          // Handle other errors
          console.error("Failed to delete the blog");
        }
      }
    }

    deleteBlog();
  }, [id, navigate]);

  return null;
};

export default Delete;
