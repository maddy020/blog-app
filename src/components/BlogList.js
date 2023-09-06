import BlogItem from "./BlogItem";
export default function BlogList({blogs}){
    return (
        <>
           {blogs.map((blog)=>{
            return  <BlogItem key={blog.id} blog={blog}/>
           })}
        </>
    )
}