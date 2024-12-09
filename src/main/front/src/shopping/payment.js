import React, { useState } from 'react';
import axios from 'axios';
import css from '../css/payment.css';
import product_img from '../img/furniture.png';
import Header from "../header";

function Payment() {
    return(
        <div className="payment-body">
            <Header/>
            <section className="payment-main">
                <section className="payment-title-section">
                    <span>주문/결제</span>
                </section>
                <section className="payment-bill-section">
                    {/*주문상품*/}
                    <div className="payment-order-product-section">
                        <div className="payment-order-product">
                            <span className="payment-order-product-title">주문상품</span>
                            <span className="payment-order-product-count-title">1건</span>
                        </div>
                    </div>
                    <section className="payment-order-product-form-section">
                        <form action="" className="payment-order-product-form">
                            <div className="payment-order-product-form-content">
                                <div className="payment-order-product-detail-box">
                                    <div className="payment-order-product-store-box">
                                        <div className="payment-order-product-store-name">
                                            <span>어그리어블리</span>
                                        </div>
                                        <div className="payment-order-product-delivery-pay">
                                            <span className="payment-delivery-pay-title">배송비</span>
                                            <span className="payment-delivery-pay">100,000,000원</span>
                                        </div>
                                    </div>
                                    <div className="payment-order-product-box">
                                        <div className="payment-order-product-img-box">
                                            <img className="payment-product-img" src={product_img} alt=""/>
                                        </div>
                                        <div className="payment-order-product-detail">
                                            <div className="payment-order-product-name-box">
                                                <div className="payment-order-product-name">
                                                    <span>[당일출고] 노프레임 비정형 웨이브 전신거울 A-4 + 원목/실버 받침대 선택</span>
                                                </div>
                                            </div>
                                            <div className="payment-order-product-option-box">
                                                <div className="payment-order-product-option">
                                                    <span>Size: 2. 700*1700 (10시 이전 주문 시 당일 출고) / 받침대: 자작나무 원목 받침대</span>
                                                </div>
                                            </div>
                                            <div className="payment-order-product-cost-box">
                                                <div className="payment-order-product-cost"><span>129,000원</span></div>
                                                <div className="payment-order-product-count"><span>1개</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                    {/*주문상품 끝*/}
                    
                    {/*주문자*/}
                    <div className="payment-order-user-section">
                        <div className="payment-order-user">
                            <span className="payment-order-user-title">주문자</span>
                        </div>
                    </div>
                    <section className="payment-order-user-form-section">
                        <form action="" className="payment-order-user-form">
                            <div className="payment-order-user-form-content">
                                <div className="payment-order-user-name-box">
                                    <div className="payment-order-user-name-text"><span>이름</span></div>
                                    <div className="payment-order-user-name-input"><input name="user-name" type="text"/>
                                    </div>
                                </div>
                                <div className="payment-order-user-email-box">
                                    <div className="payment-order-user-email-text"><span>이메일</span></div>
                                    <div className="payment-order-user-email-input-box">
                                        <div className="payment-order-user-email-input"><input name="email"
                                                                                               type="text"/></div>
                                        <div className="payement-order-user-email-at"><span>@</span></div>
                                        <div className="payment-order-user-email-domain">
                                            <select name="domain" id="domain-select">
                                                <option value="직접입력">직접입력</option>
                                                <option value="naver.com">naver.com</option>
                                                <option value="daum.net">daum.net</option>
                                                <option value="gmail.com">gmail.com</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-order-user-phone-box">
                                    <div className="payment-order-user-phone"><span>휴대전화</span></div>
                                    <div className="payment-order-user-phone-input-box">
                                        <div className="payment-order-user-phone-id-num-input">
                                            <input name="phone-id-number" type="number" value="010"/>
                                        </div>
                                        <div className="payment-order-user-phone-dash-text"><span>-</span></div>
                                        <div className="payment-order-user-phone-serial-num-input">
                                            <input name="phone-serial-number" type="number"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                    {/*주문자 끝*/}
                    
                    {/*배송지*/}
                    <div className="payment-order-delivery-section">
                        <div className="payment-order-delivery">
                            <span className="payment-order-delivery-title">배송지</span>
                            <button className="payment-order-delivery-same-fill-btn">위와 동일하게 채우기</button>
                        </div>
                    </div>
                    <section className="payment-order-delivery-form-section">
                        <form action="" className="payment-order-delivery-form">
                            <div className="payment-order-delivery-content">
                                <div className="payment-order-delivery-destination-box">
                                    <div className="payment-order-user-destination-text"><span>배송지명</span></div>
                                    <div className="payment-order-user-destination-input"><input name="destination-name"
                                                                                                 type="text"/></div>
                                </div>
                                <div className="payment-order-delivery-name-box">
                                    <div className="payment-order-user-name-text"><span>받는 분</span></div>
                                    <div className="payment-order-user-name-input"><input name="delivery-name"
                                                                                          type="text"/></div>
                                </div>
                                <div className="payment-order-delivery-phone-box">
                                    <div className="payment-order-user-phone-text"><span>휴대전화</span></div>
                                    <div className="payment-order-user-phone-input-box">
                                        <div className="payment-order-user-phone-id-num-input">
                                            <input name="phone-id-number" type="number" value="010"/>
                                        </div>
                                        <div className="payment-order-user-phone-dash-text"><span>-</span></div>
                                        <div className="payment-order-user-phone-serial-num-input">
                                            <input name="phone-serial-number" type="number"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-order-delivery-address-box">
                                    <div className="payment-order-delivery-address-text"><span>주소</span></div>
                                    <div className="payment-order-delivery-address-input-box">
                                        <div className="payment-order-delivery-address-zipcode-box">
                                            <button className="payment-zipcode-search">주소 찾기</button>
                                            <input name="zipcode" type="text" readOnly/>
                                        </div>
                                        <div className="payment-order-delivery-address-main-box">
                                            <input name="main-address" type="text" readOnly/>
                                        </div>
                                        <div className="payment-order-delivery-address-detail-box">
                                            <input name="detail-address" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                    {/*배송지 끝*/}
                </section>
            </section>
        </div>
    );
}

export default Payment;