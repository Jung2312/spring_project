import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../css/myPage.css'
import nongdamgom from "../img/nongdamgom.png";
import myPost from "../img/myPost.png";
import myLike from "../img/myLike.png";
import myCounpons from "../img/myCounpons.png";
import Header from "../header";
import {useNavigate} from "react-router-dom";
import ex from "../img/exProfile.png";

function MyPage() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [contestImages, setContestImages] = useState([]); // 콘테스트 이미지 상태 추가
    const [contestCount, setContestCount] = useState(0); // 콘테스트 글 개수 상태 추가

    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        if (userid) {
            setIsLogin(true);
            fetchUserInfo(userid);  // userid를 서버로 전송하여 사용자 정보 가져오기
            fetchContestImages(userid); // 콘테스트 이미지 가져오기
            fetchContestCount(userid); // 콘테스트 글 개수 가져오기
        }
    }, []);

    // 서버에서 사용자 정보를 가져오는 함수
    const fetchUserInfo = async (userid) => {
        try {
            const response = await fetch(`http://localhost:80/user/info?userid=${userid}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // 서버에서 콘테스트 이미지를 가져오는 함수
    const fetchContestImages = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/contest/join/images', {
                params: {userid}
            });
            setContestImages(response.data); // 이미지 데이터 저장
        } catch (error) {
            console.error('Error fetching contest images:', error);
        }
    };

    // 콘테스트 글 개수를 가져오는 함수
    const fetchContestCount = async (userid) => {
        try {
            const response = await axios.get(`http://localhost:80/contest/join/count`, {
                params: {userid}
            });
            setContestCount(response.data); // 콘테스트 글 개수 설정
        } catch (error) {
            console.error('Error fetching contest count:', error);
        }
    };

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/myPageSet");
    };
    return (
        <div className="myPage_mypage">
            <Header/>
            <div className="myPage_profile_section">
                <div className="myPage_profile_info">
                    <div className="myPage_profile_img_section">
                        <img className="myPage-profile-img"
                             src={userInfo && userInfo.profileimage ? `/profileImg/${userInfo.profileimage}` : nongdamgom}
                             alt="프로필 사진"/>
                    </div>
                    <div className="myPage_profile_content_section">
                        <div className="myPage_profile_content_name">
                            <span>{userInfo ? `${userInfo.name}님` : "로딩중..."}</span>
                        </div>
                        <div className="myPage_profile_content_follower_following">
                            <span>팔로워</span><span className="myPage_profile_follower_number">0</span>
                            <span style={{margin: '0 10px'}}> | </span>
                            <span>팔로잉</span><span className="myPage_profile_following_number">0</span>
                        </div>
                        <div className="myPage_profile_content_setting">
                            <button onClick={handleButtonClick}>설정</button>
                        </div>
                    </div>
                </div>
                <div className="myPage_profile_introduce_section">
                    <span className="myPage_profile_introduce">{userInfo ? `${userInfo.introduce}` : "로딩중..."}</span>
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
                    {/* 게시글 사진 */}
                    <img className="myPage_community_img" src="" alt="게시글 사진"
                         onError={(e) => {
                             e.target.src = ex;
                         }}/>
                </div>
            </div>
            <div className="myPage_contest_section">
                <div className="myPage_contest_title">
                    <span>콘테스트</span><span className="myPage_contest_title_number">{contestCount}</span>
                </div>
                <div className="myPage_contest_content">
                    {/* 콘테스트 사진 */}
                    {contestImages.map((image, index) => (
                        <img key={index} className="myPage_contest_img" src={`/postImg/${image}`} alt="콘테스트 참여 사진"
                             onError={(e) => {
                                 e.target.src = ex;
                             }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyPage;