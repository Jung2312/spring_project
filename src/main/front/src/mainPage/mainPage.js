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

    const [majorCategories, setMajorCategories] = useState([]); // majorCategory 데이터
    const [categoryImages, setCategoryImages] = useState([]); // categoryImage 데이터
    const [activeTab, setActiveTab] = useState(null); // 현재 활성화된 탭
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // 모든 카테고리 데이터를 저장

    useEffect(() => {
        // 모든 카테고리를 가져오는 API 호출
        axios.get('http://localhost:80/api/categories/all')
            .then(response => {
                // categoryimage가 null이 아닌 데이터만 저장
                setCategories(response.data.filter(category => category.categoryimage !== null));
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // 탭을 변경하는 함수
    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        // 서버에서 majorCategory를 가져옴
        axios.get('http://localhost:80/api/categories/major')
            .then(response => {
                setMajorCategories(response.data); // majorCategory 저장
            })
            .catch(error => {
                console.error('Error fetching major categories:', error);
            });
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
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, []);

    useEffect(() => {
        if (majorCategories.length > 0) {
            // 각 majorCategory에 해당하는 categoryimage를 가져옴
            axios.get(`http://localhost:80/api/categories/${majorCategories[0]}/sub`) // 첫 번째 majorCategory를 기본으로 선택
                .then(response => {
                    setCategoryImages(response.data.filter(item => item.categoryimage !== null)); // null이 아닌 categoryImage만 필터링
                })
                .catch(error => {
                    console.error('Error fetching subcategories:', error);
                });
        }
    }, [majorCategories]);

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
                    {categories.map((item, index) => (
                        <div className="mainPage-category-content" key={index}>
                            <img className="mainPage-categoty-img" src={item.categoryimage} alt={item.majorcategory}/>
                            <span className="mainPage-category-name">{item.majorcategory}</span>
                        </div>
                    ))}
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
                            <button key={index} className={`mainPage-tab-button ${activeTab === category ? 'active' : ''}`}
                                    onClick={() => showTab(category)}>{category}</button>
                        ))}
                    </div>
                </div>
                <div className="mainPage-best-part">
                    {products.slice(0, 3).map((product, index) => (
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
