import "./Navbar.css";
import  menu from "../assets/menu.svg";
import  close from "../assets/cross.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import create from "../assets/create.svg"
import home from "../assets/home.svg";
import login from "../assets/login.svg";
import icon from "../assets/appicon.svg";
export default function Navbar({isAuth}){
    const[isOpen,setisOpen]=useState(false);
    const toggleMenu=()=>{
        setisOpen(!isOpen);
    }
    const val=isAuth?("/create"):("/login");
    return (
        <nav>
        <div className="nav-bar-content">
           <h2 className="title">
           <img src={icon} width={45}/>
            Blog
           </h2>
           </div>
           {isOpen?(
            <img src={close} className="menu" onClick={toggleMenu}/>
           ):
           <img src={menu} className="menu" onClick={toggleMenu}/>
           }  
           <ul className={`list ${isOpen?"show":"hide"}`}>
             <li className="sub-list"><Link  className="list-item" to="/" onClick={toggleMenu}>
             <img
                 src={home} 
                 alt="home" 
                 width={25}
                 className="icon"/>
                 Home
                </Link></li>
             
                <li className="sub-list">
                    <Link to={val} className="list-item" onClick={toggleMenu}>
                <img
                 src={create} 
                 alt="create" 
                 width={25}
                 className="icon"/>
                Create
                </Link>
                </li>
                
             {!isAuth?(
                 <li className="sub-list"><Link to="/login" className="list-item" onClick={toggleMenu}>
                 <img
                     src={login} 
                     alt="login" 
                     width={25}
                     className="icon"/>
                    Login</Link>
                    </li>
                ):(
                    <li className="sub-list"><Link to="/login" className="list-item" onClick={toggleMenu}>
                    <img
                        src={login} 
                        alt="login" 
                        width={25}
                        className="icon"/>
                       Logout</Link>
                       </li>
                )}
             
           </ul>
           </nav>
    )
}