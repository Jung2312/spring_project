import React, { useState } from 'react';
import banner from '../img/banner.png';
import like from '../img/like.png';
import comment from '../img/comment.png';
import nongdamgom  from '../img/nongdamgom.png';
import blacknongdamgom  from '../img/blacknongdamgom.png';
import furniture from '../img/furniture.png';
import css from '../css/shoppingHome.css';

function ShoppingHome() {
    return (
        <div className="shoppingHome">
            <div className="banner-section">
                <div className="banner">
                    <img className="banner-img" src={banner} alt="배너(광고)"/>
                </div>
            </div>
            <div className="recommend-product-section">
                <div className="recommend-product-title">
                    <span className="title-text">추천 상품</span>
                    <span className="title-more">더보기</span>
                </div>
                <div className="recommend-product-part">
                    <div className="recommend-product-content">
                        <img className="recommend-product-img" src={furniture} alt="가구"/>
                        <div className="recommend-product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="recommend-product-content">
                        <img className="recommend-product-img" src={furniture} alt="가구"/>
                        <div className="recommend-product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="recommend-product-content">
                        <img className="recommend-product-img" src={furniture} alt="가구"/>
                        <div className="recommend-product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="recommend-product-content">
                        <img className="recommend-product-img" src={furniture} alt="가구"/>
                        <div className="recommend-product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category-section">
                <div className="category-title">
                    <span className="title-text">카테고리</span>
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
            <div className="product-section">
                <div className="product-part">
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
                            <span className="store-name">아임홈</span>
                            <span className="product-name">맞춤 원목 서랍장</span>
                            <span className="product-price">49,000</span>
                            <span className="product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="product-content">
                        <img className="product-img" src={furniture} alt="가구"/>
                        <div className="product-text">
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

export default ShoppingHome;
