import React, {useRef, useEffect, useState} from 'react';
import Header from "../header";
import css from '../css/purchaseHistory.css';

function PurchaseHistory() {
    return(
        <div className="purchaseH-body">
            <Header/>
            <div className="purchaseH-main-box">
                <div className="purchaseH-main">
                    <div className="purchaseH-history-box">
                        <div className="purchaseH-history-title"><span>주문/결제 내역</span></div>
                        <div className="purchaseH-history-content">
                            <div className="purchaseH-history-table">
                                <div className="purchaseH-history-ordernum-box">
                                    <div className="purchaseH-history-ordernum-title purchaseH-table-item"><span>주문번호</span></div>
                                    <div className="purchaseH-history-ordernum purchaseH-table-item"><span>1</span></div>
                                </div>
                                <div className="purchaseH-history-purchase-state-box">
                                    <div className="purchaseH-history-purchase-state-title purchaseH-table-item"><span>현재구매상태</span></div>
                                    <div className="purchaseH-history-purchase-state purchaseH-table-item"><span>결제완료</span></div>
                                </div>
                                <div className="purchaseH-history-payment-box">
                                    <div className="purchaseH-history-payment-title purchaseH-table-item"><span>결제방식</span></div>
                                    <div className="purchaseH-history-payment purchaseH-table-item"><span>카드</span></div>
                                </div>
                                <div className="purchaseH-history-order-date-box">
                                    <div className="purchaseH-history-order-date-title purchaseH-table-item"><span>결제일</span></div>
                                    <div className="purchaseH-history-order-date purchaseH-table-item"><span>2024.12.12</span></div>
                                </div>
                                <div className="purchaseH-history-product-name-box">
                                    <div className="purchaseH-history-product-name-title purchaseH-table-item"><span>상품</span></div>
                                    <div className="purchaseH-history-product-name purchaseH-table-item"><span>받침대: 자작나무 원목 받침대</span></div>
                                    <div className="purchaseH-history-product-price-title purchaseH-table-item"><span>개수</span></div>
                                    <div className="purchaseH-history-product-price purchaseH-table-item"><span>1개</span></div>
                                </div>
                                <div className="purchaseH-history-product-price-title-box">
                                    <div className="purchaseH-history-product-price-title purchaseH-table-item"><span>금액</span></div>
                                    <div className="purchaseH-history-product-price purchaseH-table-item"><span>129,000원</span></div>
                                </div>
                                <div className="purchaseH-history-delivery-price-box">
                                    <div className="purchaseH-history-delivery-price-title purchaseH-table-item">
                                        <span>배송비</span></div>
                                    <div className="purchaseH-history-delivery-price purchaseH-table-item"><span>10,000원</span></div>
                                </div>
                                <div className="purchaseH-history-sale-price-box">
                                    <div className="purchaseH-history-sale-price-title purchaseH-table-item"><span>할인금액</span></div>
                                    <div className="purchaseH-history-sale-price purchaseH-table-item"><span>3,000원</span></div>
                                </div>
                            </div>
                            <div className="purchaseH-history-total-price-box">
                                <div className="purchaseH-history-total-price-title"><span>총 금액</span></div>
                                <div className="purchaseH-history-total-price"><span>136,000원</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseHistory;