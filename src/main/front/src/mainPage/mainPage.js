import React, { useState } from 'react';
import banner from '../img/banner.png';
import like from '../img/like.png';
import comment from '../img/comment.png';
import nongdamgom  from '../img/nongdamgom .png';
import blacknongdamgom  from '../img/blacknongdamgom .png';
import furniture from '../img/furniture.png';
import css from '../css/mainPage.css';

function MainPage() {
    const [likeCount, setLikeCount] = useState(0); // 좋아요 초기값

    // 좋아요 클릭 시 숫자 증가
    const handleLikeClick = () => {
        setLikeCount(likeCount + 1);
    };

    const [activeTab, setActiveTab] = useState('all');

    // 탭을 변경하는 함수
    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="mainPage">
            <div className="banner-section">
                <div className="banner">
                    <img className="banner-img" src={banner} alt="배너(광고)"/>
                </div>
            </div>
            <div className="recommend-section">
                <div className="recommend-part">
                    <div className="recommend-content">
                        <div className="profile">
                            <div className="profile-img">
                                <img className="profile-img" src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="profile-content">
                                <div className="profile-text">
                                    <span className="name">nondamgomguma</span>
                                    <span> · </span>
                                    <span className="follow">팔로우</span>
                                </div>
                                <div className="one-liner">
                                    <span className="one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                </div>
                            </div>
                        </div>
                        <div className="image">
                            <img className="post-img" src={banner} alt="게시글 사진"/>
                        </div>
                        <div className="like_comment">
                            <div className="like" onClick={handleLikeClick} style={{cursor: 'pointer'}}>
                                <img className="like-img" src={like} alt="좋아요"/>
                                <span className="like-text">{likeCount}</span>
                            </div>
                            <div className="comment">
                                <img className="comment-img" src={comment} alt="댓글"/>
                                <span>12</span>
                            </div>
                        </div>
                        <div className="cotent">
                            <div className="cotent-text">
                                <span>이 고구마를 봐, 때깔곱지</span>
                            </div>
                        </div>
                        <div className="comment">
                            <div className="comment-profile">
                                <div className="comment-profile-img">
                                    <img className="comment-profile-img" src={blacknongdamgom} alt="프로필사진"/>
                                </div>
                                <div className="comment-content">
                                    <div className="comment-text">
                                        <span className="name">nondamgomguma</span>
                                        <span className="one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recommend-content">
                        <div className="profile">
                            <div className="profile-img">
                                <img className="profile-img" src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="profile-content">
                                <div className="profile-text">
                                    <span className="name">nondamgomguma</span>
                                    <span> · </span>
                                    <span className="follow">팔로우</span>
                                </div>
                                <div className="one-liner">
                                    <span className="one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                </div>
                            </div>
                        </div>
                        <div className="image">
                            <img className="post-img" src={banner} alt="게시글 사진"/>
                        </div>
                        <div className="like_comment">
                            <div className="like">
                                <img className="like-img" src={like} alt="좋아요"/>
                                <span>112</span>
                            </div>
                            <div className="comment">
                                <img className="comment-img" src={comment} alt="댓글"/>
                                <span>12</span>
                            </div>
                        </div>
                        <div className="cotent">
                            <div className="cotent-text">
                                <span>이 고구마를 봐, 때깔곱지</span>
                            </div>
                        </div>
                        <div className="comment">
                            <div className="comment-profile">
                                <div className="comment-profile-img">
                                    <img className="comment-profile-img" src={blacknongdamgom} alt="프로필사진"/>
                                </div>
                                <div className="comment-content">
                                    <div className="comment-text">
                                        <span className="name">nondamgomguma</span>
                                        <span className="one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recommend-content">
                        <div className="profile">
                            <div className="profile-img">
                                <img className="profile-img" src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="profile-content">
                                <div className="profile-text">
                                    <span className="name">nondamgomguma</span>
                                    <span> · </span>
                                    <span className="follow">팔로우</span>
                                </div>
                                <div className="one-liner">
                                    <span className="one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                </div>
                            </div>
                        </div>
                        <div className="image">
                            <img className="post-img" src={banner} alt="게시글 사진"/>
                        </div>
                        <div className="like_comment">
                            <div className="like">
                                <img className="like-img" src={like} alt="좋아요"/>
                                <span>112</span>
                            </div>
                            <div className="comment">
                                <img className="comment-img" src={comment} alt="댓글"/>
                                <span>12</span>
                            </div>
                        </div>
                        <div className="cotent">
                            <div className="cotent-text">
                                <span>이 고구마를 봐, 때깔곱지</span>
                            </div>
                        </div>
                        <div className="comment">
                            <div className="comment-profile">
                                <div className="comment-profile-img">
                                    <img className="comment-profile-img" src={blacknongdamgom} alt="프로필사진"/>
                                </div>
                                <div className="comment-content">
                                    <div className="comment-text">
                                        <span className="name">nondamgomguma</span>
                                        <span className="one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recommend-content" style={{marginRight: '0px'}}>
                        <div className="profile">
                            <div className="profile-img">
                                <img className="profile-img" src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="profile-content">
                                <div className="profile-text">
                                    <span className="name">nondamgomguma</span>
                                    <span> · </span>
                                    <span className="follow">팔로우</span>
                                </div>
                                <div className="one-liner">
                                    <span className="one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                </div>
                            </div>
                        </div>
                        <div className="image">
                            <img className="post-img" src={banner} alt="게시글 사진"/>
                        </div>
                        <div className="like_comment">
                            <div className="like">
                                <img className="like-img" src={like} alt="좋아요"/>
                                <span>112</span>
                            </div>
                            <div className="comment">
                                <img className="comment-img" src={comment} alt="댓글"/>
                                <span>12</span>
                            </div>
                        </div>
                        <div className="cotent">
                            <div className="cotent-text">
                                <span>이 고구마를 봐, 때깔곱지</span>
                            </div>
                        </div>
                        <div className="comment">
                            <div className="comment-profile">
                                <div className="comment-profile-img">
                                    <img className="comment-profile-img" src={blacknongdamgom} alt="프로필사진"/>
                                </div>
                                <div className="comment-content">
                                    <div className="comment-text">
                                        <span className="name">nondamgomguma</span>
                                        <span className="one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category-section">
                <div className="category-title">
                    <span className="title-text">카테고리별 상품 찾기</span>
                </div>
                <div className="category-part">
                    <div className="category-content">
                        <img className="categoty-img" src={furniture} alt="가구"/>
                        <span className="category-name">가구</span>
                    </div>
                    <div className="category-content">
                        <img className="categoty-img" src={furniture} alt="가구"/>
                        <span className="category-name">가구</span>
                    </div>
                    <div className="category-content">
                        <img className="categoty-img" src={furniture} alt="가구"/>
                        <span className="category-name">가구</span>
                    </div>
                </div>
            </div>
            <div className="mostView-section">
                <div className="mostView-title">
                    <span className="title-text">많이 찾아 본 상품</span>
                    <span className="title-more">더보기</span>
                </div>
                <div className="mostView-part">
                    <div className="mostView-content">
                        <img className="mostView-img" src={furniture} alt="가구"/>
                        <div className="mostView-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="mostView-content">
                        <img className="mostView-img" src={furniture} alt="가구"/>
                        <div className="mostView-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="mostView-content">
                        <img className="mostView-img" src={furniture} alt="가구"/>
                        <div className="mostView-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="mostView-content">
                        <img className="mostView-img" src={furniture} alt="가구"/>
                        <div className="mostView-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="best-section">
                <div className="best-title">
                    <span className="title-text">베스트 상품</span>
                    <span className="title-more">더보기</span>
                </div>
                {/* 탭 버튼 */}
                <div className="tab-buttons">
                    <button className={`tab-button ${activeTab === 'all' ? 'active' : ''}`} onClick={() => showTab('all')}>전체</button>
                    <button className={`tab-button ${activeTab === 'furniture' ? 'active' : ''}`} onClick={() => showTab('furniture')}>가구</button>
                    <button className={`tab-button ${activeTab === 'fabric' ? 'active' : ''}`} onClick={() => showTab('fabric')}>패브릭</button>
                    {/* 필요에 따라 더 많은 탭 버튼 추가 */}
                </div>
                <div className="best-part">
                    <div
                        className={`best-content tab-content ${activeTab === 'all' || activeTab === 'furniture' ? 'show' : ''}`}>
                        <div className="image-container">
                            <img className="best-img" src={furniture} alt="가구"/>
                            <div className="rank-badge">1</div>
                        </div>
                        <div className="best-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div
                        className={`best-content tab-content ${activeTab === 'all' || activeTab === 'fabric' ? 'show' : ''}`}>
                        <div className="image-container">
                            <img className="best-img" src={furniture} alt="가구"/>
                            <div className="rank-badge">2</div>
                        </div>
                        <div className="best-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 커튼</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className={`best-content tab-content ${activeTab === 'all' || activeTab === 'furniture' ? 'show' : ''}`}>
                        <div className="image-container">
                            <img className="best-img" src={furniture} alt="가구"/>
                            <div className="rank-badge">3</div>
                        </div>
                        <div className="best-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
}

export default MainPage;
