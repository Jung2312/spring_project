import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../css/myPage.css'
import nongdamgom from "../img/nongdamgom.png";
import myPost from "../img/myPost.png";
import myLike from "../img/myLike.png";
import myCounpons from "../img/myCounpons.png";

function MyPage() {
    return (
        <div className="myPage_mypage">
            <div className="myPage_profile_section">
                <div className="myPage_profile_info">
                    <div className="myPage_profile_img_section">
                        <img className="myPage-profile-img" src={nongdamgom} alt="프로필 사진"/>
                    </div>
                    <div className="myPage_profile_content_section">
                        <div className="myPage_profile_content_name">
                            <span>회원명</span>
                        </div>
                        <div className="myPage_profile_content_follower_following">
                            <span>팔로워</span><span className="myPage_profile_follower_number">0</span>
                            <span style={{margin: '0 10px'}}> | </span>
                            <span>팔로잉</span><span className="myPage_profile_following_number">0</span>
                        </div>
                        <div className="myPage_profile_content_setting">
                            <button>설정</button>
                        </div>
                    </div>
                </div>
                <hr style={{width: '1080px', border: '0.5px solid #D5D5D5'}}></hr>
                <div className="myPage_profile_activity">
                    <div className="myPage_profile_activity_post">
                        <img className="myPage_profile_activity_img" src={myPost} alt="프로필 사진"/>
                        <span className="myPage_profile_activity_text">내가 쓴 글</span>
                        <span className="myPage_profile_activity_number">0</span>
                    </div>
                    <div className="myPage_profile_activity_like">
                        <img className="myPage_profile_activity_img" src={myLike} alt="프로필 사진"/>
                        <span className="myPage_profile_activity_text">좋아요</span>
                        <span className="myPage_profile_activity_number">0</span>
                    </div>
                    <div className="myPage_profile_activity_coupons">
                        <img className="myPage_profile_activity_img" src={myCounpons} alt="프로필 사진"/>
                        <span className="myPage_profile_activity_text">내 쿠폰</span>
                        <span className="myPage_profile_activity_pnumber">0</span>
                    </div>
                </div>
            </div>
            <div className="myPage_community_section">
                <div className="myPage_community_title">
                    <span>커뮤니티</span><span className="myPage_community_title_number">0</span>
                </div>
                <div className="myPage_community_content">

                </div>

            </div>
            <div className="myPage_contest_section">
                <div className="myPage_contest_title">
                    <span>콘테스트</span><span className="myPage_contest_title_number">0</span>
                </div>
                <div className="myPage_contest_content">

                </div>
            </div>
        </div>
    )
}

export default MyPage;