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

function FollowPage() {
    const [likeCount, setLikeCount] = useState(0); // 좋아요 초기값

    // 좋아요 클릭 시 숫자 증가
    const handleLikeClick = () => {
        setLikeCount(likeCount + 1);
    };
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
                    <div className="followPage_post_container">
                        <div className="followPage_post_profile">
                            <div className="followPage_post_profile_img">
                                <img src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="followPage_post_profile_content">
                                <div className="followPage_post_profile_text">
                                    <span className="followPage_post_profile_name">회원명</span>
                                    <span style={{margin: '0 10px', color: '#b6b6b6'}}> | </span>
                                    <span className="followPage_post_profile_follow">팔로우</span>
                                </div>
                                <span className="followPage_post_profile_one_liner_text">나의 자취생활</span>
                            </div>
                        </div>
                        <div className="followPage_post_image">
                            <img src={furniture2} alt="게시글 사진"/>
                        </div>
                        <div className="followPage_post_cotent">
                            <span className="followPage_post_cotent_text">이 고구마를 봐, 때깔곱지</span>
                        </div>
                        <div className="followPage_post_like_comment">
                            <div className="followPage_post_like" onClick={handleLikeClick} style={{cursor: 'pointer'}}>
                                <img className="followPage_post_like_img" src={like} alt="좋아요"/>
                                <span className="followPage_post_like_number">{likeCount}</span>
                            </div>
                            <div className="followPage_post_comment">
                                <img className="followPage_post_comment_img" src={comment} alt="댓글"/>
                                <span className="followPage_post_comment_number">12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowPage;