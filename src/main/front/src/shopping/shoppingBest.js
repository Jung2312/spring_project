import React, {useEffect, useRef, useState} from 'react';
import '../css/shopping.css';
import Header from "../header";
import axios from "axios";

function ShoppingBest() {
    const today = new Date(); // 현재 날짜
    const setToday = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()} 기준`;
    const formatPrice = (price) => {
        return price.toLocaleString(); // 쉼표
    };

    const [products, setProducts] = useState([]); // 상품 목록
    const [page, setPage] = useState(1);         // 현재 페이지
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 더 불러올 상품 여부
    const [categories, setCategories] = useState([]); // 모든 카테고리 데이터를 저장

    // 상품 데이터를 로드하는 함수
    const loadProducts = async (currentPage, limit = 6) => {
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

    const categoryContainerRef = useRef(null); // 카테고리 컨테이너 참조
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false); // 오른쪽 끝 여부 상태

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

    // 스크롤 이벤트 처리 (수정됨)
    useEffect(() => {
        const container = categoryContainerRef.current;

        const handleScroll = () => {
            if (container) {
                const atStart = container.scrollLeft === 0;
                const atEnd =
                    container.scrollLeft + container.offsetWidth >=
                    container.scrollWidth - 1;

                setScrollPosition(container.scrollLeft);
                setIsAtEnd(atEnd);
            }
        };

        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div className="shoppingBest">
            <Header/>
            <div className="shoppingBest_btn_container">
                <button className="shoppingBest_btn" type="submit">오늘 베스트</button>
                <button className="shoppingBest_btn" type="submit">역대 베스트</button>
            </div>
            <span className="shoppingBest_date">{setToday}</span>
            <div className="shoppingBest_product_section">
                {products.map((product, index) => (
                    <div className="shoppingBest_product" key={index}>
                        <div className="shoppingBest_img_container">
                            <div className="shoppingBest_flag">{index + 1}</div>
                            <img className="shoppingBest_img" src={product.productMainImage} alt={product.productName}/>
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
    );
}

export default ShoppingBest;
