import React, {useEffect, useState} from 'react';
import banner from '../img/banner.png';
import like from '../img/like.png';
import comment from '../img/comment.png';
import nongdamgom  from '../img/nongdamgom.png';
import blacknongdamgom  from '../img/blacknongdamgom.png';
import furniture from '../img/furniture.png';
import css from '../css/shoppingHome.css';
import Header from "../header";
import axios from "axios";

function ShoppingHome() {

    const formatPrice = (price) => {
        return price.toLocaleString(); // 쉼표 포함 형식으로 변환
    };

    const [products, setProducts] = useState([]); // 상품 목록
    const [page, setPage] = useState(1);         // 현재 페이지
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 더 불러올 상품 여부

    // 상품 데이터를 로드하는 함수
    const loadProducts = async (currentPage, limit = 8) => {
        if (loading || !hasMore) return; // 이미 로딩 중이거나 더 로드할 상품이 없으면 중단
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:80/product/productslist?page=${currentPage}&limit=${limit}`);
            const newProducts = response.data;

            // 1초의 딜레이 추가
            setTimeout(() => {
                if (newProducts.length === 0) {
                    setHasMore(false); // 추가로 불러올 데이터가 없음을 표시
                } else {
                    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
                }
                setLoading(false);
            }, 300); // 1초 딜레이
        } catch (error) {
            console.error("Error fetching product data:", error);
            setLoading(false);
        }
    };

    // 초기 로드: 첫 8개 상품 가져오기
    useEffect(() => {
        loadProducts(1, 8);
    }, []); // 페이지를 열었을 때 8개만 로드

    // 스크롤 이벤트 처리
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                loadProducts(nextPage, 8); // 다음 페이지의 상품 로드
                return nextPage;
            });
        }
    };

    useEffect(() => {
        // 스크롤 이벤트 등록
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
    }, [loading, hasMore]);

    // useEffect(() => {
    //     axios.get('http://localhost:80/product/productslist')
    //         .then(response => {
    //             setProducts(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching product data:', error);
    //         });
    // }, []);

    return (
        <div className="shoppingHome">
            <Header/>
            <div className="shoppingHome-banner-section">
                <div className="shoppingHome-banner">
                    <img className="shoppingHome-banner-img" src={banner} alt="배너(광고)"/>
                </div>
            </div>
            <div className="shoppingHome-recommend-product-section">
                <div className="shoppingHome-recommend-product-title">
                    <span className="shoppingHome-title-text">추천 상품</span>
                    <span className="shoppingHome-title-more">더보기</span>
                </div>
                <div className="shoppingHome-recommend-product-part">
                    {products.slice(0,4).map((product, index) => (
                    <div className="shoppingHome-recommend-product-content" key={index}>
                        <div className="shoppingHome-image-container">
                            <img className="shoppingHome-recommend-product-img" src={product.productMainImage} alt={product.productName}/>
                        </div>
                        <div className="shoppingHome-recommend-product-text">
                            <span className="shoppingHome-store-name">{product.storeName}</span>
                            <span className="shoppingHome-product-name">{product.productName}</span>
                            <span className="shoppingHome-product-price">{formatPrice(product.productPrice)}원</span>
                            <span className="shoppingHome-product-review">리뷰 37,213</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className="shoppingHome-category-section">
                <div className="shoppingHome-category-title">
                    <span className="shoppingHome-title-text">카테고리</span>
                </div>
                <div className="shoppingHome-category-part">
                    <div className="shoppingHome-category-content">
                        <img className="shoppingHome-categoty-img" src={furniture} alt="가구"/>
                        <span className="shoppingHome-category-name">가구</span>
                    </div>
                    <div className="shoppingHome-category-content">
                        <img className="shoppingHome-categoty-img" src={furniture} alt="가구"/>
                        <span className="shoppingHome-category-name">가구</span>
                    </div>
                    <div className="shoppingHome-category-content">
                        <img className="shoppingHome-categoty-img" src={furniture} alt="가구"/>
                        <span className="shoppingHome-category-name">가구</span>
                    </div>
                </div>
            </div>
            <div className="shoppingHome-product-section">
                <div className="shoppingHome-product-part">
                    {products.map((product, index) => (
                        <div className="shoppingHome-product-content" key={index}>
                            <div className="shoppingHome-image-container">
                                <img className="shoppingHome-product-img" src={product.productMainImage} alt={product.productName} />
                            </div>
                            <div className="shoppingHome-product-text">
                                <span className="shoppingHome-store-name">{product.storeName}</span>
                                <span className="shoppingHome-product-name">{product.productName}</span>
                                <span className="shoppingHome-product-price">{formatPrice(product.productPrice)}원</span>
                                <span className="shoppingHome-product-review">리뷰 37,213</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {loading && <div className="loading-indicator">로딩 중...</div>}
        </div>
    );
}

export default ShoppingHome;
