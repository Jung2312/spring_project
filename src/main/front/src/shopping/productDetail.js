import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/shopping.css';
import star from '../img/star.png';
import storeIcon from '../img/store.png';

function ProductDetail() {
    const navigate = useNavigate();

    const handleBrandHomeClick = () => {
        const storename = "메이트";
        console.log("Navigating to store with storename:", storename);
        navigate(`/shoppingInformation/${storename}`);
    };

    return (
        <div className="productDetailcontainer">
            <div className="productDetailsection">
                <div className="productDetailInfo">
                    <div className="productDetailImgSection productDetailInfo-item">
                        <div className="productDetailsectionImg">
                            <img
                                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/169936744105428059.jpg?gif=1&w=72&h=72&c=c"
                                alt="제품 이미지"/>
                            <img
                                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/169936744105428059.jpg?gif=1&w=72&h=72&c=c"
                                alt="제품 이미지"/>
                            <img
                                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/169936744105428059.jpg?gif=1&w=72&h=72&c=c"
                                alt="제품 이미지"/>
                            <img
                                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/169936744105428059.jpg?gif=1&w=72&h=72&c=c"
                                alt="제품 이미지"/>
                            <img
                                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/169936744105428059.jpg?gif=1&w=72&h=72&c=c"
                                alt="제품 이미지"/>
                            <img
                                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/169936744105428059.jpg?gif=1&w=72&h=72&c=c"
                                alt="제품 이미지"/>
                            <img
                                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/169936744105428059.jpg?gif=1&w=72&h=72&c=c"
                                alt="제품 이미지"/>
                            <img
                                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/169936744105428059.jpg?gif=1&w=72&h=72&c=c"
                                alt="제품 이미지"/>
                        </div>
                        <div className="productDetailMainImg">
                            <img className="productPageImg"
                                 src="https://prs.ohou.se/apne2/any/uploads/productions/v1-217903433752576.jpg?gif=1&w=480&h=480&c=c&webp=1"
                                 alt="제품 이미지"/>
                        </div>
                    </div>
                    <div className="productDetailsectionText productDetailInfo-item">
                        <div className="productDetailShopInfoSection">
                            <div className="productDetailNameSection">
                                <h2 className="productDetailName">어그리어블리</h2>
                            </div>
                            <div>
                                <p className="productDetailText">[당일출고] 노프레임 비정형 웨이브 전신거울 A-4 + 원목/실버 받침대 선택</p>
                            </div>
                            <div className="productDetailReviewSection">
                                <div className="productDetailSectionSmallImgBox">
                                    <img className="productDetailSectionSmallImg" src={star} alt="제품 설명 이미지"/>
                                    <img className="productDetailSectionSmallImg" src={star} alt="제품 설명 이미지"/>
                                    <img className="productDetailSectionSmallImg" src={star} alt="제품 설명 이미지"/>
                                    <img className="productDetailSectionSmallImg" src={star} alt="제품 설명 이미지"/>
                                    <img className="productDetailSectionSmallImg" src={star} alt="제품 설명 이미지"/>
                                </div>
                                <div className="productDetailReviewCntBox">
                                    <span className="productDetailReviewCnt">5,077개 리뷰</span>
                                </div>
                            </div>
                            <div className="productDetailSellTextSection">
                                <p className="productDetailText">129,000원</p>
                            </div>
                            <div className="product-infoSection">
                                <p className="product-info">배송&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12:00
                                    까지
                                    결제 시 오늘 출발</p>
                            </div>
                            <hr/>
                            <div className="productDetailStoreSection">
                                <img className="productDetailStoreIcon" src={storeIcon}/>
                                <span className="productDetailStoreIconText">어그리어블리</span>
                                <input type="button" value="브랜드홈 >" id="productDetailStoreBtn" onClick={handleBrandHomeClick}/>
                            </div>
                        </div>
                        <div className="productDetail-productCountSection">
                            <div className="productDetail-productCountText">
                                <span>개수</span>
                            </div>
                            <div className="productDetail-productCount">
                                <input type="button" value="-" id="productDetail-productCount-delBtn"/>
                                <input id="productDetailCountText" defaultValue="1"/>
                                <input type="button" value="+" id="productDetail-productCount-addBtn"/>
                            </div>
                        </div>
                        <div className="productDetailCashSection">
                            <div className="productDetailCashSectionText">
                                <span>주문가격</span>
                            </div>
                            <div className="productDetailCash">
                                <span id="productDetailCash-Won">129,000원</span>
                            </div>
                        </div>
                        <div className="productDetailShoppingBtnSection">
                            <input type="button" value="장바구니" id="productDetailCartBtn"/>
                            <input type="button" value="바로구매" id="productDetailSellBtn"/>
                        </div>
                    </div>
                </div>

                <div className="productDetailMiddleBarSection">
                    <a href="" className="productDetailInfoText">상품정보</a>
                    <a href="" className="productDetailReviewText">리뷰</a>
                    <a href="" className="productDetailQnAText">문의</a>
                </div>
                <div className="productDetailInfoImgSection">
                    <img className="productDetailInfoImg"
                         src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/167866935762774317.jpg"
                         alt="제품 설명 이미지"/>
                    <br/>
                    <img className="productDetailInfoImg"
                         src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/169761005279793979.jpg"
                         alt="제품 설명 이미지"/>
                    <br/>
                    <img className="productDetailInfoImg"
                         src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/169761005279793979.jpg"
                         alt="제품 설명 이미지"/>
                    <br/>
                    <img className="productDetailInfoImg"
                         src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/169761005279793979.jpg"
                         alt="제품 설명 이미지"/>
                    <br/>
                    <img className="productDetailInfoImg"
                         src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/169761005279793979.jpg"
                         alt="제품 설명 이미지"/>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

