import { MoreVert } from '@mui/icons-material'
import './post.css'
// import { Users } from "../../dummyData"
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser(); 
  }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/posts/"+post._id+"/like", {userId: currentUser._id});
        } catch(err) {}
        setLike(isLiked? like-1 : like+1)
        setIsLiked(!isLiked);
    }

    return (
        <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                        <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.jpeg"} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">
                        {user.username}
                    </span>
                    <span className="postDate">
                        {format(post.createdAt)}
                    </span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">
                    {post?.desc}
                </span>
                <img src={PF+post.img} alt="" className='postImg' />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}like.png`}alt="" className='likeIcon' onClick={likeHandler}/>
                    <img src={`${PF}heart.png`} alt="" className='likeIcon' onClick={likeHandler} />
                    <span className="postLikeCounter">
                        {like} people liked it
                    </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">
                        {post.comment} comments
                    </span>
                </div>
            </div>
        </div>
        </div>
    )
}
