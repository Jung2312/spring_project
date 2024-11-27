import React, { useState, useEffect } from "react";
import "../css/shoppingCategory.css";
import Header from '../header.js'

function ShoppingCategory() {
    const [majorCategories, setMajorCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [expandedMajor, setExpandedMajor] = useState(null);
    const [products, setProducts] = useState([]); // 상품 데이터를 저장할 상태

    useEffect(() => {
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
                })
                .catch(err => console.error("Error fetching subcategories:", err));
        }
    };

    // 서브 카테고리 클릭 시 상품 데이터 불러오기
    const handleSubCategoryClick = (categorynum) => {
        fetch(`http://localhost:80/product/category/${categorynum}`)
            .then(response => response.json())
            .then(data => setProducts(data)) // 상품 데이터를 상태에 저장
            .catch(err => console.error("Error fetching products:", err));
    };

    return (
        <div className="shopping-page-container">
            {/* 헤더 */}
            <Header />

            {/* 메인 콘텐츠 */}
            <div className="shopping-category-main-content">
                {/* 카테고리 */}
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
                                                onClick={() => handleSubCategoryClick(sub.categorynum)} // 이벤트 핸들러 추가
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

                {/* 상품 정보 */}
                <section className="category-product-info">
                    {products.length > 0 && (
                        <div className="category-product-list">
                            {products.map((product) => (
                                <div key={product.productnum} className="category-product-card">
                                    <img
                                        src={product.productmainimage}
                                        alt={product.productname}
                                        className="category-product-image"
                                    />
                                    <h2 className="category-product-name">{product.productname}</h2>
                                    <p className="category-product-store">{product.storename}</p>
                                    <p className="category-product-price">{product.productprice}</p>
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
