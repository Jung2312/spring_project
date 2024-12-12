import React, {useRef, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from "../header";
import css from '../css/purchaseHistory.css';

function PurchaseHistory() {
    const mainRef = useRef(null);

    const { payordernum } = useParams();  // URL에서 productnum 추출
    const [paymentData, setPaymentData] = useState([]);

    // 3자리마다 , 넣기
    const formatPrice = (price) => {
        return Number(price).toLocaleString('ko-KR');
    };

    // 결제번호로 상품 내용 가져오기
    useEffect(() => {
        console.log("Pay order number:", payordernum);
        // 해당 상품 정보를 fetch
        fetch(`http://localhost:80/payment/getPaymentDetails?payordernum=${payordernum}`)
            .then(res => res.json())
            .then(data => {
                console.log("API Response:", data);
                setPaymentData(data);
            })
            .catch(err => console.error('Fetch error:', err));
    }, [payordernum]);
    return(
        <div className="purchaseH-body" ref={mainRef}>
            <Header/>
            <div className="purchaseH-main-box">
                <div className="purchaseH-main">
                    <div className="purchaseH-history-box">
                        <div className="purchaseH-history-title"><span>주문/결제 내역</span></div>
                        {paymentData && paymentData.length > 0 ? (
                            <div className="purchaseH-history-content">
                                <div className="purchaseH-history-table">
                                    <div className="purchaseH-history-ordernum-box">
                                        <div className="purchaseH-history-ordernum-title purchaseH-table-item">
                                            <span>주문번호</span></div>
                                        <div className="purchaseH-history-ordernum purchaseH-table-item">
                                            <span>{paymentData[0].payordernum}</span></div>
                                    </div>
                                    <div className="purchaseH-history-purchase-state-box">
                                        <div className="purchaseH-history-purchase-state-title purchaseH-table-item">
                                            <span>현재구매상태</span></div>
                                        <div className="purchaseH-history-purchase-state purchaseH-table-item">
                                            <span>결제완료</span></div>
                                    </div>
                                    <div className="purchaseH-history-payment-box">
                                        <div className="purchaseH-history-payment-title purchaseH-table-item">
                                            <span>결제방식</span></div>
                                        <div className="purchaseH-history-payment purchaseH-table-item"><span>카드</span>
                                        </div>
                                    </div>
                                    <div className="purchaseH-history-order-date-box">
                                        <div className="purchaseH-history-order-date-title purchaseH-table-item">
                                            <span>결제일</span></div>
                                        <div className="purchaseH-history-order-date purchaseH-table-item">
                                            <span>{paymentData[0].paydate}</span></div>
                                    </div>
                                    <div className="purchaseH-history-product-name-box">
                                        <div className="purchaseH-history-product-name-title purchaseH-table-item">
                                            <span>상품</span></div>
                                        <div className="purchaseH-history-product-name purchaseH-table-item">
                                            <span>{paymentData[0].productname}</span></div>
                                        <div className="purchaseH-history-product-price-title purchaseH-table-item">
                                            <span>개수</span></div>
                                        <div className="purchaseH-history-product-price purchaseH-table-item">
                                            <span>{paymentData[0].payrepair}개</span></div>
                                    </div>
                                    <div className="purchaseH-history-product-price-title-box">
                                        <div className="purchaseH-history-product-price-title purchaseH-table-item">
                                            <span>금액</span></div>
                                        <div className="purchaseH-history-product-price purchaseH-table-item">
                                            <span>{formatPrice(paymentData[0].productprice)}원</span></div>
                                    </div>
                                    <div className="purchaseH-history-delivery-price-box">
                                        <div className="purchaseH-history-delivery-price-title purchaseH-table-item">
                                            <span>배송비</span></div>
                                        <div className="purchaseH-history-delivery-price purchaseH-table-item">
                                            <span>10,000원</span></div>
                                    </div>
                                    <div className="purchaseH-history-sale-price-box">
                                        <div className="purchaseH-history-sale-price-title purchaseH-table-item">
                                            <span>할인금액</span></div>
                                        <div className="purchaseH-history-sale-price purchaseH-table-item">
                                            <span>{formatPrice(Number(paymentData[0].productprice) - Number(paymentData[0].payprice))}원</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="purchaseH-history-total-price-box">
                                    <div className="purchaseH-history-total-price-title"><span>총 금액</span></div>
                                    <div className="purchaseH-history-total-price">
                                        <span>{formatPrice(paymentData[0].payprice)}원</span></div>
                                </div>
                            </div>
                        ) : (
                            <div>결제 내역을 불러오는 중...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseHistory;