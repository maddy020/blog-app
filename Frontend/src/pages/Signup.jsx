import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import "../App.css";
import InputBox from "../components/InputBox";
import CardWrapper from "../components/CardWrapper";

const Signup = () => {
  const navigate = useNavigate();
  const nameref = useRef();
  const passwordref = useRef();
  const emailref = useRef();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name: nameref.current.value,
        email: emailref.current.value,
        password: passwordref.current.value,
      };
      if (!user.name || !user.email || !user.password) {
        alert("Please fill all the fields");
        return;
      }
      await axios
        .post("http://localhost:8001/signup", user, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data === "User Already Exists") {
            alert("User Already Exists");
            return;
          }
        });

      navigate("/login");
    } catch (error) {
      console.log("Error found", error);
    }
  };
  return (
    <form method="post" onSubmit={(e) => handleSignup(e)} className="form">
      <CardWrapper value="Sign Up">
        <InputBox
          placeholder="Enter your name"
          name="name"
          cref={nameref}
          label="Name"
          type="text"
        />
        <InputBox
          placeholder="Enter your email"
          name="email"
          cref={emailref}
          label="Email"
        />
        <InputBox
          name="password"
          cref={passwordref}
          label="Password"
          type="password"
        />
        <button type="submit">Signup</button>
        <p className="bottom-warning">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </CardWrapper>
    </form>
  );
};

export default Signup;
