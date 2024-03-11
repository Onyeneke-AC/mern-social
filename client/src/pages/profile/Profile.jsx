import axios from 'axios'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'
import { useEffect, useState } from "react";

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=john`);
      setUser(res.data);
    }
    fetchUser();
  }, [])
  
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src={`${PF}post/3.jpeg`} alt="" className="profileCoverImg" />
                    <img src={`${PF}person/7.jpeg`} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">
                        {user.desc}
                    </span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username="john"/>
                <Rightbar profile/>
            </div>
        </div>
      </div>
    </>
  )
}
