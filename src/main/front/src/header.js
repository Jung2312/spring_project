import React, { useState, useEffect } from 'react';
import css from './css/header.css';
import SearchImg from './img/search_img.png';
import CartImg from './img/cart_img.png';
import postIcon from './img/headerPostIcon.png';
import contestIcon from './img/headerContestIcon.png';
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [searchProduct, setSearchProduct] = useState("");
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [topProducts, setTopProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMoreContent, setShowMoreContent] = useState(false); // 검색 더보기 상태
    const [showPostContent, setShowPostContent] = useState(false); // 글쓰기 버튼 더보기 상태
    const location = useLocation();

    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        if (userid) {
            setIsLogin(true);
            fetchUserInfo(userid);
        }

    }, []);

    const fetchUserInfo = async (userid) => {
        try {
            const response = await fetch(`http://localhost:80/user/info?userid=${userid}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
    // 컴포넌트 마운트될 때만 제품 목록 가져오기
    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const response = await fetch("http://localhost:80/search/top", { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    setTopProducts(data);
                } else {
                    console.error('Failed to fetch top products');
                }
            } catch (error) {
                console.error('Error fetching top products:', error);
            }
        };

        fetchTopProducts();
    }, []);

    // 2초마다 인덱스 변경하여 제품 이름 업데이트
    useEffect(() => {
        if (topProducts.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % topProducts.length);
            }, 1500);

            return () => clearInterval(interval); // Cleanup
        }
    }, [topProducts]);

    const fetchProducts = async (productname) => {
        try {
            const encodeProductName = encodeURIComponent(productname);
            const response = await fetch(`http://localhost:80/product/search?productname=${encodeProductName}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data.slice(0, 10)); // 최대 10개의 상품만 설정
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearchChange = (event) => {
        const productname = event.target.value;
        setSearchProduct(productname);

        if (productname.trim() !== "") {
            fetchProducts(productname);
            setShowProducts(true);
        } else {
            setShowProducts(false);
        }
    };


    const handleProductClick = async (product) => {
        try {
            await fetch("http://localhost:80/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productname: product.productname,
                    productnum: product.productnum
                })
            });
        } catch (error) {
            console.error('Error saving search data:', error);
        }
    };

    const handleBlur = (event) => {
        setTimeout(() => {
            const dropdown = document.querySelector(".products-box");
            if (!dropdown || !dropdown.contains(document.activeElement)) {
                setShowProducts(false);
            }
        }, 100); // 약간의 지연을 추가해 클릭 이벤트가 처리되도록 함
    };

    const logoutButtonClick = () => {
        sessionStorage.clear();
        window.location.reload();
    };

    // "더 보기" 버튼 이벤트 처리
    const toggleMoreContent = () => {
        setShowMoreContent((prev) => !prev);
    };

    // "더 보기" 버튼 이벤트 처리
    const togglePostContent = () => {
        setShowPostContent((prev) => !prev);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="header">
            <header className="main-header">
                <div className="logo-name-box"><a href="/" className="logo-name">나만의집</a></div>
                <div className="top-category-box">
                    <a href="/main" id="community" className={isActive("/main") || isActive("/community/recommend") ? "active" : ""}>커뮤니티</a>
                    <a href="/shopping/shoppingHome" id="shopping" className={isActive("/shopping/shoppingHome") || isActive("/shopping/shoppingCategory") || isActive("/shopping/shoppingBest") ? "active" : ""}>쇼핑</a>
                    <a href="/contest" id="contest" className={isActive("/contest") ? "active" : ""}>콘테스트</a>
                </div>
                <div className="search-box">
                    <img className="search-img" src={SearchImg} alt="Search" />
                    <input
                        className="search-field"
                        type="text"
                        placeholder="통합검색"
                        value={searchProduct}
                        onChange={handleSearchChange}
                        onBlur={handleBlur}
                        onFocus={() => searchProduct && setShowProducts(true)}
                    />
                    {showProducts && (
                        <div className="products-box">
                            {products.map((product) => (
                                <div className="products-item" key={product.productnum}>
                                    <a
                                        href={`/productDetail/${product.productnum}`}
                                        onClick={() => handleProductClick(product)}
                                        className="products-item-text"
                                    >
                                        <img id="products-item-main-image" src={product.productmainimage}/>
                                        {product.productname}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="cart-box">
                    <a href=""><img src={CartImg} alt="Cart" /></a>
                </div>
                {isLogin ? (
                    <div className="header-user-box">
                        <a href="/myPage/profile"><span
                            className="header-user-name">{userInfo ? `${userInfo.name}님` : "로딩중..."}</span></a>
                        <button id="mainpage-logout" onClick={() => logoutButtonClick()}>로그아웃</button>
                    </div>
                ) : (
                    <div className="header-user-box">
                        <a href="/login" id="login">로그인</a>
                        <a href="/signup" id="register">회원가입</a>
                    </div>
                )}
                <div className="post-btn-box">
                    <button
                        className="post-btn"
                        onClick={togglePostContent} // 버튼 이벤트 추가
                    >
                        <span>글쓰기 {showPostContent ? "▲" : "▼"}</span>
                    </button>
                    {/* "글쓰기 더 보기" 콘텐츠 */}
                    {showPostContent && (
                        <div className="products-post-box">
                            <div className="products-search-item">
                                <a className="products-item-font-size" href={"/recommend/post"}>
                                    <img src={postIcon} className="header-post-btn-icon"/>
                                    <span className="header-post-btn-text">인테리어 추천 작성하기</span>
                                </a>
                            </div>

                            <div className="products-search-item">
                                <a className="products-item-font-size" href={"/contest"}>
                                    <img src={contestIcon} className="header-post-btn-icon"/>
                                    <span className="header-post-btn-text">인테리어 콘테스트 참여하기</span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* 현재 경로가 /shopping 시작할 때만 sub-header 표시 */}
            {location.pathname.startsWith("/shopping") && (
                <div className="sub-header">
                    <div className="sub-header-category-box">
                        <a href="/shopping/shoppingHome" id="sub-header-shopping" className={isActive("/shopping/shoppingHome") ? "active" : ""}>쇼핑홈</a>
                        <a href="/shopping/shoppingCategory" id="sub-header-category" className={isActive("/shopping/shoppingCategory") ? "active" : ""}>카테고리</a>
                        <a href="/shopping/shoppingBest" id="sub-header-best" className={isActive("/shopping/shoppingBest") ? "active" : ""}>베스트</a>
                    </div>
                    <div className="sub-header-realtime-search-box">
                        {topProducts.length > 0 && (
                            <a href={`productDetail/${topProducts[currentIndex]?.[0]}`} className="sub-header-realtime-search-href">
                            <span className="sub-header-realtime-search-rank">
                                {currentIndex + 1}
                            </span>
                            <span className="sub-header-realtime-search-product-name">
                                {topProducts[currentIndex]?.[2]}
                            </span>
                            </a>
                        )}
                        <div className="sub-header-realtime-search-more-btn">
                            <button
                                className="sub-header-more-btn"
                                onClick={toggleMoreContent} // 버튼 이벤트 추가
                            >
                                {showMoreContent ? "▲" : "▼"}
                            </button>
                        </div>

                        {/* "더 보기" 콘텐츠 */}
                        {showMoreContent && (
                            <div className="products-search-box">
                                {topProducts.map((product, index) => (
                                    <div className="products-search-item" key={index}>
                                        <a className="products-item-font-size" href={`productDetail/${topProducts[index]?.[0]}`}>
                                            {index + 1}. {topProducts[index]?.[2]}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            )}

            {/* 현재 경로가 /community/recommend와 메인페이지에서만 sub-header 표시 */}
            {(location.pathname === "/community/recommend" ||
                location.pathname === "/main" ||
                location.pathname.startsWith("/community/recommendDetail/")) &&(
                <div className="community-sub-header">
                    <div className="community-sub-header-category-box">
                        <a href="/main" id="community-sub-header-shopping"
                           className={isActive("/main") ? "active" : ""}>홈</a>
                        <a href="/community/recommend" id="community-sub-header-category"
                           className={isActive("/community/recommend") || location.pathname.startsWith("/community/recommendDetail") ? "active" : ""}>추천</a>
                    </div>
                    <div className="sub-header-realtime-search-box">
                        {topProducts.length > 0 && (
                            <a href={`productDetail/${topProducts[currentIndex]?.[0]}`} className="sub-header-realtime-search-href">
                            <span className="sub-header-realtime-search-rank">
                                {currentIndex + 1}
                            </span>
                                <span className="sub-header-realtime-search-product-name">
                                {topProducts[currentIndex]?.[2]}
                            </span>
                            </a>
                        )}
                        <div className="sub-header-realtime-search-more-btn">
                            <button
                                className="sub-header-more-btn"
                                onClick={toggleMoreContent} // 버튼 이벤트 추가
                            >
                                {showMoreContent ? "▲" : "▼"}
                            </button>
                        </div>
                        {/* "더 보기" 콘텐츠 */}
                        {showMoreContent && (
                            <div className="products-search-box">
                                {topProducts.map((product, index) => (
                                    <div className="products-search-item" key={index}>
                                        <a className="products-item-font-size" href={`productDetail/${topProducts[index]?.[0]}`}>
                                            {index + 1}. {topProducts[index]?.[2]}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 경로가 /contest 페이지에서만 sub-header 표시 */}
            {location.pathname.startsWith("/contest") &&(
                <div className="contest-sub-header">
                    <div className="contest-sub-header-category-box">
                        <a href="/contest" id="contest-sub-header-shopping"
                           className={isActive("/contest") ? "active" : ""}>콘테스트 홈</a>
                        <a href="/contest/champion" id="contest-sub-header-category"
                           className={isActive("/contest/champion") ? "active" : ""}>지난 수상작</a>
                        <a href="/contest/notice" id="contest-sub-header-category"
                           className={isActive("/contest/notice") ? "active" : ""}>콘테스트 공지</a>
                    </div>
                    <div className="sub-header-realtime-search-box">
                        {topProducts.length > 0 && (
                            <a href={`productDetail/${topProducts[currentIndex]?.[0]}`} className="sub-header-realtime-search-href">
                            <span className="sub-header-realtime-search-rank">
                                {currentIndex + 1}
                            </span>
                            <span className="sub-header-realtime-search-product-name">
                                {topProducts[currentIndex]?.[2]}
                            </span>
                            </a>
                        )}
                        <div className="sub-header-realtime-search-more-btn">
                            <button
                                className="sub-header-more-btn"
                                onClick={toggleMoreContent} // 버튼 이벤트 추가
                            >
                                {showMoreContent ? "▲" : "▼"}
                            </button>
                        </div>
                        {/* "더 보기" 콘텐츠 */}
                        {showMoreContent && (
                            <div className="products-search-box">
                                {topProducts.map((product, index) => (
                                    <div className="products-search-item" key={index}>
                                        <a className="products-item-font-size" href={`productDetail/${topProducts[index]?.[0]}`}>
                                            {index + 1}. {topProducts[index]?.[2]}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>
            )}

            {/* 현재 경로가 /myPage로 시작할 때만 mypage_header 표시 */}
            {location.pathname.startsWith("/myPage") && (
                <div className="mypage_header">
                    <div className="mypage_header_category-box">
                        <a
                            href="/myPage/profile"
                            id="mypage_header_profile"
                            className={isActive("/myPage/profile") ? "active" : ""}
                        >
                            프로필
                        </a>
                        <a
                            href="/myPage/myShoppingPage"
                            id="mypage_header_myshopping"
                            className={isActive("/myPage/myShoppingPage") ? "active" : ""}
                        >
                            나의 쇼핑
                        </a>
                        <a
                            href="/myPage/myreview"
                            id="mypage_header_myreview"
                            className={isActive("/myPage/myreview") ? "active" : ""}
                        >
                            나의 리뷰
                        </a>
                        <a
                            href="/myPage/setting"
                            id="mypage_header_setting"
                            className={isActive("/myPage/setting") ? "active" : ""}
                        >
                            설정
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Header;