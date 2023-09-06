import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import CreatePost from './pages/createPost';
// import { BrowserRouter,Router, Routes, Switch, Link } from 'react-router-dom';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Read from './pages/readmore';
function App() {
  const[isAuth,setisAuth]=useState(false);
  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth}/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/create"  element={<CreatePost/>} />
        <Route exact path="/login" element={<Login isAuth={isAuth} setisAuth={setisAuth}/>} />
        <Route exact path="/read/:id" element={<Read isAuth={isAuth}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
