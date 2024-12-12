import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/shoppingCategory.css";
import ex from '../img/product_basic.png';
import Header from '../header.js';

function ShoppingCategory() {
    const [majorCategories, setMajorCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [expandedMajor, setExpandedMajor] = useState(null);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // 모든 상품 데이터를 저장할 상태 추가
    const navigate = useNavigate();
    const selectCateogory = sessionStorage.getItem("selectedCategory");

    // 처음 모든 상품 데이터를 불러오기
    useEffect(() => {
        fetch("http://localhost:80/product/all") // 모든 상품 데이터를 불러오는 API
            .then(response => response.json())
            .then(data => setAllProducts(data)) // 전체 데이터를 allProducts에 저장
            .catch(err => console.error("Error fetching all products:", err));

        if (selectCateogory) {
            handleMajorClick(selectCateogory);
        }

        fetch("http://localhost:80/api/categories/major")
            .then(response => response.json())
            .then(data => setMajorCategories(data))
            .catch(err => console.error("Error fetching major categories:", err));
    }, []);

    const handleMajorClick = (major) => {
        if (expandedMajor === major) {
            setExpandedMajor(null);
        } else {
            fetch(`http://localhost:80/api/categories/${major}/sub`)
                .then(response => response.json())
                .then(data => {
                    const filteredData = data.filter(sub => sub.subcategory !== null);
                    setSubCategories(prev => ({ ...prev, [major]: filteredData }));
                    setExpandedMajor(major);

                    if (selectCateogory && filteredData.length > 0) {
                        const firstSubCategory = filteredData[0].categorynum;
                        handleSubCategoryClick(firstSubCategory);
                    }
                    sessionStorage.removeItem("selectedCategory");
                })
                .catch(err => console.error("Error fetching subcategories:", err));
        }
    };

    const handleSubCategoryClick = (categorynum) => {
        console.log("Fetching products for subcategory:", categorynum);

        fetch(`http://localhost:80/product/category/${categorynum}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched products:", data);
                setProducts(data);
            })
            .catch(err => console.error("Error fetching products:", err));
    };

    // 숫자를 콤마 형식으로 변환하는 함수
    const formatNumberWithCommas = (number) => {
        if (typeof number !== "number") {
            return "0"; // 기본값 설정
        }
        return number.toLocaleString("ko-KR");
    };

    return (
        <div className="shopping-page-container">
            <Header />

            <div className="shopping-category-main-content">
                <aside className="category-sidebar">
                    {majorCategories.length > 0 ? (
                        majorCategories.map((major, index) => (
                            <div key={index} className="major-category">
                                <div
                                    className="major-category-header"
                                    onClick={() => handleMajorClick(major)}
                                >
                                    <span className="major-title">{major}</span>
                                    <span className={`category-arrow ${expandedMajor === major ? "down" : "right"}`}></span>
                                </div>
                                {expandedMajor === major && (
                                    <ul className="subcategory-list">
                                        {subCategories[major]?.map(sub => (
                                            <li
                                                key={sub.categorynum}
                                                className="subcategory-item"
                                                onClick={() => handleSubCategoryClick(sub.categorynum)}
                                            >
                                                {sub.subcategory}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>카테고리가 없습니다.</p>
                    )}
                </aside>

                <section className="category-product-info">
                    {/* 처음에는 전체 상품을 표시 */}
                    {allProducts.length > 0 && (
                        <div className="category-product-list">
                            {allProducts.map((product, index) => (
                                <div key={index} className="category-product-card" onClick={() => {
                                    console.log('Navigating to:', `/productDetail/${product.productnum}`);
                                    navigate(`/productDetail/${product.productnum}`);
                                }}>
                                    <img
                                        src={
                                            product.productmainimage.startsWith('https://')
                                                ? product.productmainimage
                                                : `${process.env.PUBLIC_URL}/productImg/${product.productmainimage}`
                                        }
                                        alt={product.productname}
                                        className="category-product-image"
                                        onError={(e) => {
                                            e.target.src = ex;
                                        }}
                                    />
                                    <h2 className="category-product-name">{product.productname}</h2>
                                    <p className="category-product-store">{product.storeName}</p>
                                    <p className="category-product-price">{formatNumberWithCommas(parseInt(product.productprice, 10))}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 카테고리 필터링된 상품들 */}
                    {products.length > 0 && (
                        <div className="category-product-list">
                            {products.map((product, index) => (
                                <div key={index} className="category-product-card" onClick={() => {
                                    console.log('Navigating to:', `/productDetail/${product.productnum}`);
                                    navigate(`/productDetail/${product.productnum}`);
                                }}>
                                    <img
                                        src={
                                            product.productmainimage.startsWith('https://')
                                                ? product.productmainimage
                                                : `${process.env.PUBLIC_URL}/productImg/${product.productmainimage}`
                                        }
                                        alt={product.productname}
                                        className="category-product-image"
                                        onError={(e) => {
                                            e.target.src = ex;
                                        }}
                                    />
                                    <h2 className="category-product-name">{product.productname}</h2>
                                    <p className="category-product-store">{product.storeName}</p>
                                    <p className="category-product-price">{formatNumberWithCommas(parseInt(product.productprice, 10))}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default ShoppingCategory;
