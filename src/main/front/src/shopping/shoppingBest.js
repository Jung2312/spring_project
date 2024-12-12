import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../css/shopping.css';
import Header from "../header";
import axios from "axios";

function ShoppingBest() {
    const navigate = useNavigate();
    const today = new Date(); // 현재 날짜
    const setToday = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()} 기준`;
    const formatPrice = (price) => {
        return price.toLocaleString(); // 쉼표
    };

    const [products, setProducts] = useState([]); // 상품 목록
    const [page, setPage] = useState(1);         // 현재 페이지
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 더 불러올 상품 여부
    const [selectedButton, setSelectedButton] = useState("todayBest"); // 선택된 버튼 상태

    // 스크롤 로드용 상품 데이터를 가져오는 함수
    const loadProducts = async (currentPage, limit = 6) => {
        if (loading || !hasMore || selectedButton !== "allBest") return; // "역대 베스트"일 때만 작동
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:80/product/productslist?page=${currentPage}&limit=${limit}`);
            const newProducts = response.data;

            setTimeout(() => {
                if (newProducts.length === 0) {
                    setHasMore(false); // 추가로 불러올 데이터가 없음
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

    // 상품 6개
    useEffect(() => {
        loadProducts(1, 6);
    }, []);

    // 스크롤 이벤트 처리
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                loadProducts(nextPage, 6); // 다음 페이지의 상품 로드
                return nextPage;
            });
        }
    };

    useEffect(() => {
        // 스크롤 이벤트 등록
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
    }, [loading, hasMore]);

    // 오늘 베스트와 역대 베스트 선택 시 초기화
    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
        setProducts([]); // 기존 목록 초기화
        fetchBestProducts(buttonType);
    };

    const fetchBestProducts = async (type) => {
        try {
            const response = await axios.get(`http://localhost:80/payment/best/${type === "todayBest" ? "today" : "all"}`);
            const fetchedProducts = response.data;

            if (type === "todayBest" && fetchedProducts.length === 0) {
                // 오늘 베스트가 비어있는 경우
                setHasMore(false); // 추가 로드 중지
                setProducts([]); // 빈 상태 유지
            } if (type === "allBest" && fetchedProducts.length === 0) {
                // 오늘 베스트가 비어있는 경우
                setHasMore(false); // 추가 로드 중지
                setProducts([]); // 빈 상태 유지
            } else {
                setProducts(fetchedProducts); // 데이터 로드
            }
        } catch (error) {
            console.error("Error fetching best products:", error);
        }
    };
    useEffect(() => {
        fetchBestProducts(selectedButton); // 초기 로드
    }, []);

    return (
        <div>
            <Header/>
            <div className="shoppingBest">
                <div className="shoppingBest_btn_container">
                    <button
                        className="shoppingBest_btn"
                        style={{
                            backgroundColor: selectedButton === "todayBest" ? "#35C5F0" : "#FFFFFF",
                            color: selectedButton === "todayBest" ? "#FFFFFF" : "#000000"
                        }}
                        type="submit"
                        onClick={() => handleButtonClick("todayBest")}
                    >오늘 베스트
                    </button>
                    <button
                        className="shoppingBest_btn"
                        style={{
                            backgroundColor: selectedButton === "allBest" ? "#35C5F0" : "#FFFFFF",
                            color: selectedButton === "allBest" ? "#FFFFFF" : "#000000"
                        }}
                        type="submit"
                        onClick={() => handleButtonClick("allBest")}
                    >역대 베스트
                    </button>
                </div>
                <span className="shoppingBest_date">{setToday}</span>
                <div className="shoppingBest_product_section">
                    {products.map((product, index) => (
                        <div onClick={() => navigate(`/productDetail/${product.productNum}`)} className="shoppingBest_product" key={index}>
                            <div className="shoppingBest_img_container">
                                <div className="shoppingBest_flag">{index + 1}</div>
                                <img className="shoppingBest_img" src={product.productMainImage}
                                     alt={product.productName}/>
                            </div>
                            <div className="shoppingBest_text">
                                <span className="shoppingBest_store_name">{product.storeName}</span>
                                <span className="shoppingBest_product_name">{product.productName}</span>
                                <span className="shoppingBest_product_price">{formatPrice(product.productPrice)}원</span>
                                <span className="shoppingBest_review">리뷰 123</span>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && <div>로딩 중...</div>}
            </div>
        </div>
    );
}

export default ShoppingBest;
