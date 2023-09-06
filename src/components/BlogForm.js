import { useState } from "react";
import "./BlogForm.css"
import { collection,addDoc } from "firebase/firestore";
import { db,auth,storage} from "../firebase";
import {v4} from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
export default function BlogForm(){
  const navigate=useNavigate();
  const blogInfo=collection(db,'1029');
  const[blogdata,setblogdata]=useState({
    title:"",
    content:"",
    image:null,
    likes:0
  });
   const handletitlechange=(e)=>{
    setblogdata({...blogdata,title:e.target.value});
   };
   const handlecontentchange=(e)=>{
    setblogdata({...blogdata,content:e.target.value});
   };
   const handleimagechange=(e)=>{
    const file=e.target.files[0];
      setblogdata({...blogdata,image:file});
    };
   const handlesubmitchange=async(e)=>{
    {e.preventDefault ? e.preventDefault() : e.returnValue = false};

    const newBlog={
      title:blogdata.title,
      content:blogdata.content,
      userId: auth?.currentUser?.uid,
      userName: auth?.currentUser?.displayName,
      userImage: auth?.currentUser?.photoURL,
      likes:0
    }
    if(!blogdata.image){
      return;
    }
    const imageFolderRef=ref(storage,`BlogImages/${blogdata.image.name+v4()}`);
    
    try{
       await uploadBytes(imageFolderRef,blogdata.image);
       const url=await getDownloadURL(imageFolderRef);
       newBlog.image=url;
       await addDoc(blogInfo, newBlog); 
    }
    catch(e){
      console.error(e);
      console.log("error");
    }
    setblogdata({
    ...blogdata,
    title:"",
    content:"",
    image:null,
    });
    navigate("/")
   };
   
    return(
      
        <form className="form-section" onSubmit={handlesubmitchange} >
          <textarea 
          maxLength="150"
          className="input-box title" 
          placeholder="Title"
          value={blogdata.title}
          onChange={handletitlechange}
          required/>
          <textarea 
          className="input-box content"
          placeholder="Content"
          value={blogdata.content}
          onChange={handlecontentchange}
          required/>
          <input 
          className="file-element" 
          type="file"
          onChange={handleimagechange}
          required/>
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
    )
}