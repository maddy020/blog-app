import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
          withCredentials: true,
        });
        localStorage.removeItem("token");
        navigate("/");
      } catch (error) {
        console.error("Error in logout", error);
      }
    };
    logout();
  }, [navigate]);
  return null;
}

export default Logout;
