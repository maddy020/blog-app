import "./home.css";
import {db} from "../firebase"
import { useState,useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BlogList from "../components/BlogList.js";

export default function Home(){
    const[blogData,setBlogData]=useState([]);
    const blogCollection=collection(db,"1029");
    const navigate=useNavigate();
    useEffect(()=>{
        async function getBlogData(){
        try{
            const data=await getDocs(blogCollection);
            const filteredData=data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id, 
            }));
            setBlogData(filteredData);
        }
        catch(e){
          console.error(e);
        }
        
    }
    getBlogData();
},[])
console.log(blogData);
    return (
        <div className=" home-section">
        <BlogList blogs={blogData}/>
        </div>
    )
}