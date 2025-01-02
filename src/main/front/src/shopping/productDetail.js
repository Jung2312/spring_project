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
    const [initialReviews, setInitialReviews] = useState([]);
    const [reviewCheck, setReviewCheck] = useState([]);

    // 페이지
    const [count, setCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [mainImage, setMainImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    
    // 리뷰 카테고리
    const [isLowToHighActive, setIsLowToHighActive] = useState(false);  // 리뷰 카테고리 버튼 활성화 상태 관리
    const [isHighToLowActive, setIsHighToLowActive] = useState(true);  // 리뷰 카테고리 버튼 활성화 상태 관리
    const [isFirstDateActive, setIsFirstDateActive] = useState(false);  // 리뷰 카테고리 버튼 활성화 상태 관리
    const [isLastDateActive, setIsLastDateActive] = useState(false);  // 리뷰 카테고리 버튼 활성화 상태 관리

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const reviewsPerPage = 3;
    const maxPageButtons = 5;

    const totalPages = Math.ceil(productAllReviewsData.length / reviewsPerPage);


    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = productAllReviewsData.slice(indexOfFirstReview, indexOfLastReview);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const firstPageButton = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const lastPageButton = Math.min(totalPages, firstPageButton + maxPageButtons - 1);
    const visiblePageNumbers = pageNumbers.slice(firstPageButton - 1, lastPageButton);


    const handlePageChange = (page) => setCurrentPage(page);
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


    const mainRef = useRef(null);
    const productInfoRef = useRef(null);
    const reviewRef = useRef(null);

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    const userid = sessionStorage.getItem('userid');

    // 페이지 마운트 시 기본적으로 mainRef 위치로 이동
    useEffect(() => {
        mainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // 스크롤 이동 함수
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // 바로구매 버튼
    const handleBuyNow = () => {
        if(!userid){
            alert("로그인을 진행하세요.");
            navigate('/login');
            return;
        }

        const purchaseData = {
            productNum: productData.productnum, // 상품 ID
            productCount: count, // 현재 선택된 상품 개수
        };
        console.log()

        navigate("/payment", { state: purchaseData });  // 상품번호를 URL 파라미터로 전달
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
    const maxStars = 5; // 최대 별 개수


    const handleBrandHomeClick = () => {
        const storename = productData.storename;
        navigate(`/shoppingInformation/${storename}`);
    };

    // 상품 정보
    useEffect(() => {
        // productnum이 제대로 전달되었는지 확인
        console.log('Product number:', productnum);
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
        // 초기 메인 이미지를 productData의 메인 이미지로 설정
        if (productData.productmainimage) {
            setMainImage(productData.productmainimage);
        }
    }, [productData]);


    // 이미 리뷰를 작성한 상품인지 확인
    useEffect(() => {
        fetch(`http://localhost:80/payment/check?userid=${userid}&productnum=${productnum}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                setReviewCheck(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setProductReviewData('Error fetching data');
            });
    }, []);


    // 상품 리뷰 총점, 총 개수 계산
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

    // 상품 이미지
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

    // 상품 설명 이미지
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
                    throw new Error('Response error');
                }
                return res.json();
            })
            .then(data => {
                setProductAllReviewsData(data);
                setInitialReviews(data);  // 초기 리뷰 데이터를 저장
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setProductAllReviewsData('Error fetching data');
            });
    }, [productnum]);


    // 클릭 핸들러: 클릭한 이미지로 메인 이미지 변경
    const handleThumbnailClick = (imageUrl) => {
        const formatImageUrl = imageUrl.replace(/\&.*$/, '&w=480&h=480&c=c&webp=1');
        setMainImage(formatImageUrl);
    };

    // 별점 낮은 순 정렬
    const handleSortLowToHigh = () => {
        const sortedReviews = currentReviews.slice().sort((a, b) => a.reviewrating - b.reviewrating);
        setProductAllReviewsData(sortedReviews);
        setIsLowToHighActive(true);
        setIsHighToLowActive(false);
        setIsFirstDateActive(false);
        setIsLastDateActive(false)
    };

    // 별점 높은 순 정렬
    const handleSortHighLow = () => {
        const sortedReviews = currentReviews.slice().sort((b, a) => a.reviewrating - b.reviewrating);
        setProductAllReviewsData(sortedReviews);
        setIsHighToLowActive(true);
        setIsLowToHighActive(false);
        setIsFirstDateActive(false);
        setIsLastDateActive(false)
    };


    // 최신순 정렬
    const handleSortNewestFirst = () => {
        const sortedReviews = currentReviews.slice().sort((a, b) => new Date(b.reviewdate) - new Date(a.reviewdate));
        setProductAllReviewsData(sortedReviews);
        setIsHighToLowActive(false);
        setIsLowToHighActive(false);
        setIsFirstDateActive(true);
        setIsLastDateActive(false)
    };

    // 과거순 정렬
    const handleSortNewestLast = () => {
        const sortedReviews = currentReviews.slice().sort((b, a) => new Date(b.reviewdate) - new Date(a.reviewdate));
        setProductAllReviewsData(sortedReviews);
        setIsHighToLowActive(false);
        setIsLowToHighActive(false);
        setIsFirstDateActive(false);
        setIsLastDateActive(true)
    };

    // 사진만 보기
    const handlePhotoReviewClick = () => {
        const photoReviews = currentReviews.filter(review => review.reviewimage);
        setProductAllReviewsData(photoReviews);
    };

    // 전체 보기 버튼 클릭 시 초기 데이터 출력
    const handleAllReviewClick = () => {
        setProductAllReviewsData(initialReviews);
    };

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

    const submitReview = async () => {
        const formData = new FormData();
        formData.append('userid', userid);
        formData.append('productnum', productData.productnum);
        formData.append('reviewcontent', document.querySelector('.reviewTextarea').value);
        formData.append('reviewrating', clicked.filter((star) => star).length); // 별점 계산
        if (imageFile) {
            formData.append('reviewimage', imageFile); // 선택한 파일 첨부
        }


        try {
            const response = await fetch("http://localhost:80/review/save", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("작성이 완료되었습니다."); // 서버 응답 메시지 표시
                window.location.reload();
            } else {
                alert('리뷰를 이미 작성한 상품입니다.');
            }
            closeModal(); // 모달 닫기

        } catch (error) {
            throw new Error("리뷰 작성 중 오류가 발생하였습니다.");
        }
    };

    return (
        <div ref={mainRef}>
            <Header/>
            <div className="productDetailcontainer">
                <div className="productDetailsection">
                    <div className="productDetailInfo">
                        <div className="productDetailImgSection productDetailInfo-item">
                            <div>
                                {productImgData.map((imgData) => (
                                    <div
                                        className="productDetailsectionImg"
                                        key={imgData.productimagenum}
                                    >
                                        <img
                                            src={imgData.productimage}
                                            alt="제품 이미지"
                                            onClick={() => handleThumbnailClick(imgData.productimage)} // 클릭 이벤트 추가
                                        />
                                    </div>
                                ))}
                            </div>

                            {productData && (
                                <div className="productDetailMainImg">
                                    <img
                                        className="productPageImg"
                                        src={mainImage} // 상태에서 메인 이미지 URL 사용
                                        alt="제품 메인 이미지"
                                    />
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
                                <input type="button" value="바로구매" id="productDetailSellBtn" onClick={handleBuyNow}/>
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
                    <div ref={productInfoRef} className="productDetailInfoImgSection">
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
                        {!reviewCheck &&
                            <input
                                type="button"
                                value="리뷰쓰기"
                                id="reviewBtn"
                                onClick={openModal}
                            />
                        }
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
                                 src={mainImage}
                                 alt="제품 설명 이미지"/>
                            <span className="reviewModalProductName">{productData.productname}</span>
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
                            <p>사진 첨부(선택)</p>
                            <input
                                id="fileInput"
                                className="modalPhotoButton"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <label htmlFor="fileInput" className="customFileButton">
                                <img src={photoIcon} id="modalPhotoIcon"/>
                                사진 첨부하기
                            </label>
                        </div>

                        <div className="reviewModalCol2">
                        <p>별점 입력</p>
                        <textarea
                            placeholder="리뷰를 작성해주세요..."
                            className="reviewTextarea"
                        />
                        </div>
                        <button className="modalSubmitButton" onClick={submitReview}>제출</button>
                    </Modal>
                    <div id="reviewGreyDiv">
                        <div className="productTotalScopeDiv">
                            <div className="productTotalScopeStarDiv">
                                {Array.from({ length: maxStars }).map((_, starIndex) => (
                                    <img
                                        key={starIndex}
                                        className="productTotalScope"
                                        src={starIndex < productReviewData.averagerating ? blueStar : whiteStar}
                                        alt="starIcon"
                                    />
                                ))}
                            </div>
                            <div className="productTotalScopeStarNumDiv" >
                                <span className="productTotalScopeText">{productReviewData.averagerating}</span>
                            </div>
                        </div>

                    </div>
                    <div className="productDetailBottomBarSection">
                        <input
                            type="button"
                            className="productDetailBottomBarText"
                            onClick={handleSortHighLow}
                            style={{ color: isHighToLowActive ? '#35C5F0' : '#5c5c5c' }}  // 색상 변경
                            value="별점높은순"/>
                        <input
                            type="button"
                            className="productDetailBottomBarText"
                            value="별점낮은순"
                            onClick={handleSortLowToHigh}
                            style={{ color: isLowToHighActive ? '#35C5F0' : '#5c5c5c' }}  // 색상 변경
                        />
                        <input
                            type="button"
                            className="productDetailBottomBarText"
                            value="최신순"
                            onClick={handleSortNewestFirst}
                            style={{ color: isFirstDateActive ? '#35C5F0' : '#5c5c5c' }}  // 색상 변경
                        />                        
                        
                        <input
                            type="button"
                            className="productDetailBottomBarText"
                            value="과거순"
                            onClick={handleSortNewestLast}
                            style={{ color: isLastDateActive ? '#35C5F0' : '#5c5c5c' }}  // 색상 변경
                        />
                        <span className="productDetailBottomBarText">|</span>
                        <img id="photoIcon" src={photoIcon} alt="사진"/>
                        <input
                            type="button"
                            className="productDetailBottomBarText"
                            value="사진리뷰"
                            id="photoReviewSelectBtn"
                            onClick={handlePhotoReviewClick}
                        />

                        <span className="productDetailBottomBarText">|</span>
                        <input
                            type="button"
                            className="productDetailBottomBarText"
                            value="전체보기"
                            id="photoReviewAllSelectBtn"
                            onClick={handleAllReviewClick}
                        />
                    </div>
                    <div>
                        {currentReviews.length > 0 ? (
                            currentReviews.map((review) => (
                                <div key={review.reviewnum}>
                                    <div>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/profileImg/${review.profileimage}`}
                                            className="contestProfileImg"
                                            alt="profileImg"
                                        />
                                        <span className="reviewDetailText">{review.name}</span>
                                        <br />
                                        {Array.from({ length: maxStars }).map((_, starIndex) => (
                                            <img
                                                key={starIndex}
                                                className="productDetailSectionSmallImg"
                                                src={starIndex < review.reviewrating ? blueStar : whiteStar}
                                                alt="starIcon"
                                            />
                                        ))}
                                        <span className="reviewDetailText">{review.reviewdate}</span>
                                    </div>
                                    <p className="reviewProductName">{productData.productname}</p>
                                    {review.reviewimage && (
                                        <img
                                            className="reviewPhoto"
                                            src={`${process.env.PUBLIC_URL}/postImg/${review.reviewimage}`}
                                            alt="Review"
                                        />
                                    )}
                                    <p className="reviewContent">{review.reviewcontent}</p>
                                </div>
                            ))
                        ) : (
                            <p>리뷰가 존재하지 않습니다.</p>
                        )}

                        {/* 패이지네이션 */}
                        <div className="pagination2">
                            {currentPage > 1 && <button onClick={handlePrev}>&laquo;</button>}
                            {visiblePageNumbers.map((page) => (
                                <button
                                    key={page}
                                    className={page === currentPage ? 'active' : ''}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            {currentPage < totalPages && <button onClick={handleNext}>&raquo;</button>}
                        </div>
                        
                        <input type="button" id="pageTopBtn" value="맨 위로" onClick={() => scrollToSection(mainRef)}/>

                </div>

            </div>
        </div>
        </div>
    );
}

export default ProductDetail;

