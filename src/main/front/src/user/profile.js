import React, {useEffect, useState} from 'react';

import '../css/community.css';
import axios from "axios";
import nongdamgom from "../img/nongdamgom.png";
import myPost from "../img/myPost.png";
import myLike from "../img/myLike.png";
import myCounpons from "../img/myCounpons.png";

function Profile() {
       return (
           <div className="profile_profile_section">
               <div className="profile_profile_box">
                   <div className="profile_profile_image">
                       <img className="followPage-profile-img" src={nongdamgom} alt="프로필 사진"/>
                   </div>
                   <div className="profile_profile_content">
                       <span className="profile_profile_content_name">회원명</span>
                       <div className="profile_profile_content_follower_following">
                           <span>팔로워</span><span className="profile_profile_follower_number">0</span>
                           <span style={{margin: '0 10px'}}> | </span>
                           <span>팔로잉</span><span className="profile_profile_following_number">0</span>
                       </div>
                       <hr style={{width: '260px', border: '1px solid #D5D5D5'}}></hr>
                       <div className="profile_profile_activity">
                           <div className="profile_profile_activity_post">
                               <img className="profile_profile_activity_img" src={myPost} alt="프로필 사진"/>
                               <span className="profile_profile_activity_text">내가 쓴 글</span>
                               <span className="profile_profile_activity_number">0</span>
                           </div>
                           <div className="profile_profile_activity_like">
                               <img className="profile_profile_activity_img" src={myLike} alt="프로필 사진"/>
                               <span className="profile_profile_activity_text">좋아요</span>
                               <span className="profile_profile_activity_number">0</span>
                           </div>
                           <div className="profile_profile_activity_coupons">
                               <img className="profile_profile_activity_img" src={myCounpons} alt="프로필 사진"/>
                               <span className="profile_profile_activity_text">내 쿠폰</span>
                               <span className="profile_profile_activity_pnumber">0</span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       );
}

export default Profile;