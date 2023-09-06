import {doc,getDoc} from "firebase/firestore";
import "./readmore.css"
import {db} from "../firebase";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Feature from "../components/feature";
export default function Read({isAuth}){
    const {id}=useParams();
    const[data,setData]=useState({});
    useEffect(()=>{
        async function getData(){
            try
            {
                const userDataRef= doc(db,"1029",id);
                const userDataSnap=await getDoc(userDataRef); 
                if(userDataSnap.exists()){
                    setData(userDataSnap.data());
                }                
                else{
                    console.log("blog not found")
                }
            }
        catch(e){
            console.error(e);
            console.log("error found")
        }
    }
     getData();
   },[])
    return(
        <>
    <div className="read-more-page">
         <div className="read-more-section">
           <h1 className="read-more-title">{data.title}</h1>
           <img className="read-more-image" src={data.image}/>
           <p className="read-more-content">{data.content}</p>
           <div className="read-more-userDetails">
               <h4  className="read-more-user">
                  {data.userImage && <img className="read-more-userImage" src={data.userImage}/>} 
                  {data.userName}</h4>
           </div>
         </div>
    </div>
         <Feature isAuth={isAuth} id={id} data={data}/>
         </>
    )
}