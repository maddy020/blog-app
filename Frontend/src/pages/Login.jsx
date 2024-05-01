import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import "../App.css";
import CardWrapper from "../components/CardWrapper";
import InputBox from "../components/InputBox";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await axios.post("http://localhost:8001/login", user, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/");
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  return (
    <form method="post" onSubmit={(e) => handleLogin(e)} className="form">
      <CardWrapper value="Sign in">
        <InputBox
          placeholder="Enter your email"
          name="email"
          cref={emailRef}
          label="Email"
        />
        <InputBox
          name="password"
          cref={passwordRef}
          label="Password"
          type="password"
        />
        <button className="btn">Login</button>
        <p className="bottom-warning">
          Already have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </CardWrapper>
    </form>
  );
};

export default Login;
