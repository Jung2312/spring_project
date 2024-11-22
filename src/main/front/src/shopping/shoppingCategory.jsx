import React, { useState, useEffect } from "react";
import "../css/shoppingCategory.css";

function ShoppingCategory() {
    const [majorCategories, setMajorCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [expandedMajor, setExpandedMajor] = useState(null);

    // majorCategory 목록 가져오기
    useEffect(() => {
        fetch("http://localhost:80/api/categories/major")
            .then(response => response.json())
            .then(data => setMajorCategories(data))
            .catch(err => console.error("Error fetching major categories:", err));
    }, []);

    // 서브카테고리 가져오기 및 상태 업데이트
    const handleMajorClick = (major) => {
        if (expandedMajor === major) {
            setExpandedMajor(null); // 이미 열려 있으면 닫기
        } else {
            fetch(`http://localhost:80/api/categories/${major}/sub`)
                .then(response => response.json())
                .then(data => {
                    // null 데이터 제거
                    const filteredData = data.filter(sub => sub.subcategory !== null);
                    setSubCategories(prev => ({ ...prev, [major]: filteredData }));
                    setExpandedMajor(major);
                })
                .catch(err => console.error("Error fetching subcategories:", err));
        }
    };

    return (
        <div className="shopping-category-container">
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
                                        <li key={sub.categorynum} className="subcategory-item">
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
        </div>
    );
}

export default ShoppingCategory;