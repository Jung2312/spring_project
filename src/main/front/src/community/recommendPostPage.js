import React, { useState } from "react";
import '../css/community.css';

function RecommendPostPage() {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedProduct, setSelectedProduct] = useState(""); // 선택한 상품 상태

    // 상품 데이터 (임의 데이터 예시)
    const products = [
        { id: 1, name: "35 x 20 테이블", orderDate: "2024.11.11" },
        { id: 2, name: "45 x 30 의자", orderDate: "2024.11.12" },
        { id: 3, name: "20 x 10 소파", orderDate: "2024.11.13" },
        { id: 4, name: "50 x 40 침대", orderDate: "2024.11.14" },
    ];

    // 페이지 당 보여줄 항목 수
    const itemsPerPage = 3;

    // 현재 페이지의 상품 목록 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className="recommendPostPageContainer">
            <div className="recommendPostPageBox">
                <p>사진</p>
                <div className="recommendPostImgContainer">
                    <input type="button"/>
                </div>

                <p>내용</p>
                <div></div>

                <p>해시태그</p>
                <p>최대 5개까지 등록 가능합니다.</p>
                <div></div>

                <p>상품 추가</p>
                <div></div>

                <div>
                    <span>상품 선택</span>
                    <select className="recommendPostPageSelect">
                        <option value="1">가구</option>
                        <option value="2">패브릭</option>
                    </select>
                </div>

                <div>
                    {currentProducts.map((product) => (
                        <div key={product.id} className="productItem">
                            <input
                                type="radio"
                                name="product"
                                value={product.id}
                                onChange={() => setSelectedProduct(product.id)}
                                checked={selectedProduct === product.id}
                            />
                            <img alt={product.name} src={`${process.env.PUBLIC_URL}/mypageImg/cardIcon.png` || ''}/>
                            <span>{product.name}</span>
                            <span>|</span>
                            <span>주문일: {product.orderDate}</span>
                        </div>
                    ))}

                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            이전
                        </button>
                        <span>
                        {currentPage} / {totalPages}
                    </span>
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            다음
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecommendPostPage;
