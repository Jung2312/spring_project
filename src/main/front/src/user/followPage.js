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

function FollowPage() {
    const [likeCount, setLikeCount] = useState(0); // 좋아요 초기값
    const [postList, setPostList] = useState([]); // 게시글 데이터

    // 좋아요 클릭 시 숫자 증가
    const handleLikeClick = () => {
        setLikeCount(likeCount + 1);
    };

    // 서버에서 게시글 데이터 가져옴
    useEffect(() => {
        axios
            .get('http://localhost:80/recommend') // Spring Boot API URL
            .then((response) => {
                setPostList(response.data);
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
            });
    }, []);
    return (
        <div className="followPage">
            <Header/>
            <div className="followPage_followpage">
                <div className="followPage_profile_section">
                    <div className="followPage_profile_box">
                        <div className="followPage_profile_image">
                            <img className="followPage-profile-img" src={nongdamgom} alt="프로필 사진"/>
                        </div>
                        <div className="followPage_profile_content">
                            <span className="followPage_profile_content_name">회원명</span>
                            <div className="followPage_profile_content_follower_following">
                                <span>팔로워</span><span className="followPage_profile_follower_number">0</span>
                                <span style={{margin: '0 10px'}}> | </span>
                                <span>팔로잉</span><span className="followPage_profile_following_number">0</span>
                            </div>
                            <button className="followPage_profile_content_follow_button">팔로우</button>
                            <span className="followPage_profile_content_intro">나의 자취생활</span>
                        </div>
                    </div>
                </div>
                <div className="followPage_post_section">
                    {postList.map((post) => (
                        <div className="recommend-section" key={post.postnum}>
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
                                        <span>·</span>
                                        <button className="follow">팔로우</button>
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
                            <div className="like-comment" onClick={handleLikeClick} style={{cursor: 'pointer'}}>
                                <div className="like">
                                    <img className="like-img" src={like} alt="마음"/>
                                    <span>{post.postlike + likeCount}</span>
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
                                <div className="comment">
                                    <img className="comment-profile" src={ex} alt="프로필사진"/>
                                    <div className="comment-content">
                                        <div><span className="name">{post.userid}</span></div>
                                        <span className="comment-text">{post.userid}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FollowPage;