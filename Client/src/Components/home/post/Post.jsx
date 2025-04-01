import { useEffect, useState } from "react"
import { API } from "../../../service/api";


const Posts = ()=>{
    const [posts, setPost] = useState([]);
    useEffect(()=>{
const fetchData = async()=>{
const response =  await API.getAllPosts();
console.log(response)
if(response){
    setPost(response.data);
}

}
fetchData();
    },[])

    return(
        <>
        {
            posts && posts.length > 0 ? posts.map(post => (
 <div>Hello</div>
            )) : <div> No data to display</div>
        }
        </>
    )
}

export default Posts