import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../css/shoppingInformation.css";
import Header from '../header.js';
import ex from "../img/product_basic.png";

const ShoppingInformation = () => {
    const { storename } = useParams(); // URL에서 storename 파라미터 추출

    const [storeInfo, setStoreInfo] = useState(null); // 상점 정보를 저장하는 상태
    const [categories, setCategories] = useState([]); // 모든 카테고리를 저장하는 상태
    const [uniqueMajorCategories, setUniqueMajorCategories] = useState([]); // 중복 제거된 메인 카테고리 상태
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); // 선택된 서브 카테고리
    const [products, setProducts] = useState([]); // 상품 정보를 저장하는 상태
    const [activeCategory, setActiveCategory] = useState(null); // 서브카테고리 펼치기/닫기 상태

    // 전화번호 포맷 변환 함수
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '';
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    // 상점 정보 가져오기
    useEffect(() => {
        fetch(`http://localhost:80/store?storename=${encodeURIComponent(storename)}`)
            .then((response) => response.json())
            .then((data) => setStoreInfo(data)) // 상점 정보를 상태에 저장
            .catch((error) => console.error('Error fetching store info:', error));
    }, [storename]);

    // 상점에 해당하는 모든 카테고리 가져오기
    useEffect(() => {
        if (storeInfo) {
            fetch(`http://localhost:80/api/categories?storenum=${storeInfo.storenum}`)
                .then((response) => response.json())
                .then((data) => {
                    setCategories(data);
                    // 중복 제거된 메인 카테고리 설정
                    const majors = [...new Map(data.map(item => [item.majorcategory, item])).values()];
                    setUniqueMajorCategories(majors);
                })
                .catch((error) => console.error('Error fetching categories:', error));
        }
    }, [storeInfo]);

    // 선택된 서브 카테고리에 해당하는 상품 가져오기
    useEffect(() => {
        if (selectedSubCategory !== null && storeInfo) {
            fetch(`http://localhost:80/product/category/${selectedSubCategory}/store/${storeInfo.storenum}`)
                .then((response) => response.json())
                .then((data) => setProducts(data))
                .catch((error) => console.error('Error fetching products:', error));
        }
    }, [selectedSubCategory, storeInfo]);

    return (
        <div className="shoppingInform-page">
            <Header />

            {/* 상점 정보 배너 */}
            <div className="shoppingInform-banner">
                {storeInfo && (
                    <div className="shoppingInform-banner-content">
                        <h1 className={"shoppingInform-banner-storename"}>{storeInfo.storename}</h1>
                        <p className={"shoppingInform-banner-storenotice"}>notice: {storeInfo.storenotice}</p>
                        <p className={"shoppingInform-banner-storeaddress"}>addr: {storeInfo.storeaddress}</p>
                        <p className={"shoppingInform-banner-storephone"}>tel: {formatPhoneNumber(storeInfo.storephone)}</p>
                    </div>
                )}
            </div>

            <div className="shoppingInform-content">
                {/* 왼쪽 카테고리 메뉴 */}
                <aside className="shoppingInform-categories">
                    {uniqueMajorCategories.map((category) => (
                        <div key={category.categorynum} className="shoppingInform-category">
                            <div
                                className="shoppingInform-major-category"
                                onClick={() => setActiveCategory(activeCategory === category.majorcategory ? null : category.majorcategory)}
                            >
                                <span className="shoppingInform-major-title">{category.majorcategory}</span>
                                <span
                                    className={`shoppingInform-category-arrow ${activeCategory === category.majorcategory ? "down" : "right"}`}
                                    onClick={() => setActiveCategory(activeCategory === category.majorcategory ? null : category.majorcategory)}
                                ></span>
                            </div>
                            {activeCategory === category.majorcategory && (
                                <ul className="shoppingInform-subcategory-list">
                                    {categories
                                        .filter(sub => sub.majorcategory === category.majorcategory)
                                        .map((subCategory) => (
                                            <li
                                                key={subCategory.categorynum}
                                                className="shoppingInform-subcategory-item"
                                                onClick={() => setSelectedSubCategory(subCategory.categorynum)}
                                            >
                                                {subCategory.subcategory}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </aside>

                {/* 오른쪽 상품 정보 */}
                <div className="shoppingInform-products">
                    {products.length > 0 && (
                        <div className="shoppingInform-product-list">
                            {products.map((product, index) => (
                                index < 4 && (
                                    <div key={product.productnum} className="shoppingInform-product-card">
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
                                            }} // 이미지 오류 처리
                                        />
                                        <h1 className="shoppingInform-product-storename">{storeInfo.storename}</h1>
                                        <p className="shoppingInform-product-name">{product.productname}</p>
                                        <p className="shoppingInform-product-price">{product.productprice.toLocaleString()}원</p>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingInformation;
