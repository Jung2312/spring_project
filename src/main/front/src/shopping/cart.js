import React from 'react';
import product from '../img/exProfile.png'
import '../css/shopping.css';
import Header from "../header";

function Cart() {
    return (
        <div className="payment-body">
            <Header/>
        <div className="purchase-container">
            <div className="product-section">
                <div className="product-info">
                    <div className="product-image"><img src={product} alt="product"/></div>
                    <div className="sp-name">
                        <div className="store-name">어그리어블리</div>
                        <div className="product-name">[당일출고] 노프레임 비정형 웨이브 전신거울 A-4 + 원목/실버 받침대 선택</div>
                    </div>
                </div>
                <div className="product-detail">
                    <div>Size: 2. 700×1700 (10시 이전 주문 시 당일 출고) / 받침대: 자작나무 원목 받침대</div>
                    <div className="quantity-control">
                        <div>
                            <button className="down" onClick=""> - </button>
                            1{/* 수량 */}
                            <button className="up" onClick=""> + </button>
                        </div>
                        <div className="product-price">129,000원</div>
                    </div>
                </div>
                <div className="product-price">129,000원</div>
            </div>
            <div className="summary-section">
                <div className="summary-item">
                    <span>총 상품금액</span>
                    <span>129,000원</span>
                </div>
                <div className="summary-item">
                    <span>총 배송비</span>
                    <span>+ 10,000원</span>
                </div>
                <div className="total-payment">
                    <span>결제금액</span>
                    <span>1,029,000원</span>
                </div>
                <button className="purchase-button" onClick="">
                    상품 구매하기
                </button>
            </div>
        </div>
        </div>
    );
}

export default Cart;

