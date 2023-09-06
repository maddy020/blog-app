import { signInWithPopup, signOut } from "firebase/auth"
import {auth,googleProvider} from "../firebase.js"
import google from "../assets/google.svg"
import "./login.css"
import { useNavigate } from "react-router-dom";

export default function Login({isAuth, setisAuth}){
    
const navigate = useNavigate();
   async function signInWithGoogle(){
    try{
        const userAuth = await signInWithPopup(auth, googleProvider);
        if (userAuth) {
          setisAuth(true);
          navigate("/create");
        }
    }
    catch(e){
        console.error(e);
    }
   }
   async function logout(){
    try{
        await signOut(auth);
        setisAuth(false);
    }
    catch(e){
        console.error(e);
    }
   }
    return (
        <div className="login-section">
        {isAuth ? <h1>Click 👇🏻 to Logout</h1> : <h1>Click 👇🏻 to Login</h1>}
           {!isAuth?(
              <button className="signin" onClick={signInWithGoogle}>
              <img src={google} width={45}/>
              Sign Up with Google
              </button>):
              <button className="signin" onClick={logout}>
              Logout
        </button>}
        </div>
    )
}