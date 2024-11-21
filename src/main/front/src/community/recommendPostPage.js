import React, { useState } from "react";
import '../css/community.css';

function RecommendPostPage() {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedProduct, setSelectedProduct] = useState(""); // 선택한 상품 상태
    const [isProductBoxVisible, setProductBoxVisible] = useState(false); // 상품 선택 박스 상태
    const [hashtags, setHashtags] = useState([]); // 해시태그 상태
    const [newTag, setNewTag] = useState(""); // 새로운 해시태그 입력 상태

    // 상품 데이터
    const products = [
        { id: 1, name: "35 x 20 테이블", orderDate: "2024.11.11" },
        { id: 2, name: "45 x 30 의자", orderDate: "2024.11.12" },
        { id: 3, name: "20 x 10 소파", orderDate: "2024.11.13" },
        { id: 4, name: "50 x 40 침대", orderDate: "2024.11.14" },
    ];

    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleAddHashtag = () => {
        if (newTag.trim() && hashtags.length < 5) {
            setHashtags([...hashtags, newTag.trim()]);
            setNewTag("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 기본 동작 방지
            handleAddHashtag();
        } else if (e.key === "Backspace" && newTag === "" && hashtags.length > 0) {
            // 해시태그 삭제 (Backspace로 마지막 해시태그 제거)
            const updatedHashtags = [...hashtags];
            updatedHashtags.pop();
            setHashtags(updatedHashtags);
        }
    };

    const handleInputChange = (e) => {
        setNewTag(e.target.value);
    };

    // 해시태그 삭제 함수
    const handleDeleteHashtag = (index) => {
        const updatedHashtags = hashtags.filter((_, i) => i !== index);
        setHashtags(updatedHashtags);
    };

    return (
        <div className="recommendPostPageContainer">
            <div className="recommendPostPageBox">
                <p className="recommendPostText">사진</p>
                <div className="recommendPostImgContainer">
                    <input type="button" value="사진 첨부" className="recommendPostImgBtn" />
                </div>

                <p className="recommendPostText">내용</p>
                <textarea className="recommendPostContentContainer"></textarea>

                <p className="recommendPostText">해시태그</p>
                <p>최대 5개까지 등록 가능합니다.</p>
                <div className="hashtagInputContainer">
                    <div className="hashtagInputWrapper">
                        {hashtags.map((tag, index) => (
                            <span key={index} className="hashtagInInput">
                                #{tag}
                                <button
                                    onClick={() => handleDeleteHashtag(index)}
                                    className="deleteHashtagBtn"
                                >
                                    x
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            className="hashtagInput"
                            value={newTag}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder={hashtags.length < 5 ? "해시태그 입력" : ""}
                            disabled={hashtags.length >= 5} // 최대 개수 제한
                        />
                    </div>
                </div>

                <p className="recommendPostText">상품 추가</p>
                <button
                    className="recommendPostInsertProduct"
                    onClick={() => setProductBoxVisible(!isProductBoxVisible)}
                >
                    +
                </button>
                <input type="button" value="작성하기" className="recommendPostBtn" />
                {isProductBoxVisible && (
                    <div className="recommendPostSelectProduct">
                        <span className="recommendPostText">상품 선택</span>
                        <select className="recommendPostPageSelect">
                            <option value="1">가구</option>
                            <option value="2">패브릭</option>
                        </select>

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
                                    <img className="recommendPostSelectImg" alt={product.name} src={`${process.env.PUBLIC_URL}/mypageImg/cardIcon.png` || ''} />
                                    <span className="recommendPostSelectImgText">{product.name}</span>
                                    <span className="recommendPostSelectImgText">|</span>
                                    <span className="recommendPostSelectImgText">주문일 : {product.orderDate}</span>
                                </div>
                            ))}

                            <div className="pagination">
                                <button
                                    className="recommendPostPrevBtn"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/recommendImg/prev.png` || ''} />
                                </button>
                                <button className="recommendPostCurrentPage">{currentPage}</button>
                                <button
                                    className="recommendPostNextBtn"
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/recommendImg/next.png` || ''} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecommendPostPage;
