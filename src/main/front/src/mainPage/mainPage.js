import React, { useRef, useState, useEffect } from 'react';
import like from '../img/like.png';
import comment from '../img/comment.png';
import banner1 from '../img/banner1.jpg';
import banner2 from '../img/banner2.jpg';
import banner3 from '../img/banner3.jpg';
import banner4 from '../img/banner4.jpg';
import banner5 from '../img/banner5.jpg';
import Header from '../header.js'
import axios from "axios";
import ex from "../img/exProfile.png";
import '../css/community.css';
import '../css/mainPage.css';
import {useNavigate} from "react-router-dom";

function MainPage() {
    const [likeCount, setLikeCount] = useState(0); // 좋아요 초기값
    const [majorCategories, setMajorCategories] = useState([]); // majorCategory 데이터
    const [categories, setCategories] = useState([]); // 모든 카테고리 데이터를 저장
    const [activeTab, setActiveTab] = useState("전체"); // 기본 탭을 "전체"로 설정
    const [products, setProducts] = useState([]);
    const [postList, setPostList] = useState([]); // 게시글 데이터
    const categoryContainerRef = useRef(null); // 카테고리 컨테이너 참조
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false); // 오른쪽 끝 여부 상태
    const [categoryImages, setCategoryImages] = useState([]); // categoryImage 데이터
    const navigate = useNavigate();
    const banners = [banner1, banner2, banner3, banner4, banner5];
    const totalBanners = banners.length;
    const [currentIndex, setCurrentIndex] = useState(1); // 초기 위치는 첫 번째 슬라이드
    const containerRef = useRef(null);
    const isTransitioning = useRef(false);

    // 앞뒤 복제 슬라이드 추가
    const extendedBanners = [banners[totalBanners - 1], ...banners, banners[0]];

    // 다음 슬라이드로 이동
    const handleNext = () => {
        if (isTransitioning.current) return; // 애니메이션 중 중복 실행 방지
        isTransitioning.current = true;
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    // 이전 슬라이드로 이동
    const handlePrev = () => {
        if (isTransitioning.current) return; // 애니메이션 중 중복 실행 방지
        isTransitioning.current = true;
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    // 슬라이드 위치와 애니메이션 처리
    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            // 무한 슬라이드를 위한 위치 조정
            if (currentIndex === 0) {
                // 첫 번째 복제 슬라이드에서 마지막 슬라이드로 이동
                container.style.transition = 'none'; // 애니메이션 비활성화
                setTimeout(() => {
                    setCurrentIndex(totalBanners); // 마지막 슬라이드로 즉시 이동
                    container.style.transform = `translateX(-${totalBanners * 100}%)`;
                }, 50); // DOM 업데이트 지연 후 적용
            } else if (currentIndex === totalBanners + 1) {
                // 마지막 복제 슬라이드에서 첫 번째 슬라이드로 이동
                container.style.transition = 'none'; // 애니메이션 비활성화
                setTimeout(() => {
                    setCurrentIndex(1); // 첫 번째 슬라이드로 즉시 이동
                    container.style.transform = 'translateX(-100%)';
                }, 50); // DOM 업데이트 지연 후 적용
            } else {
                // 일반적인 슬라이드 이동
                container.style.transition = 'transform 0.5s ease-in-out';
                container.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        }

        // 애니메이션 완료 후 상태 초기화
        const handleTransitionEnd = () => {
            isTransitioning.current = false;
        };

        if (container) {
            container.addEventListener('transitionend', handleTransitionEnd);
        }

        return () => {
            if (container) {
                container.removeEventListener('transitionend', handleTransitionEnd);
            }
        };
    }, [currentIndex, totalBanners]);

    // 자동 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // 5초마다 다음 슬라이드로 이동

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);


    // 좋아요 클릭 시 숫자 증가
    const handleLikeClick = () => {
        setLikeCount(likeCount + 1);
    };

    const formatPrice = (price) => {
        return price.toLocaleString(); // 쉼표 포함 형식으로 변환
    };

    // 모든 카테고리 및 Major 카테고리 데이터 가져오기
    useEffect(() => {
        // Major 카테고리 가져오기
        axios.get('http://localhost:80/api/categories/major')
            .then(response => {
                setMajorCategories(["전체", ...response.data]); // "전체" 추가
            })
            .catch(error => {
                console.error('Error fetching major categories:', error);
            });

        // 모든 카테고리 가져오기
        axios.get('http://localhost:80/api/categories/all')
            .then(response => {
                setCategories(response.data.filter(category => category.categoryimage !== null)); // null 이미지 제외
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // 모든 제품 데이터를 가져옴
    useEffect(() => {
        axios.get('http://localhost:80/product/productslist')
            .then(response => {
                setProducts(response.data); // 모든 제품 저장
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // 서버에서 게시글 데이터 가져옴
    useEffect(() => {
        axios
            .get('http://localhost:80/recommend') // Spring Boot API URL
            .then((response) => {
                setPostList(response.data);
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
            });
    }, []);

    // 특정 Major 카테고리 탭 클릭 시 데이터 필터링
    const showTab = (tabName) => {
        setActiveTab(tabName); // 활성화된 탭 설정

        if (tabName === "전체") {
            axios.get('http://localhost:80/product/productslist')
                .then(response => {
                    setProducts(response.data); // 모든 제품 업데이트
                })
                .catch(error => {
                    console.error('Error fetching all products:', error);
                });
        } else {
            axios.get(`http://localhost:80/api/categories/${tabName}/sub`)
                .then(response => {
                    const subCategoryNums = response.data.map(category => category.categorynum);
                    axios.get('http://localhost:80/product/productslist', {
                        params: { categoryNums: subCategoryNums } // 필터 조건 전달
                    })
                        .then(response => {
                            setProducts(response.data); // 필터링된 제품 저장
                        })
                        .catch(error => {
                            console.error(`Error fetching products for ${tabName}:`, error);
                        });
                })
                .catch(error => {
                    console.error(`Error fetching subcategories for ${tabName}:`, error);
                });
        }
    };

    // 초기 스크롤 상태 업데이트 (수정됨)
    useEffect(() => {
        const container = categoryContainerRef.current;

        if (container) {
            const atStart = container.scrollLeft === 0;
            const atEnd =
                container.scrollLeft + container.offsetWidth >= container.scrollWidth - 1;

            setScrollPosition(container.scrollLeft);
            setIsAtEnd(atEnd);
        }
    }, [categories]); // 카테고리가 로드된 이후 실행

    // 카테고리 슬라이드 버튼 함수 (수정됨)
    const slideCategories = (direction) => {
        const container = categoryContainerRef.current;
        const scrollAmount = 1280; // 스크롤 이동량

        if (container) {
            if (direction === "left") {
                container.scrollLeft = Math.max(container.scrollLeft - scrollAmount, 0);
            } else {
                container.scrollLeft = Math.min(
                    container.scrollLeft + scrollAmount,
                    container.scrollWidth
                );
            }

            // 스크롤 후 상태 업데이트
            const atStart = container.scrollLeft === 0;
            const atEnd =
                container.scrollLeft + container.offsetWidth >=
                container.scrollWidth - 1;

            setScrollPosition(container.scrollLeft);
            setIsAtEnd(atEnd);
        }
    };

    return (
        <div>
            <Header/>
            <div className="mainPage">
                <div className="mainPage-banner-section">
                    <div className="mainPage-banner">
                        <div className="banner-container" ref={containerRef}>
                            {extendedBanners.map((banner, index) => (
                                <img
                                    key={index}
                                    className="mainPage-banner-img"
                                    src={banner}
                                    alt={`배너 ${index}`}
                                />
                            ))}
                        </div>
                    </div>
                    <button className="banner-button left" onClick={handlePrev}>&#10094;</button>
                    <button className="banner-button right" onClick={handleNext}>&#10095;</button>
                </div>
                <div className="mainPage-recommend-section">
                    {postList.map((post) => (
                        <div className="recommend-section" key={post.postnum}>
                            {/* 프로필 섹션 */}
                            <div className="profile-section">
                                <div className="profile-img">
                                    <img className="profile-img"
                                         src={`${process.env.PUBLIC_URL}/profileImg/${post.profileimage}`} alt="프로필 사진"
                                         onError={(e) => {
                                             e.target.src = ex;
                                         }}/>
                                </div>
                                <div className="profile-content">
                                    <div className="profile-name">
                                        <span className="nick-name">{post.userid}</span> {/* 닉네임 */}
                                        <span>·</span>
                                        <button className="follow">팔로우</button>
                                    </div>
                                    <div>
                                        <span className="profile-text">{post.introduce}</span> {/* 자기소개 */}
                                    </div>
                                </div>
                            </div>
                            {/* 게시글 사진 */}
                            <img className="post-img" src={`${process.env.PUBLIC_URL}/postImg/${post.postimg}`} alt="게시글 사진"
                                 onError={(e) => {
                                     e.target.src = ex;
                                 }}/>
                            {/* 좋아요와 댓글 */}
                            <div className="like-comment" onClick={handleLikeClick} style={{cursor: 'pointer'}}>
                                <div className="like">
                                    <img className="like-img" src={like} alt="마음"/>
                                    <span>{post.postlike + likeCount}</span>
                                </div>
                                <div className="comment">
                                    <img className="comment-img" src={comment} alt="댓글"/>
                                    <span>{post.postview}</span>
                                </div>
                            </div>
                            {/* 게시글 내용 */}
                            <div className="cotent-section">
                                <div>
                                    <span className="cotent-text">{post.postcontent}</span>
                                </div>
                            </div>
                            {/* 댓글 내용 */}
                            <div className="comment-section">
                                <div className="comment">
                                    <img className="comment-profile" src={ex} alt="프로필사진"/>
                                    <div className="comment-content">
                                        <div><span className="name">{post.userid}</span></div>
                                        <span className="comment-text">{post.userid}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mainPage-category-section">
                    <div className="mainPage-category-title">
                        <span className="mainPage-title-text">카테고리별 상품 찾기</span>
                    </div>
                    <div className="mainPage-category-slider">
                        <button className="mainPage-slide-button left" onClick={() => slideCategories('left')} disabled={scrollPosition === 0}>&#10094;</button>
                        <div className="mainPage-category-part" ref={categoryContainerRef}>
                            {categories.map((item, index) => (
                                <a href="/shopping/shoppingCategory">
                                    <div className="mainPage-category-content" key={index}>
                                        <img className="mainPage-categoty-img" src={item.categoryimage}
                                             alt={item.majorcategory}/>
                                        <span className="mainPage-category-name">{item.majorcategory}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <button className="mainPage-slide-button right" onClick={() => slideCategories('right')} disabled={isAtEnd}>&#10095;</button>
                    </div>
                </div>
                <div className="mainPage-mostView-section">
                    <div className="mainPage-mostView-title">
                        <span className="mainPage-title-text">많이 찾아 본 상품</span>
                        <a href="/shopping/shoppingHome">
                            <span className="mainPage-title-more">더보기</span>
                        </a>
                    </div>
                    <div className="mainPage-mostView-part">
                        {products.slice(0, 4).map((product, index) => (
                            <div onClick={() => navigate("")} className="mainPage-mostView-content" key={index}>
                                <div className="mainPage-image-container">
                                    <img className="mainPage-mostView-img" src={product.productMainImage}
                                         alt={product.productName}/>
                                </div>
                                <div className="mainPage-mostView-text">
                                    <span className="mainPage-store-name">{product.storeName}</span>
                                    <span className="mainPage-product-name">{product.productName}</span>
                                    <span className="mainPage-product-price">{formatPrice(product.productPrice)}원</span>
                                    <span className="mainPage-product-review">리뷰 37,213</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mainPage-best-section">
                    <div className="mainPage-best-title">
                        <span className="mainPage-title-text">베스트 상품</span>
                        <a href="/shopping/shoppingBest">
                            <span className="mainPage-title-more">더보기</span>
                        </a>
                    </div>
                    {/* 탭 버튼 */}
                    <div className="mainPage-tab-buttons-wrapper">
                        <div className="mainPage-tab-buttons">
                            {majorCategories.map((category, index) => (
                                <button key={index}
                                        className={`mainPage-tab-button ${activeTab === category ? 'active' : ''}`}
                                        onClick={() => showTab(category)}>{category}</button>
                            ))}
                        </div>
                    </div>
                    <div className="mainPage-best-part">
                        {products.slice(0, 3).map((product, index) => (
                            <div onClick={() => navigate("")} className="mainPage-best-content" key={index}>
                                <div className="mainPage-image-container">
                                    <img className="mainPage-best-img"
                                         src={product.productMainImage}
                                         alt={product.productName}/>
                                    <div className="mainPage-rank-badge">{index + 1}</div>
                                </div>
                                <div className="mainPage-best-text">
                                    <span className="mainPage-store-name">{product.storeName}</span>
                                    <span className="mainPage-product-name">{product.productName}</span>
                                    <span className="mainPage-product-price">{formatPrice(product.productPrice)}원</span>
                                    <span className="mainPage-product-review">리뷰 37,213</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
