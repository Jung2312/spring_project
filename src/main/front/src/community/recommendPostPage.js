import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/community.css';
import { useNavigate } from 'react-router-dom';

function RecommendPostPage() {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedProduct, setSelectedProduct] = useState(""); // 선택한 상품 상태
    const [isProductBoxVisible, setProductBoxVisible] = useState(false); // 상품 선택 박스 상태
    const [hashtags, setHashtags] = useState([]); // 해시태그 상태
    const [newTag, setNewTag] = useState(""); // 새로운 해시태그 입력 상태
    const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 상태
    const [postData, setPostData] = useState({ posttitle: "", postcontent: "" }); // 게시글 데이터
    const [products, setProducts] = useState([]); // 상품 데이터
    const navigate = useNavigate();

    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // 로그인 여부 확인
    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        if (!userid) {
            alert("로그인이 필요합니다.");
            window.location.href = "/login";
        } else {
            navigate('/recommend/post');
            // userid로 주문한 상품 가져오기
            axios.get(`/payment/orders?userid=${userid}`)
                .then((response) => setProducts(response.data))
                .catch((error) => console.error("상품 불러오기 실패", error));
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result); // 미리보기 설정
            reader.readAsDataURL(file);
        }
    };


    const handleAddHashtag = () => {
        if (newTag.trim() && hashtags.length < 5) {
            setHashtags([...hashtags, newTag.trim()]);
            setNewTag("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddHashtag();
        } else if (e.key === "Backspace" && newTag === "" && hashtags.length > 0) {
            const updatedHashtags = [...hashtags];
            updatedHashtags.pop();
            setHashtags(updatedHashtags);
        }
    };

    const handleInputChange = (e) => {
        setNewTag(e.target.value);
    };

    const handlePostDataChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleSubmit = () => {
        const userid = sessionStorage.getItem("userid");
        if (!userid) return alert("로그인이 필요합니다.");

        const formData = new FormData();
        formData.append("file", document.getElementById("fileInput").files[0]);
        formData.append("postData", JSON.stringify({
            userid,
            posttitle: postData.posttitle,
            postcontent: postData.postcontent,
            hashtaglist: hashtags.join(","),
            paynum: 1,
        }));

        axios.post("/recommend/post", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(() => {
                alert("게시글이 작성되었습니다.");
                window.location.reload();
            })
            .catch((error) => console.error("게시글 작성 실패", error));
    };

    return (
        <div className="recommendPostPageContainer">
            <div className="recommendPostPageBox">
                <p className="recommendPostText">사진</p>
                <div
                    className="recommendPostImgContainer"
                    style={{
                        backgroundImage: previewImage ? `url(${previewImage})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <input
                        type="file"
                        id="fileInput"
                        className="recommendPostImgBtn"
                        onChange={handleFileChange}
                    />
                    {!previewImage && <span>사진 첨부</span>} {/* 미리보기가 없을 때 기본 텍스트 */}
                </div>

                <p className="recommendPostText">제목</p>
                <input
                    type="text"
                    name="posttitle"
                    className="hashtagInputWrapper"
                    value={postData.posttitle}
                    onChange={handlePostDataChange}
                />

                <p className="recommendPostText">내용</p>
                <textarea
                    name="postcontent"
                    className="recommendPostContentContainer"
                    value={postData.postcontent}
                    onChange={handlePostDataChange}
                />

                <p className="recommendPostText">해시태그</p>
                <p>최대 5개까지 등록 가능합니다.</p>
                <div className="hashtagInputContainer">
                    <div className="hashtagInputWrapper">
                        {hashtags.map((tag, index) => (
                            <span key={index} className="hashtagInInput">
                                #{tag}
                                <button
                                    onClick={() => setHashtags(hashtags.filter((_, i) => i !== index))}
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
                            disabled={hashtags.length >= 5}
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
                <input
                    type="button"
                    value="작성하기"
                    className="recommendPostBtn"
                    onClick={handleSubmit}
                />

                {isProductBoxVisible && (
                    <div className="recommendPostSelectProduct">
                        <span className="recommendPostText">상품 선택</span>
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
                                    <span className="recommendPostSelectImgText">{product.name}</span>
                                    <span className="recommendPostSelectImgText">|</span>
                                    <span className="recommendPostSelectImgText">주문일: {product.orderDate}</span>
                                </div>
                            ))}
                            <div className="pagination">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="recommendPostPrevBtn"
                                >
                                    이전
                                </button>
                                <button className="recommendPostCurrentPage">{currentPage}</button>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="recommendPostNextBtn"
                                >
                                    다음
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
