import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/recommendDetail.css';
import like from '../img/like.png';
import redlike from '../img/redLike.png';
import axios from 'axios';
import Header from "../header";

const PostDetail = () => {
    const { postnum } = useParams(); // URL에서 postnum 가져오기
    const [post, setPost] = useState([]); // 단일 게시글 데이터
    const [likes, setLikes] = useState(0);
    const [likedPosts, setLikedPosts] = useState([]);
    const [heartColor, setHeartColor] = useState("white");
    const [follows, setFollows] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
    const [editedPostContent, setEditedPostContent] = useState(''); // 수정된 내용 저장
    const [editedPostTitle, setEditedPostTitle] = useState(''); // 수정된 제목 저장
    const [hashtags, setHashtags] = useState([]); // 해시태그 상태 추가
    const [newTag, setNewTag] = useState(''); // 새 해시태그 입력 상태
    const [newImage, setNewImage] = useState(null); // 새로운 이미지 파일 상태
    const [replies, setReplies] = useState([]);
    const [newComment, setNewComment] = useState("");

    // sessionStorage에서 로그인한 사용자 ID 가져오기
    const loggedInUserId = sessionStorage.getItem('userid'); // 로그인한 사용자 아이디

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:80/recommend/${postnum}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPost(data);
                setLikes(data.postlike); // 초기 좋아요 수 설정
                setLikedPosts(data.isLiked); // 게시글 좋아요 상태 초기화
                setHeartColor(data.isLiked ? "red" : "white"); // 하트 색상 초기화
                setEditedPostContent(data.postcontent); // 수정할 내용 초기화
                setEditedPostTitle(data.posttitle); // 수정할 제목 초기화
                setHashtags(data.hashtaglist ? data.hashtaglist.split(",") : []); // 수정할 해시태그 초기화
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [postnum]);

    useEffect(() => {
        // 댓글 데이터 가져오기
        fetch(`http://localhost:80/reply/${postnum}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("댓글 조회 실패");
                }
                return response.json();
            })
            .then((data) => setReplies(data))
            .catch((error) => console.error(error));
    }, [postnum]);

    const handleCommentSubmit = () => {
        if (newComment.trim() === "") {
            alert("댓글을 입력하세요.");
            return;
        }

        if (!loggedInUserId) {
            alert("로그인이 필요합니다.");
            return;
        }

        // 댓글 작성 요청
        fetch(`http://localhost:80/reply/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postnum,
                replycontent: newComment,
                userid: loggedInUserId, // 로그인된 사용자 ID (수정 필요)
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("댓글 작성 실패");
                }
                return response.json();
            })
            .then((newReply) => {
                console.log("작성된 댓글:", newReply);
                setReplies([...replies, newReply]); // 새 댓글 추가
                setNewComment(""); // 입력 필드 초기화
            })
            .catch((error) => console.error("댓글 작성 중 오류:",error));
    };

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const response = await axios.get('http://localhost:80/liked/user', {
                    params: { userid: loggedInUserId },
                });
                setLikedPosts(response.data|| []); // 사용자가 좋아요한 게시글 ID 목록
            } catch (error) {
                console.error("좋아요 데이터 가져오기 실패:", error);
            }
        };

        if (loggedInUserId) fetchLikedPosts();
    }, [loggedInUserId, likedPosts]);

    const handleLikeToggle = async (postnum) => {
        if (!loggedInUserId) {
            alert("로그인이 필요합니다.");
            return;
        }

        // 좋아요 상태를 즉시 변경
        const isLiked = likedPosts.includes(postnum);

        setLikedPosts((prevLikedPosts) =>
            isLiked
                ? prevLikedPosts.filter((id) => id !== postnum)  // 좋아요 취소
                : [...prevLikedPosts, postnum]  // 좋아요 추가
        );

        // 좋아요 수를 바로 반영하도록 post 상태 업데이트
        setPost((prevPost) => ({
            ...prevPost,
            postlike: prevPost.postlike + (isLiked ? -1 : 1), // 기존 좋아요 수에서 +1 또는 -1
        }));

        // 서버에 좋아요 상태 요청
        try {
            const response = await axios.post(
                `http://localhost:80/recommend/like`,
                null, // Request body 필요 없음
                {
                    params: { postnum },
                    headers: {
                        userid: loggedInUserId, // 헤더로 userid 전달
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error("좋아요 처리 실패");
            }
        } catch (error) {
            console.error("좋아요 처리 중 오류:", error);
        }
    };


    // 컴포넌트 마운트 시 팔로우 상태를 가져옴
    useEffect(() => {
        if (!loggedInUserId) {
            console.warn("로그인된 사용자가 없습니다.");
            return; // loggedInUserId가 없으면 실행하지 않음
        }

        const fetchFollowStatus = async () => {
            try {
                const response = await fetch(`http://localhost:80/follow/status?userid=${loggedInUserId}&target=${post.userid}`);
                if (response.ok) {
                    const result = await response.json();
                    setFollows(result.following); // 서버에서 받은 상태로 설정
                } else {
                    console.error("팔로우 상태 가져오기 실패");
                }
            } catch (error) {
                console.error("팔로우 상태 요청 중 오류 발생", error);
            }
        };

        if (post && post.userid) {
            fetchFollowStatus(); // 상태 가져오기
        }
    }, [loggedInUserId, post]); // 의존성 배열에 ID 추가

    const handleFollow = async () => {
        const targetUserId = post.userid; // 팔로우할 대상 사용자 ID

        if (!loggedInUserId) {
            alert("로그인이 필요합니다.");
            return;
        }


        try {
            const response = await fetch("http://localhost:80/follow/toggle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: loggedInUserId, // 로그인한 사용자
                    following: targetUserId, // 팔로우 대상
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("서버 응답:", result);
                setFollows(result.following); // 팔로우 상태 업데이트
            } else {
                console.error("팔로우 상태 변경 실패");
            }
        } catch (error) {
            console.error("팔로우 요청 중 오류 발생", error);
        }
    };

    useEffect(() => {
        console.log("팔로우 상태 변경됨:", follows);
    }, [follows]);

    const handleEdit = () => {
        setIsEditing(true); // 수정 버튼 클릭 시 수정 모드 활성화
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("postnum", post.postnum);
        formData.append("posttitle", editedPostTitle);
        formData.append("postcontent", editedPostContent);
        formData.append("hashtags", hashtags.join(','));

        if (newImage) {
            formData.append("postimg", newImage);
        }

        try {
            const response = await fetch(`http://localhost:80/recommend/update`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert("게시글이 수정되었습니다.");
                window.location.href = `/community/recommendDetail/${post.postnum}`;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error saving post:", error);
            alert("게시글 수정에 실패했습니다.");
        }
    };


    const handleCancel = () => {
        setIsEditing(false); // 수정 모드 취소
        setEditedPostContent(post.postcontent); // 원본 내용으로 되돌리기
        setEditedPostTitle(post.posttitle); // 원본 제목으로 되돌리기
        setHashtags(post.hashtaglist ? post.hashtaglist.split(",") : []); // 원본 해시태그로 되돌리기
        setNewImage(null); // 이미지 초기화
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:80/recommend/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postnum: postnum }), // 삭제할 게시글 번호를 전달
            });

            if (response.ok) {
                alert("게시글이 삭제되었습니다.");
                window.location.href = "/community/recommend";
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("게시글 삭제에 실패했습니다.");
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setNewImage(file); // 새 이미지 파일 상태 업데이트
    };

    const handleInputChange = (e) => {
        setNewTag(e.target.value); // 새 해시태그 입력값 업데이트
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && newTag.trim() && hashtags.length < 5) {
            setHashtags([...hashtags, newTag.trim()]); // 해시태그 추가
            setNewTag(''); // 입력 필드 초기화
        }
    };

    const handleDeleteHashtag = (index) => {
        setHashtags(hashtags.filter((_, i) => i !== index)); // 해시태그 삭제
    };

    if (!post) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    return (
        <div>
            <Header />
            <div className="post-detail-container">
                <div className="post-detail-card">
                    {/* 수정된 제목 */}
                    <h2 className="post-detail-title">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedPostTitle}
                                onChange={(e) => setEditedPostTitle(e.target.value)}
                                className="post-detail-edit-title"
                            />
                        ) : (
                            post.posttitle
                        )}
                    </h2>

                    <div className="post-detail-author">
                        <img
                            src={`${process.env.PUBLIC_URL}/profileImg/${post.profileimage}`}
                            alt="프로필 이미지"
                            className="post-detail-profile-image"
                        />
                        <span className="post-detail-author-id">{post.userid}</span>

                        {post.userid !== loggedInUserId && (
                            <button
                                className={`post-detail-follow-btn ${follows ? 'following' : 'follow'}`}
                                onClick={handleFollow}
                            >
                                {follows ? '팔로잉' : '팔로우'}
                            </button>
                        )}
                    </div>

                    {/* 수정, 삭제 버튼 */}
                    {!isEditing && post.userid === loggedInUserId && (
                        <div className="post-detail-edit-section">
                            <button
                                className="post-detail-edit-btn"
                                onClick={handleEdit}
                            >
                                수정
                            </button>
                            <button
                                className="post-detail-delete-btn"
                                onClick={handleDelete}
                            >
                                삭제
                            </button>
                        </div>
                    )}


                    {/* 게시글 이미지 수정 */}
                    <div className="post-detail-image-section">
                        {isEditing ? (
                            <div>
                                <img
                                    src={newImage ? URL.createObjectURL(newImage) : `${process.env.PUBLIC_URL}/postImg/${post.postimg}`}
                                    alt="게시글 이미지"
                                    className="post-detail-post-image"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="post-detail-image-input"
                                />
                            </div>
                        ) : (
                            <img
                                src={`${process.env.PUBLIC_URL}/postImg/${post.postimg}`}
                                alt="게시글 이미지"
                                className="post-detail-post-image"
                            />
                        )}
                    </div>

                    {/* 수정 모드일 때는 텍스트 입력 필드 */}
                    <div className="post-detail-content">
                        {isEditing ? (
                            <textarea
                                value={editedPostContent}
                                onChange={(e) => setEditedPostContent(e.target.value)}
                                className="post-detail-edit-textarea"
                            />
                        ) : (
                            <p>{post.postcontent}</p>
                        )}
                    </div>

                    {/* 해시태그 수정 */}
                    <div className="post-detail-hashtags">
                        {isEditing ? (
                            <div className="hashtagInputContainer">
                                <div className="hashtagInputWrapper">
                                    {hashtags.map((tag, index) => (
                                        <span key={index} className="hashtagInInput">
                                            #{tag}
                                            <button
                                                onClick={() => handleDeleteHashtag(index)}
                                                className="deleteHashtagBtn"
                                            >
                                                x
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        className="hashtagInput"
                                        value={newTag}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={hashtags.length < 5 ? "해시태그 입력" : ""}
                                        disabled={hashtags.length >= 5}
                                    />
                                </div>
                            </div>
                        ) : (
                            post.hashtaglist?.split(",").map((tag, index) => (
                                <span key={index} className="post-detail-hashtag">
                                    #{tag}
                                </span>
                            ))
                        )}
                    </div>

                    {/* 수정 모드일 때는 저장 및 취소 버튼 */}
                    {isEditing && (
                        <div className="post-detail-edit-actions">
                            <button onClick={handleSave} className="post-detail-save-btn">저장</button>
                            <button onClick={handleCancel} className="post-detail-cancel-btn">취소</button>
                        </div>
                    )}

                    {/* 수정 모드일 때는 좋아요, 조회수, 댓글 입력은 숨김 처리 */}
                    {!isEditing && (
                        <div className="post-detail-stats">
                            <img
                                className="post-detail-like-btn"
                                src={(likedPosts && likedPosts.includes(post.postnum)) ? redlike : like}  // likedPosts가 배열일 때만 includes 호출
                                alt="좋아요"
                                onClick={() => handleLikeToggle(post.postnum)}
                            />
                            <span>{post.postlike}</span>
                            <span className="post-detail-view">조회수: {post.postview}</span>
                            <span className="post-detail-date">작성일: {post.postdate}</span>
                        </div>
                    )}

                    {replies.length > 0 ? (
                        replies.map((reply) => (
                            <div className="post-detail-reply" key={reply.replynum}>
                                <img className="post-detail-reply-profile"
                                     src={`${process.env.PUBLIC_URL}/profileImg/${reply.profileimage}`}
                                     alt="프로필 사진"
                                     onError={(e) => {
                                         e.target.src = `${process.env.PUBLIC_URL}/profileImg/defaultProfile.png`;
                                     }}/>
                                <strong className="post-detail-reply-userid">{reply.userid}</strong>
                                <p className="post-detail-reply-content">{reply.replycontent}</p>
                                <small className="post-detail-reply-date">{reply.replydate}</small>
                            </div>
                        ))
                    ) : (
                        <p className="post-detail-no-replies">댓글이 없습니다.</p>
                    )}

                    {!isEditing && (
                        <div className="post-detail-comment-section">
                            <input
                                type="text"
                                className="post-detail-comment-input"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="댓글을 입력하세요"
                            />
                            <button
                                className="post-detail-comment-submit-btn"
                                onClick={handleCommentSubmit}
                            >
                                댓글 작성
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
