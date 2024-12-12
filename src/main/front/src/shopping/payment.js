import React, {useEffect, useRef, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import css from '../css/payment.css';
import Header from "../header";
import DaumPostCode from "react-daum-postcode";
import Modal from "react-modal";
import product_img from '../img/furniture.png';
import card_img from '../img/card_img.png';

function Payment() {
    const navigate = useNavigate();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

    const [zipcode, setZipcode] = useState("");
    const [mainAddress, setMainAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(""); // 결제 수단 선택 상태

    const { productnum } = useParams();  // URL에서 productnum 추출
    const [productData, setProductData] = useState([]);
    const [Count, setCount] = useState(1); // 수량

    const [isAllAgreeChecked, setIsAllAgreeChecked] = useState(false);
    const [isAgreeChecked, setIsAgreeChecked] = useState(false);

    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState("");
    const [domain, setDomain] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("직접입력");

    const [couponList, setCouponList] = useState([]); // 쿠폰 목록
    const [selectedCoupon, setSelectedCoupon] = useState(null); // 선택된 쿠폰 정보

    const [mileage, setMileage] = useState(0); // 유저 마일리지
    const [inputMileage, setInputMileage] = useState(0); // 입력된 마일리지 값

    const mainRef = useRef(null);

    // 페이지 마운트 시 기본적으로 mainRef 위치로 이동
    useEffect(() => {
        mainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // 서버에서 사용자 데이터 가져옴
    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        fetch(`http://localhost:80/user/info?userid=${userid}`) // Spring Boot API URL
            .then(res => res.json())
            .then(data => {
                setUserData(data);
                // 이메일 초기 값 나누어 설정
                const [emailPart, domainPart] = data.email.split("@");
                setEmail(emailPart);
                setDomain(domainPart);
            })
            .catch(err => console.error('Fetch error: ', err));
    }, []);

    // select box 변경 핸들러
    const handleDomainSelectChange = (e) => {
        const value = e.target.value;
        setSelectedDomain(value);

        if (value === "직접입력") {
            setDomain(""); // 직접 입력 선택 시 공란
        } else {
            setDomain(value); // 선택된 옵션 값
        }
    };

    // domain input 변경 핸들러
    const handleDomainInputChange = (e) => {
        setDomain(e.target.value);
        setSelectedDomain("직접입력"); // 사용자가 직접 입력하면 select는 "직접입력"으로 변경
    };

    // 결제 수단 선택 클릭 처리
    const handlePaymentMethodClick = (method) => {
        // 이미 선택된 결제 수단이 클릭되면 선택을 취소 (null로 설정)
        if (paymentMethod === method) {
            setPaymentMethod(null);
        } else {
            setPaymentMethod(method); // 새로운 결제 수단을 선택
        }
    };

    // 체크박스 변경 핸들러
    const handleAllAgreeChange = () => {
        const newState = !isAllAgreeChecked;
        setIsAllAgreeChecked(newState);
        setIsAgreeChecked(newState); // 모든 체크박스를 동일하게 설정
    };

    const handleAgreeChange = () => {
        const newState = !isAgreeChecked;
        setIsAgreeChecked(newState);

        // 두 번째 체크박스가 변경되면 '모두 동의' 체크박스도 동기화
        if (!newState) {
            setIsAllAgreeChecked(false); // 하나라도 체크 해제되면 '모두 동의' 체크 해제
        } else {
            setIsAllAgreeChecked(true); // 모두 체크된 경우 '모두 동의'도 체크
        }
    };

    // 주소 찾기 css
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

    // input에 주소 넣기
    const handleAddressComplete = (data) => {
        setZipcode(data.zonecode); // 우편번호 설정
        setMainAddress(data.roadAddress || data.jibunAddress); // 주소 설정
        setIsAddressModalOpen(false); // 모달 닫기
    };

    // modal open handler
    const handleAdressModalOpen = (e) => {
        e.preventDefault();
        setIsAddressModalOpen(true); // 모달 열기
    };

    // 아임포트 결제 창 열기
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, []);

    // 아임포트 결제, 데이터 삽입
    const handleCardPayment = () => {
        const IMP = window.IMP; // 아임포트 결제 객체
        IMP.init("imp32370223"); // 아임포트에 발급받은 키 사용
        const userid = sessionStorage.getItem("userid");

        IMP.request_pay({
            pg: 'html5_inicis.INIpayTest',
            pay_method: 'card',
            merchant_uid: `${new Date().getTime()}`.slice(0, 10),
            name: productData.productname,
            amount: 100, // 결제 금액
            buyer_email: userData.email,
            buyer_name: userData.name,
            buyer_tel: userData.phone,
            buyer_addr: userData.address,
            buyer_postcode: userData.postcode,
        }, function(rsp) {
            if (rsp.success) {
                alert("결제가 완료되었습니다.");

                // 결제 정보를 서버로 전달
                const paymentData = {
                    payordernum: rsp.merchant_uid, // 주문 번호 
                    userid: userid, // 사용자 ID
                    productnum: productData.productnum, // 상품 번호
                    payprice: rsp.paid_amount, // 결제 금액
                    payrepair: Count, // 구매한 개수
                    paydate: new Date().toISOString().slice(0, 10) // 결제 날짜 (현재 시간)
                };

                // 서버로 결제 정보 전송 (axios 사용 예시)
                axios.post('http://localhost:80/payment/create', paymentData)
                    .then(response => {
                        console.log("결제 정보 저장 성공:", response);
                        navigate(`/purchaseHistory/${paymentData.payordernum}`);
                    })
                    .catch(error => {
                        alert(paymentData);
                        console.error("결제 정보 저장 실패:", error);
                        alert("결제 정보를 저장하는 데 실패했습니다.");
                    });

            } else {
                alert("결제 실패: " + rsp.error_msg);
            }
        });
    };


    // 상품번호로 상품 내용 가져오기
    useEffect(() => {
        // 해당 상품 정보를 fetch
        fetch(`http://localhost:80/product/productDetail?productnum=${productnum}`)
            .then(res => res.json())
            .then(data => setProductData(data))
            .catch(err => console.error('Fetch error:', err));
    }, [productnum]);

    // 3자리마다 , 넣기
    const formatPrice = (price) => {
        return Number(price).toLocaleString('ko-KR');
    };

    // 총 결제 금액
    const calculateTotalPayment = () => {
        const deliveryCost = 2500; // 배송비

        const mileageDiscount = inputMileage; // 마일리지 할인
        let price = productData.productprice * Count + deliveryCost - mileageDiscount;

        if(selectedCoupon != null){
            price = price - selectedCoupon.couponprice; // 쿠폰 할인
        }

        return price;
    };

    // 소지한 쿠폰 가져오기
    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        fetch(`http://localhost:80/couponhistory/couponlist?userid=${userid}`) // Spring Boot API URL
            .then(res => res.json())
            .then(data => setCouponList(data))
            .catch(err => console.error('Fetch error: ', err));
    }, []);

    // 쿠폰 사용 버튼 클릭 핸들러
    const handleCouponUse = (coupon) => {
        setSelectedCoupon(coupon); // 선택된 쿠폰 저장
        setIsCouponModalOpen(false); // 모달 닫기
    };

    // 쿠폰 취소 버튼 클릭 핸들러
    const handleCouponCancel = () => {
        setSelectedCoupon(null); // 선택된 쿠폰 초기화
    };

    // 마일리지 가져오기
    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        fetch(`http://localhost:80/mileage/mileageCount?userid=${userid}`) // Spring Boot API URL
            .then(res => res.json())
            .then(data => setMileage(data))
            .catch(err => console.error('Fetch error: ', err));
    }, []);

    // 입력 값 변경 핸들러
    const handleMileageInput = (e) => {
        const inputValue = e.target.value;

        // 입력된 값이 0 이상이고 사용 가능한 마일리지보다 크지 않으면 입력값을 업데이트
        if (inputValue >= 0 && inputValue <= mileage) {
            setInputMileage(inputValue);
        }
    };

    // "전체 사용" 버튼 클릭 핸들러
    const handleUseAllMileage = () => {
        setInputMileage(mileage); // 전체 사용 시 사용 가능한 마일리지 값을 입력란에 넣기
    };
    
    return(
        <div className="payment-body" ref={mainRef}>
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
                                                <span>{productData.storename}</span>
                                            </div>
                                            <div className="payment-order-product-delivery-pay">
                                                <span className="payment-delivery-pay-title">배송비</span>
                                                <span className="payment-delivery-pay">2,500원</span>
                                            </div>
                                        </div>
                                        <div className="payment-order-product-box">
                                            <div className="payment-order-product-img-box">
                                                <img className="payment-product-img" src={productData.productmainimage} alt=""/>
                                            </div>
                                            <div className="payment-order-product-detail">
                                                <div className="payment-order-product-name-box">
                                                    <div className="payment-order-product-name">
                                                        <span>{productData.productname}</span>
                                                    </div>
                                                </div>
                                                <div className="payment-order-product-option-box">
                                                    <div className="payment-order-product-option">
                                                        <span></span>
                                                    </div>
                                                </div>
                                                <div className="payment-order-product-cost-box">
                                                    <div className="payment-order-product-cost"><span>{formatPrice(productData.productprice * Count)}원</span>
                                                    </div>
                                                    <div className="payment-order-product-count"><span>{Count}개</span></div>
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
                                        <div className="payment-order-user-name-input">
                                            <input name="user-name" type="text" value={userData.name} readOnly/>
                                        </div>
                                    </div>
                                    <div className="payment-order-user-email-box">
                                        <div className="payment-order-user-email-text"><span>이메일</span></div>
                                        <div className="payment-order-user-email-input-box">
                                            <div className="payment-order-user-email-input">
                                                <input name="email"
                                                       type="text"
                                                       value={email}
                                                       onChange={(e) => setEmail(e.target.value)}
                                                       readOnly/>
                                            </div>
                                            <div className="payement-order-user-email-at"><span>@</span></div>
                                            <div className="payment-order-user-email-domain-input">
                                                <input name="domain"
                                                       type="text"
                                                       value={domain}
                                                       onChange={handleDomainInputChange}
                                                       disabled={selectedDomain !== "직접입력"} // 직접 입력 선택 시만 활성화
                                                />
                                            </div>
                                            <div className="payment-order-user-email-domain">
                                                <select name="domain-select"
                                                        id="domain-select"
                                                        value={selectedDomain}
                                                        onChange={handleDomainSelectChange}>
                                                    <option value="직접입력">직접입력</option>
                                                    <option value="naver.com">naver.com</option>
                                                    <option value="daum.net">daum.net</option>
                                                    <option value="gmail.com">gmail.com</option>
                                                    <option value="nate.com">nate.com</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="payment-order-user-phone-box">
                                        <div className="payment-order-user-phone-text"><span>휴대전화</span></div>
                                        <div className="payment-order-user-phone-input-box">
                                            <div className="payment-order-user-phone-id-num-input">
                                                <input name="phone-number"
                                                       type="number"
                                                       value={userData.phone}
                                                       readOnly
                                                />
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
                                                <input name="phone-number" type="number"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="payment-order-delivery-address-box">
                                        <div className="payment-order-delivery-address-text"><span>주소</span></div>
                                        <div className="payment-order-delivery-address-input-box">
                                            <div className="payment-order-delivery-address-zipcode-box">
                                                <button className="payment-zipcode-search"
                                                        onClick={handleAdressModalOpen}>주소 찾기
                                                </button>
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
                            {selectedCoupon ? (
                                <div className="payment-order-coupon-content">
                                    <div className="payment-order-coupon-box">
                                        <div className="payment-coupon-detail">
                                            <div className="payment-order-coupon-sale-cost">
                                                <span>{formatPrice(selectedCoupon.couponprice)}원</span>
                                            </div>
                                            <div className="payment-order-coupon-received-from">
                                                <span>[{selectedCoupon.couponname}]</span>
                                            </div>
                                            <div className="payment-order-coupon-use-condition">
                                                <span>최소 주문 금액 {formatPrice(selectedCoupon.useminprice)}원</span>
                                            </div>
                                        </div>
                                        <div className="payment-coupon-cancel-btn-box">
                                            <button
                                                className="payment-coupon-cancel-btn"
                                                onClick={handleCouponCancel}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>선택된 쿠폰이 없습니다.</div>
                            )}
                        </section>
                        {/*쿠폰 끝*/}

                        {/*마일리지*/}
                        <div className="payment-order-mileage-section">
                            <div className="payment-order-mileage">
                                <span className="payment-order-mileage-title">마일리지</span>
                                <span className="payment-order-mileage-sub-title" style={{color: '#7D7D7D'}}>3만원 이상 구매 시 사용할 수 있어요.(배송비 제외)</span>
                            </div>
                        </div>
                        <section className="payment-order-mileage-form-section">
                            <div className="payment-order-mileage-content">
                                <div className="payment-order-mileage-box">
                                    <div className="payment-order-mileage-input-box">
                                        <input name="payment-mileage"
                                               type="number"
                                               value={formatPrice(inputMileage)}
                                               onChange={handleMileageInput}
                                        />
                                    </div>
                                    <div className="payment-order-mileage-use-all-btn-box">
                                        <button className="payment-order-mileage-use-all-btn" onClick={handleUseAllMileage}>전체 사용</button>
                                    </div>
                                </div>
                                <div className="payment-order-mileage-available-box">
                                    <div className="payment-order-mileage-available"><span>사용 가능 포인트 {(mileage-inputMileage)} P</span></div>
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
                                        <button className={`payment-order-pay-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                                                onClick={() => handlePaymentMethodClick('card')}>
                                            <span>카드</span>
                                            <img src={card_img}/>
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
                        <DaumPostCode onComplete={handleAddressComplete} height="100%"/>
                    </Modal>

                    {/*쿠폰 사용 모달*/}
                    <Modal isOpen={isCouponModalOpen} style={couponModalStyle}
                           onRequestClose={() => setIsCouponModalOpen(false)}>
                        <section className="payment-coupon-modal-section">
                            <div className="payment-coupon-modal-title"><span>보유 중인 쿠폰</span></div>

                            {couponList.length > 0 ? (
                                couponList.map((coupon, index) => {
                                    // 최소 사용 금액과 상품 금액을 비교하여 사용 가능한지 체크
                                    const isCouponAvailable = coupon.useminprice <= productData.productprice;

                                    return (
                                        <div key={index} className="payment-coupon-modal-content">
                                            <div className="payment-coupon-modal-box">
                                                <div className="payment-coupon-modal-sale-cost">
                                                    <span>{formatPrice(coupon.couponprice)}원</span>
                                                </div>
                                                <div className="payment-coupon-modal-received-from">
                                                    <span>[{coupon.couponname}]</span>
                                                </div>
                                                <div className="payment-coupon-modal-use-condition">
                                                    <span>최소 주문 금액 {formatPrice(coupon.useminprice)}원</span>
                                                </div>
                                            </div>
                                            <div className="payment-coupon-modal-use-btn-box">
                                                <button
                                                    className={`payment-coupon-modal-use-btn ${isCouponAvailable ? '' : 'disabled'}`}  // 조건에 따라 클래스 추가
                                                    onClick={() => isCouponAvailable && handleCouponUse(coupon)}  // 사용 가능 시만 클릭
                                                    disabled={!isCouponAvailable}  // 조건에 맞지 않으면 비활성화
                                                >
                                                    {isCouponAvailable ? '사용하기' : '사용불가'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div>사용 가능한 쿠폰이 없습니다.</div>
                            )}
                        </section>
                    </Modal>
                </section>
                <aside className="payment-total-cost-section">
                    <div className="payment-total-cost-bill">
                        <div className="payment-total-cost-title"><span>결제금액</span></div>
                        <div className="payment-total-cost-bill-box">
                            <div className="payment-total-product-cost-box">
                                <div className="payment-total-product-cost-text"><span>총 상품금액</span></div>
                                <div className="payment-total-product-cost">{formatPrice(productData.productprice * Count)}원</div>
                            </div>
                            <div className="payment-total-delivery-cost-box">
                                <div className="payment-total-delivery-cost-text"><span>총 배송비</span></div>
                                <div className="payment-total-delivery-cost">{formatPrice(2500)}원</div>
                            </div>
                            <div className="payment-total-coupon-cost-box">
                                <div className="payment-total-coupon-cost-text"><span>쿠폰 적용</span></div>
                                <div className="payment-total-coupon-cost">{selectedCoupon ? formatPrice(selectedCoupon.couponprice) : '0'}원</div>
                            </div>
                            <div className="payment-total-mileage-cost-box">
                                <div className="payment-total-mileage-cost-text"><span>마일리지 적용</span></div>
                                <div className="payment-total-mileage-cost">{formatPrice(inputMileage)}원</div>
                            </div>
                        </div>
                        <div className="payment-total-cost-box">
                            <div className="payment-total-cost-text"><span>최종 결제 금액</span></div>
                            <div className="payment-total-cost"><span>{formatPrice(calculateTotalPayment())}원</span></div>
                        </div>
                        <div className="payment-personal-info-box">
                            <div className="payment-personal-info-all-agree-box">
                                <input name="payment-all-agree-chk"
                                       type="checkbox"
                                       checked={isAllAgreeChecked}
                                       onChange={handleAllAgreeChange} />
                                <span>아래 내용에 모두 동의합니다.(필수)</span>
                            </div>
                            <div className="payment-personal-info-agree-box">
                                <div className="payment-personal-info-agree">
                                    <input name="payment-agree-chk"
                                           type="checkbox"
                                           checked={isAllAgreeChecked}
                                           onChange={handleAllAgreeChange} />
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
                        <button className="payment-btn"
                                onClick={paymentMethod === 'card' ? handleCardPayment : null}>
                            {formatPrice(calculateTotalPayment())}원 결제하기
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Payment;