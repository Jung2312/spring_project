import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../css/followPage.css'
import nongdamgom from "../img/nongdamgom.png";
import myPost from "../img/myPost.png";
import myLike from "../img/myLike.png";
import furniture2 from "../img/furniture2.png";
import like from "../img/like.png";
import comment from "../img/comment.png";
import Header from "../header";
import ex from "../img/exProfile.png";
import redlike from "../img/redLike.png";
import { useLocation, useNavigate } from "react-router-dom";

function FollowPage() {
    const [postList, setPostList] = useState([]); // 게시글 데이터
    const [likedPosts, setLikedPosts] = useState([]); // 좋아요를 누른 게시글 리스트 (postnum)
    const [replies, setReplies] = useState({});
    const [userName, setUserName] = useState("");  // 사용자 이름
    const [userIntro, setUserIntro] = useState("");  // 사용자 소개글
    const [profileImage, setProfileImage] = useState(""); // 프로필 이미지 상태 추가
    const [followerCount, setFollowerCount] = useState(0);  // 팔로워 수
    const [followingCount, setFollowingCount] = useState(0);  // 팔로잉 수
    const userid = sessionStorage.getItem("userid");
    const [isFollowing, setIsFollowing] = useState(false); // 팔로우 상태 관리
    const navigate = useNavigate();

    const location = useLocation();  // useLocation 훅을 사용하여 state에서 userId를 받음
    const userIdFromState = location.state?.userId;  // 전달된 userId
    const userId = userIdFromState || sessionStorage.getItem("userid");  // state에서 받아오지 못하면 sessionStorage에서 가져옴

    // 팔로우 상태 확인
    const checkFollowStatus = async () => {
        try {
            const response = await axios.get('http://localhost:80/follow/status', {
                params: { userid, target: userId },
            });
            setIsFollowing(response.data.following); // 응답 키 "following" 사용
        } catch (error) {
            console.error('팔로우 상태 확인 중 오류:', error);
        }
    };

    useEffect(() => {
        if (userid && userId) {
            checkFollowStatus();
        }
    }, [userid, userId]);

// 팔로우 버튼 클릭 핸들러
    const handleFollowToggle = async () => {
        if (!userid) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:80/follow/toggle', {
                userid,
                following: userId,
            });
            const { following: isFollowing, message } = response.data;

            // 알림 메시지 표시
            alert(message);

            // 페이지 새로고침
            window.location.reload();
        } catch (error) {
            console.error('팔로우 상태 변경 중 오류:', error);
        }
    };

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:80/user/info?userid=${userId}`);
                setUserName(response.data.name);  // 사용자 이름
                setUserIntro(response.data.introduce);  // 사용자 소개글
                setProfileImage(response.data.profileimage); // 프로필 이미지 상태 업데이트
            } catch (error) {
                console.error("사용자 정보를 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        if (userId) fetchUserInfo();
    }, [userId]);


    useEffect(() => {
        const fetchFollowerAndFollowingCounts = async () => {
            try {
                const followerResponse = await axios.get(`http://localhost:80/follow/followers/count?userid=${userId}`);
                setFollowerCount(followerResponse.data);  // 팔로워 수 업데이트

                const followingResponse = await axios.get(`http://localhost:80/follow/following/count?userid=${userId}`);
                setFollowingCount(followingResponse.data);  // 팔로잉 수 업데이트
            } catch (error) {
                console.error("팔로워와 팔로잉 수를 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        if (userId) fetchFollowerAndFollowingCounts();
    }, [userId]);

    // 서버에서 게시글 데이터 가져옴
    useEffect(() => {
        axios
            .get('http://localhost:80/recommend') // Spring Boot API URL
            .then((response) => {
                const filteredPosts = response.data.filter(post => post.userid === userId); // userId와 일치하는 게시글만 필터링
                setPostList(filteredPosts);
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
            });
    }, [userId]);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const response = await axios.get('http://localhost:80/liked/user', {
                    params: { userid },
                });
                setLikedPosts(response.data); // 사용자가 좋아요한 게시글 ID 목록
            } catch (error) {
                console.error("좋아요 데이터 가져오기 실패:", error);
            }
        };

        if (userid) fetchLikedPosts();
    }, [userid]);

    const handleLikeToggle = async (postnum) => {
        if (!userid) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:80/recommend/like`,
                null, // Request body 필요 없음
                {
                    params: { postnum },
                    headers: { userid },
                }
            );

            if (response.status === 200) {
                const isLiked = !likedPosts.includes(postnum);
                setLikedPosts((prevLikedPosts) =>
                    isLiked
                        ? [...prevLikedPosts, postnum]
                        : prevLikedPosts.filter((id) => id !== postnum)
                );

                // postList에서 해당 게시글의 좋아요 수 업데이트
                setPostList((prevPostList) =>
                    prevPostList.map((post) =>
                        post.postnum === postnum
                            ? { ...post, postlike: post.postlike + (isLiked ? 1 : -1) }
                            : post
                    )
                );
            }
        } catch (error) {
            console.error("좋아요 처리 중 오류:", error);
        }
    };

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const response = await axios.get('http://localhost:80/reply/all');
                const replyGroups = response.data.reduce((acc, reply) => {
                    if (!acc[reply.postnum]) {
                        acc[reply.postnum] = [];
                    }
                    acc[reply.postnum].push(reply);
                    return acc;
                }, {});
                setReplies(replyGroups);
            } catch (error) {
                console.error("댓글 데이터 가져오기 실패:", error);
            }
        };

        fetchReplies();
    }, [postList]);

    // 게시글 클릭 이벤트
    const handlePostClick = (postnum) => {
        navigate(`/community/recommendDetail/${postnum}`); // 상세 게시글 화면으로 이동
    };

    return (
        <div className="followPage">
            <Header/>
            <div className="followPage_followpage">
                <div className="followPage_profile_section">
                    <div className="followPage_profile_box">
                        <div className="followPage_profile_image">
                            <img className="followPage-profile-img"
                                 src={`${process.env.PUBLIC_URL}/profileImg/${profileImage}`} alt="프로필 사진"
                                 onError={(e) => {
                                     e.target.src = ex;
                                 }}/>
                        </div>
                        <div className="followPage_profile_content">
                            <span className="followPage_profile_content_name">{userName}</span>
                            <div className="followPage_profile_content_follower_following">
                                <span>팔로워</span><span
                                className="followPage_profile_follower_number">{followerCount}</span>
                                <span style={{margin: '0 10px'}}> | </span>
                                <span>팔로잉</span><span
                                className="followPage_profile_following_number">{followingCount}</span>
                            </div>
                            <button
                                className={`followPage_profile_content_follow_button ${
                                    isFollowing ? 'following' : 'not-following'
                                }`}
                                onClick={handleFollowToggle}
                            >
                                {isFollowing ? '팔로잉' : '팔로우'}
                            </button>
                            <span className="followPage_profile_content_intro">{userIntro}</span>
                        </div>
                    </div>
                </div>
                <div className="recommend-container" style={{marginTop: 0}}>
                    {postList.map((post) => (
                        <div className="recommend-section" key={post.postnum}
                             onClick={() => handlePostClick(post.postnum)}>
                            {/* 프로필 섹션 */}
                            <div className="profile-section">
                                <div className="profile-img">
                                    <img className="profile-img"
                                         src={`${process.env.PUBLIC_URL}/profileImg/${post.profileimage}`} alt="프로필 사진"
                                         onError={(e) => {
                                             e.target.src = ex;
                                         }}/>
                                </div>
                                <div className="profile-content">
                                    <div className="profile-name">
                                        <span className="nick-name">{post.userid}</span> {/* 닉네임 */}
                                    </div>
                                    <div>
                                        <span className="profile-text">{post.introduce}</span> {/* 자기소개 */}
                                    </div>
                                </div>
                            </div>
                            {/* 게시글 사진 */}
                            <img className="post-img" src={`${process.env.PUBLIC_URL}/postImg/${post.postimg}`}
                                 alt="게시글 사진"
                                 onError={(e) => {
                                     e.target.src = ex;
                                 }}/>
                            {/* 좋아요와 댓글 */}
                            <div className="like-comment">
                                <div className="like">
                                    <img
                                        className="like-img"
                                        src={likedPosts.includes(post.postnum) ? redlike : like}
                                        alt="좋아요"
                                        onClick={() => handleLikeToggle(post.postnum)}
                                    />
                                    <span>{post.postlike}</span>
                                </div>
                                <div className="comment">
                                    <img className="comment-img" src={comment} alt="댓글"/>
                                    <span>{post.postview}</span>
                                </div>
                            </div>
                            {/* 게시글 내용 */}
                            <div className="cotent-section">
                                <div>
                                    <span className="cotent-text">{post.postcontent}</span>
                                </div>
                            </div>
                            {/* 댓글 내용 */}
                            <div className="comment-section">
                                {replies[post.postnum] && replies[post.postnum].length > 0 ? (
                                    replies[post.postnum].map((reply) => (
                                        <div className="comment" key={reply.replynum}>
                                            <img className="comment-profile"
                                                 src={`${process.env.PUBLIC_URL}/profileImg/${post.profileimage}`}
                                                 alt="프로필 사진"
                                                 onError={(e) => {
                                                     e.target.src = `${process.env.PUBLIC_URL}/profileImg/defaultProfile.png`;
                                                 }}/>
                                            <div className="comment-content">
                                                <div><span className="name">{reply.userid}</span></div>
                                                <span className="comment-text">{reply.replycontent}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="comment">
                                        <img className="comment-profile"
                                             src={`${process.env.PUBLIC_URL}/profileImg/${post.profileimage}`}
                                             alt="프로필 사진"
                                             onError={(e) => {
                                                 e.target.src = `${process.env.PUBLIC_URL}/profileImg/defaultProfile.png`;
                                             }}/>
                                        <div className="comment-content">
                                            <div><span className="profile-name nick-name">{userid || "익명"}</span></div>
                                            <span className="comment-text">댓글을 작성해보세요...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FollowPage;