import React, { useState } from 'react';
import banner from '../img/banner.png';
import like from '../img/like.png';
import comment from '../img/comment.png';
import nongdamgom  from '../img/nongdamgom.png';
import blacknongdamgom  from '../img/blacknongdamgom.png';
import furniture from '../img/furniture.png';
import css from '../css/mainPage.css';
import Header from '../header.js'

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
            <Header/>
            <div className="mainPage-banner-section">
                <div className="mainPage-banner">
                    <img className="mainPage-banner-img" src={banner} alt="배너(광고)"/>
                </div>
            </div>
            <div className="mainPage-recommend-section">
                <div className="mainPage-recommend-part">
                    <div className="mainPage-recommend-content">
                        <div className="mainPage-profile">
                            <div className="mainPage-profile-img">
                                <img className="mainPage-profile-img" src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="mainPage-profile-content">
                                <div className="mainPage-profile-text">
                                    <span className="mainPage-name">nondamgomguma</span>
                                    <span className="mainPage-follow">팔로우</span>
                                </div>
                                <div className="mainPage-one-liner">
                                    <span className="mainPage-one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                </div>
                            </div>
                        </div>
                        <div className="mainPage-image">
                            <img className="mainPage-post-img" src={banner} alt="게시글 사진"/>
                        </div>
                        <div className="mainPage-like_comment">
                            <div className="mainPage-like" onClick={handleLikeClick} style={{cursor: 'pointer'}}>
                                <img className="mainPage-like-img" src={like} alt="좋아요"/>
                                <span className="mainPage-like-text">{likeCount}</span>
                            </div>
                            <div className="mainPage-comment">
                                <img className="mainPage-comment-img" src={comment} alt="댓글"/>
                                <span>12</span>
                            </div>
                        </div>
                        <div className="mainPage-cotent">
                            <div className="mainPage-cotent-text">
                                <span>이 고구마를 봐, 때깔곱지</span>
                            </div>
                        </div>
                        <div className="mainPage-comment">
                            <div className="mainPage-comment-profile">
                                <div className="mainPage-comment-profile-img">
                                    <img className="mainPage-comment-profile-img" src={blacknongdamgom} alt="프로필사진"/>
                                </div>
                                <div className="mainPage-comment-content">
                                    <div className="mainPage-comment-text">
                                        <span className="mainPage-name">nondamgomguma</span>
                                        <span className="mainPage-one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainPage-recommend-content">
                        <div className="mainPage-profile">
                            <div className="mainPage-profile-img">
                                <img className="mainPage-profile-img" src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="mainPage-profile-content">
                                <div className="mainPage-profile-text">
                                    <span className="mainPage-name">nondamgomguma</span>
                                    <span className="mainPage-follow">팔로우</span>
                                </div>
                                <div className="mainPage-one-liner">
                                    <span className="mainPage-one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                </div>
                            </div>
                        </div>
                        <div className="mainPage-image">
                            <img className="mainPage-post-img" src={banner} alt="게시글 사진"/>
                        </div>
                        <div className="mainPage-like_comment">
                            <div className="mainPage-like">
                                <img className="mainPage-like-img" src={like} alt="좋아요"/>
                                <span>112</span>
                            </div>
                            <div className="mainPage-comment">
                                <img className="mainPage-comment-img" src={comment} alt="댓글"/>
                                <span>12</span>
                            </div>
                        </div>
                        <div className="mainPage-cotent">
                            <div className="mainPage-cotent-text">
                                <span>이 고구마를 봐, 때깔곱지</span>
                            </div>
                        </div>
                        <div className="mainPage-comment">
                            <div className="mainPage-comment-profile">
                                <div className="mainPage-comment-profile-img">
                                    <img className="mainPage-comment-profile-img" src={blacknongdamgom} alt="프로필사진"/>
                                </div>
                                <div className="mainPage-comment-content">
                                    <div className="mainPage-comment-text">
                                        <span className="mainPage-name">nondamgomguma</span>
                                        <span className="mainPage-one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainPage-recommend-content">
                        <div className="mainPage-profile">
                            <div className="mainPage-profile-img">
                                <img className="mainPage-profile-img" src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="mainPage-profile-content">
                                <div className="mainPage-profile-text">
                                    <span className="mainPage-name">nondamgomguma</span>
                                    <span className="mainPage-follow">팔로우</span>
                                </div>
                                <div className="mainPage-one-liner">
                                    <span className="mainPage-one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                </div>
                            </div>
                        </div>
                        <div className="mainPage-image">
                            <img className="mainPage-post-img" src={banner} alt="게시글 사진"/>
                        </div>
                        <div className="mainPage-like_comment">
                            <div className="mainPage-like">
                                <img className="mainPage-like-img" src={like} alt="좋아요"/>
                                <span>112</span>
                            </div>
                            <div className="mainPage-comment">
                                <img className="mainPage-comment-img" src={comment} alt="댓글"/>
                                <span>12</span>
                            </div>
                        </div>
                        <div className="mainPage-cotent">
                            <div className="mainPage-cotent-text">
                                <span>이 고구마를 봐, 때깔곱지</span>
                            </div>
                        </div>
                        <div className="mainPage-comment">
                            <div className="mainPage-comment-profile">
                                <div className="mainPage-comment-profile-img">
                                    <img className="mainPage-comment-profile-img" src={blacknongdamgom} alt="프로필사진"/>
                                </div>
                                <div className="mainPage-comment-content">
                                    <div className="mainPage-comment-text">
                                        <span className="mainPage-name">nondamgomguma</span>
                                        <span className="mainPage-one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainPage-recommend-content" style={{marginRight: '0px'}}>
                        <div className="mainPage-profile">
                            <div className="mainPage-profile-img">
                                <img className="mainPage-profile-img" src={nongdamgom} alt="프로필 사진"/>
                            </div>
                            <div className="mainPage-profile-content">
                                <div className="mainPage-profile-text">
                                    <span className="mainPage-name">nondamgomguma</span>
                                    <span className="mainPage-follow">팔로우</span>
                                </div>
                                <div className="mainPage-ne-liner">
                                    <span className="mainPage-one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                </div>
                            </div>
                        </div>
                        <div className="mainPage-image">
                            <img className="mainPage-post-img" src={banner} alt="게시글 사진"/>
                        </div>
                        <div className="mainPage-like_comment">
                            <div className="mainPage-like">
                                <img className="mainPage-like-img" src={like} alt="좋아요"/>
                                <span>112</span>
                            </div>
                            <div className="mainPage-comment">
                                <img className="mainPage-comment-img" src={comment} alt="댓글"/>
                                <span>12</span>
                            </div>
                        </div>
                        <div className="mainPage-cotent">
                            <div className="mainPage-cotent-text">
                                <span>이 고구마를 봐, 때깔곱지</span>
                            </div>
                        </div>
                        <div className="mainPage-comment">
                            <div className="mainPage-comment-profile">
                                <div className="mainPage-comment-profile-img">
                                    <img className="mainPage-comment-profile-img" src={blacknongdamgom} alt="프로필사진"/>
                                </div>
                                <div className="mainPage-comment-content">
                                    <div className="mainPage-comment-text">
                                        <span className="mainPage-name">nondamgomguma</span>
                                        <span className="mainPage-one-liner_text">고구마를 좋아하는 어쩌구 ...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainPage-category-section">
                <div className="mainPage-category-title">
                    <span className="mainPage-title-text">카테고리별 상품 찾기</span>
                </div>
                <div className="mainPage-category-part">
                    <div className="mainPage-category-content">
                        <img className="mainPage-categoty-img" src={furniture} alt="가구"/>
                        <span className="mainPage-category-name">가구</span>
                    </div>
                    <div className="mainPage-category-content">
                        <img className="mainPage-categoty-img" src={furniture} alt="가구"/>
                        <span className="mainPage-category-name">가구</span>
                    </div>
                    <div className="mainPage-category-content">
                        <img className="mainPage-categoty-img" src={furniture} alt="가구"/>
                        <span className="mainPage-category-name">가구</span>
                    </div>
                </div>
            </div>
            <div className="mainPage-mostView-section">
                <div className="mainPage-mostView-title">
                    <span className="mainPage-title-text">많이 찾아 본 상품</span>
                    <span className="mainPage-title-more">더보기</span>
                </div>
                <div className="mainPage-mostView-part">
                    <div className="mainPage-mostView-content">
                        <div className="mainPage-image-container">
                            <img className="mainPage-mostView-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="mainPage-mostView-text">
                            <span className="mainPage-store-name">아임홈</span>
                            <span className="mainPage-product-name">맞춤 원목 서랍장</span>
                            <span className="mainPage-product-price">49,000</span>
                            <span className="mainPage-product-review">리뷰 37,213</span>
                        </div>
                        </div>
                        <div className="mainPage-mostView-content">
                            <div className="mainPage-image-container">
                                <img className="mainPage-mostView-img" src={furniture} alt="가구"/>
                            </div>
                            <div className="mainPage-mostView-text">
                                <span className="mainPage-store-name">아임홈</span>
                                <span className="mainPage-product-name">맞춤 원목 서랍장</span>
                                <span className="mainPage-product-price">49,000</span>
                                <span className="mainPage-product-review">리뷰 37,213</span>
                            </div>
                        </div>
                        <div className="mainPage-mostView-content">
                            <div className="mainPage-image-container">
                                <img className="mainPage-mostView-img" src={furniture} alt="가구"/>
                            </div>
                            <div className="mainPage-mostView-text">
                                <span className="mainPage-store-name">아임홈</span>
                                <span className="mainPage-product-name">맞춤 원목 서랍장</span>
                                <span className="mainPage-product-price">49,000</span>
                                <span className="mainPage-product-review">리뷰 37,213</span>
                            </div>
                        </div>
                        <div className="mainPage-mostView-content">
                            <div className="mainPage-image-container">
                                <img className="mainPage-mostView-img" src={furniture} alt="가구"/>
                            </div>
                            <div className="mainPage-mostView-text">
                                <span className="mainPage-store-name">아임홈</span>
                                <span className="mainPage-product-name">맞춤 원목 서랍장</span>
                                <span className="mainPage-product-price">49,000</span>
                                <span className="mainPage-product-review">리뷰 37,213</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainPage-best-section">
                <div className="mainPage-best-title">
                    <span className="mainPage-title-text">베스트 상품</span>
                    <span className="mainPage-title-more">더보기</span>
                </div>
                {/* 탭 버튼 */}
                <div className="mainPage-tab-buttons">
                    <button className={`mainPage-tab-button ${activeTab === 'all' ? 'active' : ''}`} onClick={() => showTab('all')}>전체</button>
                    <button className={`mainPage-tab-button ${activeTab === 'furniture' ? 'active' : ''}`} onClick={() => showTab('furniture')}>가구</button>
                    <button className={`mainPage-tab-button ${activeTab === 'fabric' ? 'active' : ''}`} onClick={() => showTab('fabric')}>패브릭</button>
                    {/* 필요에 따라 더 많은 탭 버튼 추가 */}
                </div>
                <div className="mainPage-best-part">
                    <div
                        className={`mainPage-best-content tab-content ${activeTab === 'all' || activeTab === 'furniture' ? 'show' : ''}`}>
                        <div className="mainPage-image-container">
                            <img className="mainPage-best-img" src={furniture} alt="가구"/>
                            <div className="mainPage-rank-badge">1</div>
                        </div>
                        <div className="mainPage-best-text">
                            <span className="mainPage-store-name">아임홈</span>
                            <span className="mainPage-product-name">맞춤 원목 서랍장</span>
                            <span className="mainPage-product-price">49,000</span>
                            <span className="mainPage-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div
                        className={`mainPage-best-content tab-content ${activeTab === 'all' || activeTab === 'fabric' ? 'show' : ''}`}>
                        <div className="mainPage-image-container">
                            <img className="mainPage-best-img" src={furniture} alt="가구"/>
                            <div className="mainPage-rank-badge">2</div>
                        </div>
                        <div className="mainPage-best-text">
                            <span className="mainPage-store-name">아임홈</span>
                            <span className="mainPage-product-name">맞춤 원목 커튼</span>
                            <span className="mainPage-product-price">49,000</span>
                            <span className="mainPage-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className={`mainPage-best-content tab-content ${activeTab === 'all' || activeTab === 'furniture' ? 'show' : ''}`}>
                        <div className="mainPage-image-container">
                            <img className="mainPage-best-img" src={furniture} alt="가구"/>
                            <div className="mainPage-rank-badge">3</div>
                        </div>
                        <div className="mainPage-best-text">
                            <span className="mainPage-store-name">아임홈</span>
                            <span className="mainPage-product-name">맞춤 원목 서랍장</span>
                            <span className="mainPage-product-price">49,000</span>
                            <span className="mainPage-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
}

export default MainPage;
