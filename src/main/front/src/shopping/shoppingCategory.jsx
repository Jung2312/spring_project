import React, { useState, useEffect } from "react";
import "../css/shoppingCategory.css";
import ex from '../img/product_basic.png';
import Header from '../header.js';

function ShoppingCategory() {
    const [majorCategories, setMajorCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [expandedMajor, setExpandedMajor] = useState(null);
    const [products, setProducts] = useState([]);

    const selectCateogory = sessionStorage.getItem("selectedCategory");

    useEffect(() => {
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

                    // 세션 카테고리가 존재하는 경우 첫 번째 서브카테고리로 자동 선택
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
            .then(data => setProducts(data))
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
                    {products.length > 0 && (
                        <div className="category-product-list">
                            {products.map((product, index) => (
                                <div key={index} className="category-product-card">
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
