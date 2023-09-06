import "./feature.css"
import shareIcon from "../assets/share.svg";
import likeIcon from "../assets/like.svg";
import bookmarkIcon from "../assets/bookmark.svg";
import filledLikeIcon from "../assets/filledLike.svg";
import filledBookmarkIcon from "../assets/filledBookmark.svg";
import { useState,useEffect } from "react";
import {  auth,db } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function Feature({isAuth,id,data}){
    
    const[isLiked,setIsLike]=useState(false);
    
 
      const handleLikeChange = async () => {
        if (!isAuth) {
          alert("Please log in your account first");
          return;
        }
      
        // Get a reference to the specific blog post document
        const blogRef = doc(db, "1029", id);
      
        // Check if the user has already liked the post
        if (isLiked) {
          // Decrease the likes count
          await updateDoc(blogRef, {
            likes: data.likes - 1, // Assuming "likes" is a numeric field
            
          });
        } else {
          // Increase the likes count
          await updateDoc(blogRef, {
            likes: data.likes + 1, // Assuming "likes" is a numeric field
          });
        }
        console.log(`${data.likes}`);
        // Toggle the isLiked state
        setIsLike(!isLiked);
      };
        
    
    
    const[isBookmarked,setIsBookmark]=useState(false);
    
    const handleBookmarkChange=()=>{
        if(!isAuth)alert("Please log in your account first");
        else setIsBookmark(!isBookmarked);
    }
    
    const src1=isLiked?filledLikeIcon:likeIcon;
    const src2=isBookmarked?filledBookmarkIcon:bookmarkIcon;


    const[showComponent,setshowComponent]=useState(false);
    
    
    useEffect(()=>{
        const handleScroll=()=>{
            const scrollTop=window.pageYOffset;
            if(scrollTop>0){
                setshowComponent(true);
            }
            else{
                setshowComponent(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call it once to check the initial scroll position
    },[])
    
    return (
    <div className="feature-section">
       {showComponent &&  <div className="features">
           
            <img 
            src={src1} 
            className="Icon likes"
            onClick={handleLikeChange}/>
            
            <img 
            src={src2}
            onClick={handleBookmarkChange}
            className="Icon bookmark"/>
            
            <img src={shareIcon}  className="Icon share"/>
        </div>}
    </div> 
    )
}