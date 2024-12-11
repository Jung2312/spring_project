import React, {useRef, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import '../css/shopping.css';
import star from '../img/star.png';
import storeIcon from '../img/store.png';
import photoIcon from '../img/photoIcon.png';
import whiteStar from '../img/whiteStar.svg';
import blueStar from '../img/blueStar.svg';
import Header from '../header.js'
import Modal from 'react-modal';

function ProductDetail() {
    const navigate = useNavigate();
    const { productnum } = useParams(); // URL에서 storename 파라미터 추출
    Modal.setAppElement('#root');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productData, setProductData] = useState([]);
    const [productImgData, setProductImgData] = useState([]);
    const [productDetailData, setProductDetailData] = useState([]);
    const [productReviewData, setProductReviewData] = useState([]);
    const [productAllReviewsData, setProductAllReviewsData] = useState([]);
    const [count, setCount] = useState(1);

    const mainRef = useRef(null);
    const productInfoRef = useRef(null);
    const reviewRef = useRef(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const userid = sessionStorage.getItem('userid');

    // 스크롤 이동 함수
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // 별점 기본값 설정
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    // 별점 변경 함수
    const starScore = index => {
        let star = [...clicked];
        for (let i = 0; i < 5; i++) {
            star[i] = i <= index ? true : false;
        }
        setClicked(star);
    };

    // 별점 데이터
    const rating = 3; // 별점 데이터
    const maxStars = 5; // 최대 별 개수


    const handleBrandHomeClick = () => {
        const storename = productData.storename;
        navigate(`/shoppingInformation/${storename}`);
    };

    useEffect(() => {
        fetch(`http://localhost:80/product/productDetail?productnum=${productnum}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                setProductData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setProductData('Error fetching data');
            });
    }, []);


    useEffect(() => {
        fetch(`http://localhost:80/review/statistics?productnum=${productnum}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                setProductReviewData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setProductReviewData('Error fetching data');
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:80/productimage?productnum=${productnum}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                setProductImgData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setProductImgData('Error fetching data');
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:80/productdetails?productnum=${productnum}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                setProductDetailData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setProductDetailData('Error fetching data');
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:80/review?productnum=${productnum}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                setProductAllReviewsData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setProductAllReviewsData('Error fetching data');
            });
    }, []);

    // 숫자를 콤마 형식으로 변환하는 함수
    const formatNumberWithCommas = (number) => {
        if (typeof number !== "number") {
            return "0"; // 기본값 설정
        }
        return number.toLocaleString("ko-KR");
    };

    const handleDecrease = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const handleIncrease = () => {
        if (count < productData.inventorycount) {
            setCount(prevCount => prevCount + 1);
        }else if(count === productData.inventorycount){
            alert(`${productData.inventorycount}개 이상 주문할 수 없는 상품입니다.`)
        }
    };

    const appendCart = async () => {

        if(!userid){
            alert("로그인을 진행하세요.");
            navigate('/login');
            return;
        }

        // 폼 전송을 위한 생성
        const formData = new FormData();
        formData.append("userid", userid);
        formData.append("productnum", productData.productnum);
        formData.append("cartrepair", count);

        try {
            const response = await fetch("http://localhost:80/cart/addOrUpdate", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("장바구니에 담았습니다.");
            } else {
                throw new Error("다시 담아주세요.");
            }
        } catch (err) {
            console.error(err);
            alert("다시 담아주세요.");
        }

    }

    return (
        <div>
            <Header/>
            <div className="productDetailcontainer">

                <div className="productDetailsection">
                    <div className="productDetailInfo">
                        <div className="productDetailImgSection productDetailInfo-item">
                            <div>
                                {productImgData.map((productImgData) => (
                                    <div className="productDetailsectionImg" key={productImgData.productimagenum}>
                                        <img
                                            src={productImgData.productimage}
                                            alt="제품 이미지"/>
                                    </div>
                                ))}
                            </div>

                            {productData && (
                            <div className="productDetailMainImg">
                                <img className="productPageImg"
                                     src={productData.productmainimage}
                                     alt="제품 이미지"/>
                            </div>
                            )}

                        </div>
                        {productData && (
                        <div className="productDetailsectionText productDetailInfo-item">
                            <div className="productDetailShopInfoSection">
                                <div className="productDetailNameSection">
                                    <h2 className="productDetailName">{productData.storename}</h2>
                                </div>
                                <div>
                                    <p className="productDetailText">{productData.productname}</p>
                                </div>
                                <div className="productDetailReviewSection">
                                    <div className="productDetailSectionSmallImgBox">
                                        <div className="reviewItem">
                                            <div className="productDetailSectionSmallImgBox">
                                                {Array.from({ length: maxStars }).map((_, starIndex) => (
                                                    <img
                                                        key={starIndex}
                                                        className="productDetailSectionSmallImg"
                                                        src={starIndex < productReviewData.averagerating ? blueStar : whiteStar}
                                                        alt="starIcon"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productDetailReviewCntBox">
                                        <span className="productDetailReviewCnt">{formatNumberWithCommas(productReviewData.reviewcount)}개 리뷰</span>
                                    </div>
                                </div>
                                <div className="productDetailSellTextSection">
                                    <p className="productDetailText">{formatNumberWithCommas(productData.productprice)}</p>
                                </div>
                                <div className="product-infoSection">
                                    <p className="product-info">배송&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12:00
                                        까지
                                        결제 시 오늘 출발</p>
                                </div>
                                <hr/>
                                <div className="productDetailStoreSection">
                                    <img className="productDetailStoreIcon" src={storeIcon}/>
                                    <span className="productDetailStoreIconText">{productData.storename}</span>
                                    <input type="button" value="브랜드홈 >" id="productDetailStoreBtn" onClick={handleBrandHomeClick}/>
                                </div>
                            </div>
                            <div className="productDetail-productCountSection">
                                <div className="productDetail-productCountText">
                                    <span>개수</span>
                                </div>
                                <div className="productDetail-productCount">
                                    <input
                                        type="button"
                                        value="-"
                                        id="productDetail-productCount-delBtn"
                                        onClick={handleDecrease}
                                    />
                                    <input
                                        id="productDetailCountText"
                                        value={count}
                                        readOnly
                                    />
                                    <input
                                        type="button"
                                        value="+"
                                        id="productDetail-productCount-addBtn"
                                        onClick={handleIncrease}
                                    />
                                </div>
                            </div>
                            <div className="productDetailCashSection">
                                <div className="productDetailCashSectionText">
                                    <span>주문가격</span>
                                </div>
                                <div className="productDetailCash">
                                    <span id="productDetailCash-Won">{formatNumberWithCommas(productData.productprice * count)}원</span>
                                </div>
                            </div>
                            <div className="productDetailShoppingBtnSection">
                                <input type="button" onClick={appendCart} value="장바구니" id="productDetailCartBtn"/>
                                <input type="button" value="바로구매" id="productDetailSellBtn"/>
                            </div>
                        </div>
                        )}
                    </div>

                    <div className="productDetailMiddleBarSection">
                        <button
                            className="productDetailInfoText"
                            onClick={() => scrollToSection(productInfoRef)}
                        >
                            상품정보
                        </button>
                        <button
                            className="productDetailReviewText"
                            onClick={() => scrollToSection(reviewRef)}
                        >
                            리뷰
                        </button>
                    </div>
                    <div  ref={productInfoRef} className="productDetailInfoImgSection">
                        {productDetailData.map((productDetailData) => (
                        <img className="productDetailInfoImg"
                             src={productDetailData.productdetailsimage}
                             alt="제품 설명 이미지"
                             key={productDetailData.productdetailsnum}
                        />
                        ))}
                        <br/>
                    </div>
                    <div ref={reviewRef} ><span id="reviewText">리뷰</span><span id="reviewCount">{formatNumberWithCommas(productReviewData.reviewcount)}</span>
                        <input
                            type="button"
                            value="리뷰쓰기"
                            id="reviewBtn"
                            onClick={openModal}
                        />
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        className="reviewModal"
                        overlayClassName="reviewModalOverlay"
                    >
                        <div className="reviewModalCol1">
                            <span>리뷰 쓰기</span>
                            <input onClick={closeModal} type="button" id="modalCloseButton" value="x"/>
                        </div>
                        <div className="reviewModalCol2">
                            <img className="reviewModalImg"
                                 src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/167866935762774317.jpg"
                                 alt="제품 설명 이미지"/>
                            <span className="reviewModalProductName">상품명</span>
                        </div>
                        <div className="reviewModalCol2">
                            <p>별점 입력</p>
                            <div>
                                {Array.from({ length: maxStars }).map((_, starIndex) => (
                                    <img
                                        key={starIndex}
                                        src={clicked[starIndex] ? blueStar : whiteStar}
                                        onClick={() => starScore(starIndex)}
                                        alt="starIcon"
                                        className="starIcon"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="reviewModalCol2">
                        <p>사진 첨부</p>
                        <button className="modalPhotoButton">
                            <img id="photoIcon" src={photoIcon} alt="사진"/>사진 첨부하기</button>
                        </div>

                        <div className="reviewModalCol2">
                        <p>별점 입력</p>
                        <textarea
                            placeholder="리뷰를 작성해주세요..."
                            className="reviewTextarea"
                        />
                        </div>
                        <button className="modalSubmitButton">제출</button>
                    </Modal>
                    <div id="reviewGreyDiv">
                        <div className="productTotalScopeDiv">
                            {Array.from({ length: maxStars }).map((_, starIndex) => (
                                <img
                                    key={starIndex}
                                    className="productTotalScope"
                                    src={starIndex < productReviewData.averagerating ? blueStar : whiteStar}
                                    alt="starIcon"
                                />
                            ))}
                            <span className="productTotalScopeText">{productReviewData.averagerating}</span>
                        </div>

                    </div>
                    <div className="productDetailBottomBarSection">
                        <a href="" className="productDetailBottomBarText">베스트순</a>
                        <a href="" className="productDetailBottomBarText">최신순</a>
                        <span className="productDetailBottomBarText">|</span>
                        <img id="photoIcon" src={photoIcon} alt="사진"/>
                        <a href="" className="productDetailBottomBarText">사진리뷰</a>
                        <span className="productDetailBottomBarText">|</span>
                        <input type="button" id="scopeBtn" value="별점▼"/>
                    </div>
                    <div>

                    {productAllReviewsData.map((review) => (
                    <div key={review.reviewnum}>

                        <div>
                            <img
                                src={`${process.env.PUBLIC_URL}/profileImg/defaultProfile.png` || ''}
                                className="contestProfileImg"
                                alt="profileImg"
                            />
                            <span className="reviewDetailText">{review.name}</span>
                            <br/>
                            {Array.from({ length: maxStars }).map((_, starIndex) => (
                                <img
                                    key={starIndex}
                                    className="productDetailSectionSmallImg"
                                    src={starIndex < `${review.reviewrating}` ? blueStar : whiteStar}
                                    alt="starIcon"
                                />
                            ))}
                            <span className="reviewDetailText">{review.reviewdate}</span>
                        </div>

                        <p className="reviewProductName">{productData.productname}</p>
                        <img className="reviewPhoto"
                            src={review.reviewimage || ""}
                        />
                        <p className="reviewContent">{review.reviewcontent}</p>
                    </div>
                    ))}

                    {/*리뷰 페이지 네이션 추가*/}

                </div>

            </div>
        </div>
        </div>
    );
}

export default ProductDetail;

