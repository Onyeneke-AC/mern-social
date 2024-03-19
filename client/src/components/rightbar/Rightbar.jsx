import React from './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Rightbar({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);

    useEffect( () => {
      const getFriends = async () => {
        try {
          
          const friendList = await axios.get("/users/friends/"+ user._id);
          setFriends(friendList.data);

        } catch(err){
          console.log (err);
        }
      }
      getFriends();
    }, [user._id])
    
    const HomeRightBar = () => {

    return (
      <>
        <div className="birthdayContainer">
            <img src="assets/gift.png" alt="" className="birthdayImg" />
            <span className="birthdayText">
              <b>Ogochukwu Madu</b> and  <b>3 other friends</b> have their birthdays today!
            </span>
          </div>
          <img src="assets/ad.png" alt="" className="rightbarAd" />
          <h4 className="rightbarTitle">
            Online Friends
          </h4>
          <ul className="onlineFriendList">
            {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
    <>
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" 
          : user.relationship === 2 ? "Married"
          : "Complicated" }</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {
          friends.map((friend) => (

            <div className="rightbarFollowing">
              <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.jpeg"} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">
                Ogochukwu Madu
              </span>
            </div>

          ))
        }
      </div>
    </>
    )
  }

  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
          { user ? <ProfileRightBar /> : <HomeRightBar />}
        </div>
    </div>
  )
}
