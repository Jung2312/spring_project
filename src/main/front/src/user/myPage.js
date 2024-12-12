import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../css/myPage.css'
import nongdamgom from "../img/nongdamgom.png";
import myPost from "../img/myPost.png";
import myLike from "../img/myLike.png";
import myCounpons from "../img/myCounpons.png";
import Header from "../header";
import MyPageHeader from "../mypageHeader";
import {useNavigate} from "react-router-dom";
import ex from "../img/exProfile.png";
import Modal from 'react-modal';

function MyPage() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [contestImages, setContestImages] = useState([]); // 콘테스트 이미지 상태 추가
    const [postImages, setPostImages] = useState([]); // 커뮤니티 이미지 상태 추가
    const [contestCount, setContestCount] = useState(0); // 콘테스트 글 개수 상태 추가
    const [likeCount, setLikeCount] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0); // 합산된 값을 저장할 상태 변수
    const [couponCount, setCouponCount] = useState(0); // 쿠폰 개수 상태 추가
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

// 팔로잉 개수 가져오기 함수 수정
    const fetchFollowingCount = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/follow/following/count', { params: { userid } });
            setFollowingCount(response.data); // 상태 업데이트
        } catch (error) {
            console.error('Error fetching following count:', error);
        }
    };

// 팔로워 개수 가져오기 함수 수정
    const fetchFollowerCount = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/follow/followers/count', { params: { userid } });
            setFollowerCount(response.data); // 상태 업데이트
        } catch (error) {
            console.error('Error fetching follower count:', error);
        }
    };

    const fetchFollowingList = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/follow/following/list', { params: { userid } });
            return response.data;
        } catch (error) {
            console.error('Error fetching following list:', error);
            return [];
        }
    };

    const fetchFollowerList = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/follow/followers/list', { params: { userid } });
            return response.data;
        } catch (error) {
            console.error('Error fetching follower list:', error);
            return [];
        }
    };

    // 핸들러 추가
    const handleFollowingClick = async () => {
        const userid = sessionStorage.getItem("userid");
        const followingList = await fetchFollowingList(userid);
        setModalContent(followingList);
        setModalIsOpen(true);
    };

    const handleFollowerClick = async () => {
        const userid = sessionStorage.getItem("userid");
        const followerList = await fetchFollowerList(userid);
        setModalContent(followerList);
        setModalIsOpen(true);
    };

    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        if (userid) {
            setIsLogin(true);
            fetchUserInfo(userid);
            fetchContestImages(userid);
            fetchContestCount(userid);
            fetchPostImages(userid);
            fetchLikeCount(userid);
            fetchPostCount(userid);
            fetchCouponCount(userid); // 쿠폰 개수 가져오기
            fetchFollowingCount(userid); // 팔로잉 개수 가져오기
            fetchFollowerCount(userid);  // 팔로워 개수 가져오기
        }
    }, [contestCount]);

// 유효한 쿠폰 개수를 서버에서 가져오는 함수
    const fetchCouponCount = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/coupon/valid/count', {
                params: { userid },
            });
            setCouponCount(response.data); // 쿠폰 개수 설정
        } catch (error) {
            console.error('Error fetching coupon count:', error);
        }
    };

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

    // 서버에서 포스트 이미지를 가져오는 함수
    const fetchPostImages = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/recommend/post/images', {
                params: {userid}
            });
            setPostImages(response.data); // 이미지 데이터 저장
        } catch (error) {
            console.error('Error fetching contest images:', error);
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

    const fetchLikeCount = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/liked/count', {
                params: { userid }
            });
            setLikeCount(response.data);
        } catch (error) {
            console.error('Error fetching like count:', error);
        }
    };

    const fetchPostCount = async (userid) => {
        try {
            const response = await axios.get('http://localhost:80/recommend/count', {
                params: { userid }
            });
            setPostCount(response.data);
            setTotalCount(response.data + contestCount); // 합산하여 totalCount에 저장
        } catch (error) {
            console.error('Error fetching post count:', error);
        }
    };

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/myPage/setting");
    };

    return (
        <div>
            <Header/>
            <div className="myPage_mypage">
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
                                <span onClick={handleFollowerClick} style={{cursor: "pointer"}}>팔로워</span><span className="myPage_profile_follower_number">{followerCount}</span>
                                <span style={{margin: '0 10px'}}> | </span>
                                <span onClick={handleFollowingClick} style={{cursor: "pointer"}}>팔로잉</span><span className="myPage_profile_following_number">{followingCount}</span>
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
                            <img className="myPage_profile_activity_img" src={myPost}/>
                            <span className="myPage_profile_activity_text">내가 쓴 글</span>
                            <span className="myPage_profile_activity_number">{totalCount}</span>
                        </div>
                        <div className="myPage_profile_activity_like">
                            <img className="myPage_profile_activity_img" src={myLike}/>
                            <span className="myPage_profile_activity_text">좋아요</span>
                            <span className="myPage_profile_activity_number">{likeCount}</span>
                        </div>
                        <div className="myPage_profile_activity_coupons">
                            <img className="myPage_profile_activity_img" src={myCounpons}/>
                            <span className="myPage_profile_activity_text">내 쿠폰</span>
                            <span className="myPage_profile_activity_pnumber">{couponCount}</span>
                        </div>
                    </div>
                </div>
                <div className="myPage_community_section">
                    <div className="myPage_community_title">
                        <span>커뮤니티</span><span className="myPage_community_title_number">{postCount}</span>
                    </div>
                    <div className="myPage_community_content">
                        {/* 게시글 사진 */}
                        {postImages.map((image, index) => (
                            <img onClick={() => navigate(`/community/recommendDetail/${image.postnum}`)} key={index} className="myPage_community_img" src={`/postImg/${image.postimg}`} alt="게시글 사진"
                                 onError={(e) => {
                                     e.target.src = ex;
                                 }}/>
                        ))}
                    </div>
                </div>
                <div className="myPage_contest_section">
                    <div className="myPage_contest_title">
                        <span>콘테스트</span><span className="myPage_contest_title_number">{contestCount}</span>
                    </div>
                    <div className="myPage_contest_content">
                        {/* 콘테스트 사진 */}
                        {contestImages.map((image, index) => (
                            <img onClick={() => navigate(`/contest/postDetail/${image.joinnum}`)} key={index} className="myPage_contest_img" src={`/postImg/${image.joinimg}`} alt="콘테스트 참여 사진"
                                 onError={(e) => {
                                     e.target.src = ex;
                                 }}
                            />
                        ))}
                    </div>
                </div>
                <MyModal
                    isOpen={modalIsOpen}
                    closeModal={() => setModalIsOpen(false)}
                    content={modalContent}
                    userId={sessionStorage.getItem("userid")} // 여기서 userId 전달
                />
            </div>
        </div>
    )
}

function MyModal({ isOpen, closeModal, content }) {
    const [userInfoList, setUserInfoList] = useState([]); // 팔로잉/팔로워 사용자 정보 리스트
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfos = async () => {
            try {
                setLoading(true);
                const userInfos = await Promise.all(
                    content.map(async (userId) => {
                        const response = await fetch(`http://localhost:80/user/info?userid=${userId}`);
                        if (!response.ok) {
                            throw new Error("서버 오류: 데이터를 가져올 수 없습니다.");
                        }
                        const data = await response.json();
                        return data;
                    })
                );
                setUserInfoList(userInfos); // 팔로잉/팔로워 정보 설정
            } catch (error) {
                console.error("팔로우 사용자 정보 가져오기 오류:", error);
            } finally {
                setLoading(false);
            }
        };

        if (content.length > 0) {
            fetchUserInfos();
        }
    }, [content]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            overlayClassName="modal-overlay"
            className="modal-content"
            ariaHideApp={false}
        >
            <div className="modal-header">
                <h2>팔로우 리스트</h2>
                <button className="modal-close" onClick={closeModal}>
                    &times;
                </button>
            </div>

            {loading ? (
                <div>로딩 중...</div>
            ) : (
                <ul className="modal-list">
                    {userInfoList.length > 0 ? (
                        userInfoList.map((user, index) => (
                            <li
                                key={index}
                                className="modal-list-item"
                                onClick={() => {
                                    navigate("/followPage", { state: { userId: user.userid } });
                                }}
                            >
                                <span>{user.name}</span> {/* 이름 출력 */}
                            </li>
                        ))
                    ) : (
                        <div>유저 정보가 없습니다.</div>
                    )}
                </ul>
            )}
        </Modal>
    );
}


export default MyPage;