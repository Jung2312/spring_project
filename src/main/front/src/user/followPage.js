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
    const [postList, setPostList] = useState([]); // 게시글 데이터
    const [likedPosts, setLikedPosts] = useState([]); // 좋아요를 누른 게시글 리스트 (postnum)



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

        // 로컬 스토리지에서 좋아요 상태 복원
        const storedLikedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        setLikedPosts(storedLikedPosts);
    }, []);

    // 좋아요 클릭 시 처리
    const handleLikeClick = (postNum) => {
        // 이미 좋아요를 눌렀다면 아무 동작도 하지 않음
        if (likedPosts.includes(postNum)) {
            // 이미 좋아요를 누른 경우 알림을 띄운다
            alert('좋아요는 한 번만 누를 수 있습니다.');
            return; // 함수 종료
        }

        // 좋아요를 클릭한 게시글에 대해 서버로 좋아요 증가 요청
        axios
            .post('http://localhost:80/recommend/user/like', null, {
                params: { postnum: postNum } // URL 파라미터로 postnum 전달
            })
            .then((response) => {
                // 서버에서 좋아요 업데이트가 성공하면
                setPostList((prevPosts) =>
                    prevPosts.map((post) =>
                        post.postnum === postNum ? { ...post, postlike: post.postlike + 1 } : post
                    )
                );

                // 로컬 상태에 해당 게시글의 좋아요 정보를 추가
                const newLikedPosts = [...likedPosts, postNum];
                setLikedPosts(newLikedPosts);

                // 로컬 스토리지에 저장하여 페이지 새로고침 시 유지
                localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
            })
            .catch((error) => {
                console.error('좋아요 증가 중 오류가 발생했습니다.', error);
            });
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
                    {postList.map((post) => (
                        <div className="followPage_post_part" key={post.postnum}>
                            {/* 프로필 섹션 */}
                            <div className="followPage_post_profile-section">
                                <div className="followPage_post_profile-img">
                                    <img className="followPage_post_profile-img"
                                         src={`${process.env.PUBLIC_URL}/profileImg/${post.profileimage}`} alt="프로필 사진"
                                         onError={(e) => {
                                             e.target.src = ex;
                                         }}/>
                                </div>
                                <div className="followPage_post_profile-content">
                                    <div className="followPage_post_profile-name">
                                        <span className="nick-name">{post.userid}</span> {/* 닉네임 */}
                                        <span>·</span>
                                        <button className="follow">팔로우</button>
                                    </div>
                                    <div>
                                        <span className="followPage_post_profile-text">{post.introduce}</span> {/* 자기소개 */}
                                    </div>
                                </div>
                            </div>
                            {/* 게시글 사진 */}
                            <img className="followPage_post_post-img" src={`${process.env.PUBLIC_URL}/postImg/${post.postimg}`}
                                 alt="게시글 사진"
                                 onError={(e) => {
                                     e.target.src = ex;
                                 }}/>
                            {/* 게시글 내용 */}
                            <div className="followPage_post_cotent-section">
                                <div>
                                    <span className="cotent-text">{post.postcontent}</span>
                                </div>
                            </div>
                            {/* 좋아요와 댓글 */}
                            <div className="followPage_like_comment" onClick={() => handleLikeClick(post.postnum)}
                                 style={{cursor: 'pointer'}}>
                                <div className="like">
                                    <img
                                        className="like-img"
                                        src={like}
                                        alt="좋아요"
                                        style={{
                                            filter: likedPosts.includes(post.postnum) ? 'invert(35%) sepia(100%) saturate(750%) hue-rotate(0deg)' : 'none', // 좋아요를 누른 상태
                                        }}
                                    />
                                    <span>{post.postlike}</span> {/* 좋아요 수 */}
                                </div>
                                <div className="comment">
                                    <img className="comment-img" src={comment} alt="댓글"/>
                                    <span>{post.postview}</span>
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