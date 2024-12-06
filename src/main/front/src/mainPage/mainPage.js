import React, { useRef, useState, useEffect } from 'react';
import banner from '../img/banner.png';
import like from '../img/like.png';
import comment from '../img/comment.png';
import furniture from '../img/furniture.png';
import Header from '../header.js'
import axios from "axios";
import ex from "../img/exProfile.png";
import '../css/community.css';
import '../css/mainPage.css';

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
        <div className="mainPage">
            <Header/>
            <div className="mainPage-banner-section">
                <div className="mainPage-banner">
                    <img className="mainPage-banner-img" src={banner} alt="배너(광고)"/>
                </div>
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
                            <a href="/shoppingCategory">
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
                    <span className="mainPage-title-more">더보기</span>
                </div>
                <div className="mainPage-mostView-part">
                    {products.slice(0, 4).map((product, index) => (
                        <div className="mainPage-mostView-content" key={index}>
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
                    <span className="mainPage-title-more">더보기</span>
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
                        <div className="mainPage-best-content" key={index}>
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
    );
}

export default MainPage;
