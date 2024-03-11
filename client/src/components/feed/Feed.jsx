import { useEffect, useState } from 'react';
import Share from '../Share/Share';
import Post from '../post/Post';
import './feed.css';
import axios from "axios";
// import {Posts} from "../../dummyData";

export default function Feed({ username }) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
          const res = username 
          ? await axios.get("/posts/profile/" + username) 
          : await axios.get("/posts/timeline/65e9716f4d5dcc0e817044c0");
          setPosts(res.data);
      } catch(err) {
          console.log("The bane of my existence: ", err);
      }
    };
    fetchPosts(); 
  }, [username])

  return (
    <div className='feed'>
        <div className="feedWrapper">
          <Share />
          {
            posts.map ((p) => 
              <Post key={p._id} post={p} />
            )
          }
        </div>
    </div>
  )
}
