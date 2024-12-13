import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/shopping.css';
import Header from "../header";
import axios from "axios";

function ShoppingBest() {
    const navigate = useNavigate();
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
    const setToday = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()} 기준`;

    const formatPrice = (price) => {
        return price.toLocaleString(); // 가격 쉼표
    };

    const [products, setProducts] = useState([]); // 상품 목록
    const [selectedButton, setSelectedButton] = useState("allBest"); // 선택된 버튼 상태

    // "오늘 베스트"와 "역대 베스트" 가져오기
    const fetchBestProducts = async () => {
        try {
            const response = await axios.get("http://localhost:80/payment/best/all");
            const fetchedProducts = response.data;

            // "오늘 베스트" 필터링
            const filteredTodayBest = fetchedProducts.filter(product => product.lastPaymentDate === todayString);

            setProducts(selectedButton === "todayBest" ? filteredTodayBest : fetchedProducts);
        } catch (error) {
            console.error("Error fetching best products:", error);
        }
    };

    useEffect(() => {
        fetchBestProducts(); // 초기 데이터 로드
    }, [selectedButton]); // 버튼 상태가 바뀔 때 데이터 새로 로드

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    };

    return (
        <div>
            <Header />
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
                    >
                        오늘 베스트
                    </button>
                    <button
                        className="shoppingBest_btn"
                        style={{
                            backgroundColor: selectedButton === "allBest" ? "#35C5F0" : "#FFFFFF",
                            color: selectedButton === "allBest" ? "#FFFFFF" : "#000000"
                        }}
                        type="submit"
                        onClick={() => handleButtonClick("allBest")}
                    >
                        역대 베스트
                    </button>
                </div>
                <span className="shoppingBest_date">{setToday}</span>
                <div className="shoppingBest_product_section">
                    {products.map((product, index) => (
                        <div
                            onClick={() => navigate(`/productDetail/${product.productNum}`)}
                            className="shoppingBest_product"
                            key={index}
                        >
                            <div className="shoppingBest_img_container">
                                <div className="shoppingBest_flag">{index + 1}</div>
                                <img
                                    className="shoppingBest_img"
                                    src={product.productMainImage}
                                    alt={product.productName}
                                />
                            </div>
                            <div className="shoppingBest_text">
                                <span className="shoppingBest_product_name">{product.productName}</span>
                                <span className="shoppingBest_product_price">
                                    {formatPrice(product.productPrice)}원
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {products.length === 0 && <div>데이터가 없습니다.</div>}
            </div>
        </div>
    );
}

export default ShoppingBest;
