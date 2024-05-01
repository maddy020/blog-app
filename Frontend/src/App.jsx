import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Create from "./pages/Create";
import Signup from "./pages/Signup";
import Readmore from "./pages/Readmore";
import MyBlogs from "./pages/MyBlogs";
import Delete from "./pages/Delete";
import Edit from "./pages/Edit";
import "@radix-ui/themes/styles.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/create" element={<Create />} />
      <Route path="/read/:id" element={<Readmore />} />
      <Route path="/myblogs" element={<MyBlogs />} />
      <Route path="/myblogs/delete/:id" element={<Delete />} />
    </Routes>
  );
};

export default App;
