import React from './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'

export default function Rightbar({profile}) {

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
          <span className="rightbarInfoValue">Agbara</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">Anambra</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">Very much single lol</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">
            Ogochukwu Madu
          </span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">
            Ogochukwu Madu
          </span>
        </div>
      </div>
    </>
    )
  }

  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
          { profile? <ProfileRightBar /> : <HomeRightBar />}
        </div>
    </div>
  )
}
