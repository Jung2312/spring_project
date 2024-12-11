import React, { useState } from 'react';
import axios from 'axios';
import css from '../css/payment.css';
import product_img from '../img/furniture.png';
import card_img from '../img/card_img.png';
import kakaopay_img from '../img/payment_icon_yellow_small.png';
import Header from "../header";
import DaumPostCode from "react-daum-postcode";
import Modal from "react-modal";

function Payment() {
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [zipcode, setZipcode] = useState("");
    const [mainAddress, setMainAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
        },
        content: {
            margin: 'auto',
            width: '600px',
            height: '400px',
            padding: '0',
            overflow: 'hidden',
        },
    };

    const couponModalStyle = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
        },
        content:{
            margin: 'auto',
            width: '600px',
            height: 'auto',
            padding: '30px'
        },
    };

    const handleAddressComplete = (data) => {
        setZipcode(data.zonecode); // 우편번호 설정
        setMainAddress(data.roadAddress || data.jibunAddress); // 주소 설정
        setIsAddressModalOpen(false); // 모달 닫기
    };

    const handleAdressModalOpen = (e) => {
        e.preventDefault();
        setIsAddressModalOpen(true); // 모달 열기
    };
    return(
        <div className="payment-body">
            <Header/>
            <div className="payment-main-box">
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
                            <form method="post" action="" className="payment-order-product-form">
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
                                </div>
                            </form>
                        </section>
                        {/*주문자 끝*/}

                        {/*배송지*/}
                        <div className="payment-order-delivery-section">
                            <div className="payment-order-delivery">
                                <span className="payment-order-delivery-title">배송지</span>
                                <button className="payment-order-delivery-same-fill-btn">내 정보 불러오기</button>
                            </div>
                        </div>
                        <section className="payment-order-delivery-form-section">
                            <div className="payment-order-delivery-form">
                                <div className="payment-order-delivery-content">
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
                                                <button className="payment-zipcode-search"
                                                        onClick={handleAdressModalOpen}>주소 찾기</button>
                                                <input name="zipcode"
                                                       type="text"
                                                       value={zipcode}
                                                       readOnly/>
                                            </div>
                                            <div className="payment-order-delivery-address-main-box">
                                                <input name="main-address"
                                                       type="text"
                                                       value={mainAddress}
                                                       readOnly/>
                                            </div>
                                            <div className="payment-order-delivery-address-detail-box">
                                                <input name="detail-address"
                                                       type="text"
                                                       value={detailAddress}
                                                       onChange={(e) => setDetailAddress(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/*배송지 끝*/}

                        {/*쿠폰*/}
                        <div className="payment-order-coupon-section">
                            <div className="payment-order-coupon">
                                <span className="payment-order-coupon-title">쿠폰</span>
                                <button className="payment-order-coupon-btn"
                                        onClick={() => setIsCouponModalOpen(true)}>
                                    쿠폰 사용
                                </button>
                            </div>
                        </div>
                        <section className="payment-order-coupon-form-section">
                            <div className="payment-order-coupon-content">
                                <div className="payment-order-coupon-box">
                                    <div className="payment-coupon-detail">
                                        <div className="payment-order-coupon-sale-cost"><span>3,000원</span></div>
                                        <div className="payment-order-coupon-received-from"><span>[겨울 맞이 포근한 집 콘테스트]</span></div>
                                        <div className="payment-order-coupon-use-condition"><span>최소 주문 금액 100,000원</span></div>
                                    </div>
                                    <div className="payment-coupon-cancel-btn-box">
                                        <button className="payment-coupon-cancel-btn">X</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/*쿠폰 끝*/}

                        {/*마일리지*/}
                        <div className="payment-order-miliage-section">
                            <div className="payment-order-miliage">
                                <span className="payment-order-miliage-title">마일리지</span>
                                <span className="payment-order-miliage-sub-title" style={{color: '#7D7D7D'}}>3만원 이상 구매 시 사용할 수 있어요.(배송비 제외)</span>
                            </div>
                        </div>
                        <section className="payment-order-miliage-form-section">
                            <div className="payment-order-miliage-content">
                                <div className="payment-order-miliage-box">
                                    <div className="payment-order-miliage-input-box">
                                        <input name="payment-miliage" type="text" value="0"/>
                                    </div>
                                    <div className="payment-order-miliage-use-all-btn-box">
                                        <button className="payment-order-miliage-use-all-btn">전체 사용</button>
                                    </div>
                                </div>
                                <div className="payment-order-miliage-available-box">
                                    <div className="payment-order-miliage-available"><span>사용 가능 포인트 0 P</span></div>
                                </div>
                            </div>
                        </section>
                        {/*마일리지 끝*/}

                        {/*결제수단*/}
                        <div className="payment-order-pay-section">
                            <div className="payment-order-pay">
                                <span className="payment-order-pay-title">결제수단</span>
                            </div>
                        </div>
                        <section className="payment-order-pay-form-section">
                            <div className="payment-order-pay-content">
                                <div className="payment-order-pay-box">
                                    <div className="payment-order-pay-card-box">
                                        <button className="payment-order-pay-card">
                                            <span>카드</span>
                                            <img src={card_img}/>
                                        </button>
                                        <button className="payment-order-pay-kakaopay">
                                            <span>카카오페이</span>
                                            <img src={kakaopay_img}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/*결제수단 끝*/}
                    </section>
                    {/*주소 찾기 모달*/}
                    <Modal isOpen={isAddressModalOpen} style={customStyles}
                           onRequestClose={() => setIsAddressModalOpen(false)}>
                        <DaumPostCode onComplete={handleAddressComplete} height="100%" />
                    </Modal>

                    {/*쿠폰 사용 모달*/}
                    <Modal isOpen={isCouponModalOpen} style={couponModalStyle} onRequestClose={() => setIsCouponModalOpen(false)}>
                        <section className="payment-coupon-modal-section">
                            <div className="payment-coupon-modal-title"><span>사용 가능한 쿠폰</span></div>
                            <div className="payment-coupon-modal-content">
                                <div className="payment-coupon-modal-box">
                                    <div className="payment-coupon-modal-sale-cost"><span>3,000원</span></div>
                                    <div className="payment-coupon-modal-received-from"><span>[겨울 맞이 포근한 집 콘테스트]</span>
                                    </div>
                                    <div className="payment-coupon-modal-use-condition"><span>최소 주문 금액 100,000원</span></div>
                                </div>
                                <div className="payment-coupon-modal-use-btn-box">
                                    <button className="payment-coupon-modal-use-btn">사용하기</button>
                                </div>
                            </div>
                            <div className="payment-coupon-modal-content">
                                <div className="payment-coupon-modal-box">
                                    <div className="payment-coupon-modal-sale-cost"><span>3,000원</span></div>
                                    <div className="payment-coupon-modal-received-from"><span>[겨울 맞이 포근한 집 콘테스트]</span>
                                    </div>
                                    <div className="payment-coupon-modal-use-condition"><span>최소 주문 금액 100,000원</span></div>
                                </div>
                                <div className="payment-coupon-modal-use-btn-box">
                                    <button className="payment-coupon-modal-use-btn">사용하기</button>
                                </div>
                            </div>
                        </section>
                    </Modal>
                </section>
                <aside className="payment-total-cost-section">
                    <div className="payment-total-cost-bill">
                        <div className="payment-total-cost-title"><span>결제금액</span></div>
                        <div className="payment-total-cost-bill-box">
                            <div className="payment-total-product-cost-box">
                                <div className="payment-total-product-cost-text"><span>총 상품금액</span></div>
                                <div className="payment-total-product-cost">129,000원</div>
                            </div>
                            <div className="payment-total-delivery-cost-box">
                                <div className="payment-total-delivery-cost-text"><span>총 배송비</span></div>
                                <div className="payment-total-delivery-cost">1.000,000원</div>
                            </div>
                            <div className="payment-total-coupon-cost-box">
                                <div className="payment-total-coupon-cost-text"><span>쿠폰 적용</span></div>
                                <div className="payment-total-coupon-cost">3,000원</div>
                            </div>
                            <div className="payment-total-miliage-cost-box">
                                <div className="payment-total-miliage-cost-text"><span>마일리지 적용</span></div>
                                <div className="payment-total-miliage-cost">0원</div>
                            </div>
                        </div>
                        <div className="payment-total-cost-box">
                            <div className="payment-total-cost-text"><span>최종 결제 금액</span></div>
                            <div className="payment-total-cost"><span>1,129,000원</span></div>
                        </div>
                        <div className="payment-personal-info-box">
                            <div className="payment-personal-info-all-agree-box">
                                <input name="payment-all-agree-chk" type="checkbox"/>
                                <span>아래 내용에 모두 동의합니다.(필수)</span>
                            </div>
                            <div className="payment-personal-info-agree-box">
                                <div className="payment-personal-info-agree">
                                    <input name="payment-agree-chk" type="checkbox"/>
                                    <span>개인 정보 수집 이용 및 제 3자 제공 동의(필수)</span>
                                </div>
                                <div className="payment-personal-info-content">
                                    <span>
                                        본인은 만 14세 이상이며, 주문 내용을 확인하였습니다. 통신판매중개사이므로 거래 당사자가 아니므로, 판매자가 등록한 상품 정보 및 거래 등에 대한 책임을 지지 않습니다.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-btn-section">
                        <button className="payment-btn">1,129,000원 결제하기</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Payment;