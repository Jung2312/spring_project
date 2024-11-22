import React, {useEffect, useState} from 'react';
import ex from '../img/exProfile.png';
import like from '../img/like.png';
import comment from '../img/comment.png';
import '../css/community.css';
import axios from "axios";

function Recommend() {
    const [postList, setPostList] = useState([]);

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
        <div className="recommend-container">
            {postList.map((post) => (
                <div className="recommend-section" key={post.postnum}>
                    {/* 프로필 섹션 */}
                    <div className="profile-section">
                        <div className="profile-img">
                            <img className="profile-img" src={`${process.env.PUBLIC_URL}/profileImg/${post.profileimage}`} alt="프로필 사진"
                                 onError={(e) => { e.target.src = ex; }}/>
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
                    <img className="post-img" src={`${process.env.PUBLIC_URL}/postImg/${post.postimg}`} alt="게시글 사진"
                         onError={(e) => { e.target.src = ex; }}/>
                    {/* 좋아요와 댓글 */}
                    <div className="like-comment">
                        <div className="like">
                            <img className="like-img" src={like} alt="마음"/>
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
    );
}

export default Recommend;