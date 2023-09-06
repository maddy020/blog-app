import { Link } from "react-router-dom"
import "./BlogItem.css"
export default function BlogItem({blog}){
   return (
    <>
     <div className="blog-div">
      {blog.image && <img className="blog-image" src={blog.image} />}
      <h1>{blog.title}</h1>
      <p className="blog-content">{blog.content}</p>
     <Link to={`/read/${blog.id}`} className="read-more"><span >....Read More</span></Link> 
      <div className="userDetails">
      <h4  className="user">
      {blog.userImage && <img className="user-image" src={blog.userImage}/>} 
      {blog.userName}</h4>
     </div>
    </div>
         </>
   )
}