import Post from "./Post";

const posts = [{
    id: 1,
    post_desc: "teste",
    img: "https://i.ytimg.com/vi/T_oi-UX-7lA/maxresdefault.jpg",
    username:"usuario",
    userImg: "",
}]

function Feed() {
    return ( 
        <div className="flex flex-col items-center gap-5">
            {posts.map((post, id)=>{
                return(
                    <Post post={post} key={id}/>
                )
            })}
        </div>
     );
}

export default Feed;