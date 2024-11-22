import React, { useState } from 'react';
import banner from '../img/banner.png';
import like from '../img/like.png';
import comment from '../img/comment.png';
import nongdamgom  from '../img/nongdamgom.png';
import blacknongdamgom  from '../img/blacknongdamgom.png';
import furniture from '../img/furniture.png';
import css from '../css/shoppingHome.css';
import Header from "../header";

function ShoppingHome() {
    return (
        <div className="shoppingHome">
            <Header/>
            <div className="shoppingHome-banner-section">
                <div className="shoppingHome-banner">
                    <img className="shoppingHome-banner-img" src={banner} alt="배너(광고)"/>
                </div>
            </div>
            <div className="shoppingHome-recommend-product-section">
                <div className="shoppingHome-recommend-product-title">
                    <span className="shoppingHome-title-text">추천 상품</span>
                    <span className="shoppingHome-title-more">더보기</span>
                </div>
                <div className="shoppingHome-recommend-product-part">
                    <div className="shoppingHome-recommend-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-recommend-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-recommend-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-recommend-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-recommend-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-recommend-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-recommend-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-recommend-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-recommend-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-recommend-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-recommend-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-recommend-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shoppingHome-category-section">
                <div className="shoppingHome-category-title">
                    <span className="shoppingHome-title-text">카테고리</span>
                </div>
                <div className="shoppingHome-category-part">
                    <div className="shoppingHome-category-content">
                        <img className="shoppingHome-categoty-img" src={furniture} alt="가구"/>
                        <span className="shoppingHome-category-name">가구</span>
                    </div>
                    <div className="shoppingHome-category-content">
                        <img className="shoppingHome-categoty-img" src={furniture} alt="가구"/>
                        <span className="shoppingHome-category-name">가구</span>
                    </div>
                    <div className="shoppingHome-category-content">
                        <img className="shoppingHome-categoty-img" src={furniture} alt="가구"/>
                        <span className="shoppingHome-category-name">가구</span>
                    </div>
                </div>
            </div>
            <div className="shoppingHome-product-section">
                <div className="shoppingHome-product-part">
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    <div className="shoppingHome-product-content">
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-product-img" src={furniture} alt="가구"/>
                        </div>
                        <div className="shoppingHome-product-text">
                            <span className="shoppingHome-store-name">아임홈</span>
                            <span className="shoppingHome-product-name">맞춤 원목 서랍장</span>
                            <span className="shoppingHome-product-price">49,000</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingHome;
