import React, {useEffect, useState} from 'react';
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

    // 좋아요 클릭 시 숫자 증가
    const handleLikeClick = () => {
        setLikeCount(likeCount + 1);
    };

    const formatPrice = (price) => {
        return price.toLocaleString(); // 쉼표 포함 형식으로 변환
    };

    const [majorCategories, setMajorCategories] = useState([]); // 카테고리 데이터
    const [activeTab, setActiveTab] = useState(null); // 현재 활성화된 탭 (categorynum)
    const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 상품 목록
    const [products, setProducts] = useState([]);

    // 주요 카테고리 데이터 가져오기
    useEffect(() => {
        axios
            .get('http://localhost:80/categories/major')
            .then((response) => {
                const categories = response.data.map((name, index) => ({
                    name,
                    categorynum: index + 1, // 카테고리 번호는 서버에서 받아야 함
                }));
                setMajorCategories([{ name: '전체', categorynum: null }, ...categories]);
            })
            .catch((error) => console.error('Error fetching major categories:', error));
    }, []);

    // 특정 카테고리에 해당하는 상품 데이터 가져오기
    const fetchProductsByCategory = (categorynum) => {
        const url =
            categorynum === null
                ? 'http://localhost:80/product/productslist' // '전체'는 모든 상품을 가져옴
                : `http://localhost:80/product/category/${categorynum}`;
        axios
            .get(url)
            .then((response) => {
                setFilteredProducts(response.data); // 3개만 저장
            })
            .catch((error) => console.error('Error fetching products:', error));
    };

    // 탭 클릭 시 처리
    const handleTabClick = (categorynum) => {
        setActiveTab(categorynum); // 활성 탭 상태 업데이트
        fetchProductsByCategory(categorynum); // 해당 카테고리 상품 데이터 가져오기
    };

    useEffect(() => {
        // 초기 로드 시 '전체' 상품 데이터 가져오기
        fetchProductsByCategory(null);
    }, []);

    const [postList, setPostList] = useState([]);

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

    useEffect(() => {
        axios.get('http://localhost:80/product/productslist')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data); // 초기에는 전체 상품 표시
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, []);

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
                                <img className="profile-img" src={`${process.env.PUBLIC_URL}/profileImg/${post.profileimage}`} alt="프로필 사진"
                                     onError={(e) => { e.target.src = ex; }}/>
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
                             onError={(e) => { e.target.src = ex; }}/>
                        {/* 좋아요와 댓글 */}
                        <div className="like-comment" onClick={handleLikeClick} style={{cursor: 'pointer'}}>
                            <div className="like">
                                <img className="like-img" src={like} alt="마음"/>
                                <span>{post.postlike+likeCount}</span>
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
                <div className="mainPage-category-part">
                    <div className="mainPage-category-content">
                        <img className="mainPage-categoty-img" src={furniture} alt="가구"/>
                        <span className="mainPage-category-name">가구</span>
                    </div>
                    <div className="mainPage-category-content">
                        <img className="mainPage-categoty-img" src={furniture} alt="가구"/>
                        <span className="mainPage-category-name">가구</span>
                    </div>
                    <div className="mainPage-category-content">
                        <img className="mainPage-categoty-img" src={furniture} alt="가구"/>
                        <span className="mainPage-category-name">가구</span>
                    </div>
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
                        {majorCategories.map((category) => (
                            <button key={category.categorynum} className={`mainPage-tab-button ${activeTab === category.categorynum ? 'active' : ''}`}
                                onClick={() => handleTabClick(category.categorynum)}>{category.name}</button>
                        ))}
                    </div>
                </div>
                <div className="mainPage-best-part">
                    {filteredProducts.slice(0, 3).map((product, index) => (
                        <div className="mainPage-best-content" key={index}>
                            <div className="mainPage-image-container">
                                <img className="mainPage-best-img" src={product.productMainImage} alt={product.productName}/>
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
