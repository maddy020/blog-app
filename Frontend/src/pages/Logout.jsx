import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
          withCredentials: true,
        });
        localStorage.removeItem("token");
        toast.success("Bye ,See you soon");
        navigate("/");
      } catch (error) {
        console.error("Error in logout", error);
        toast.error(error);
      }
    };
    logout();
  }, [navigate]);
  return null;
}

export default Logout;
