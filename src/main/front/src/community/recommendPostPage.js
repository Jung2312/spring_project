import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/community.css';
import { useNavigate } from 'react-router-dom';
import Header from "../header";

function RecommendPostPage() {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedProduct, setSelectedProduct] = useState(""); // 선택한 상품 상태
    const [isProductBoxVisible, setProductBoxVisible] = useState(false); // 상품 선택 박스 상태
    const [hashtags, setHashtags] = useState([]); // 해시태그 상태
    const [newTag, setNewTag] = useState(""); // 새로운 해시태그 입력 상태
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
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
            axios.get("http://localhost:80/payment/orders", {
                params: { userid: userid },
            })
            .then((response) => {
                if (response.data.orders) {
                    setProducts(response.data.orders); // orders 배열을 직접 상태로 저장
                } else {
                    console.error("데이터 구조를 확인하세요:", response.data);
                }
            })
            .catch((error) => console.error("상품 불러오기 실패", error));
        }
    }, []);

    // 파일 선택 처리
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
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

    const goRecommed = () => {
        navigate('/recommend');
    };

    const recommendPostSubmit = async () => {
        const userid = sessionStorage.getItem("userid");
        if (!userid) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!selectedProduct) {
            alert("상품을 선택해주세요.");
            return;
        }

        if (!selectedFile) {
            alert("사진을 선택해주세요.");
            return;
        }

        // FormData 객체 생성
        const formData = new FormData();
        formData.append("file", selectedFile); // 파일 추가
        formData.append(
            "postData",
            JSON.stringify({
                userid,
                posttitle: postData.posttitle,
                postcontent: postData.postcontent,
                hashtaglist: hashtags.join(","),
                paynum: selectedProduct,
            })
        );

        try {
            const response = await fetch("http://localhost:80/recommend/post", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("작성되었습니다.");
                setSelectedFile(null);
                setPreviewImage(null);
                navigate("/recommend");
            } else {
                throw new Error("작성 실패. 다시 시도해주세요.");
            }
        } catch (err) {
            console.error(err);
            alert("작성 중 문제가 발생했습니다.");
        }
    };


    return (
        <div>
            <Header/>
            <div className="recommendPostPageContainer">
                <div className="recommendPostPageBox">
                    <p className="recommendPostTitleText">인테리어 추천</p>
                    <p className="recommendPostTitleText">사진</p>

                    <div className="recommendPostImgContainer">
                        <div
                            className="recommendPostImgPreview"
                            style={{
                                backgroundImage: previewImage ? `url(${previewImage})` : "none",
                            }}
                        />
                        <label htmlFor="fileInput" className="customFileUpload">
                            파일 선택
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            className="recommendPostImgBtn"
                            onChange={handleFileChange}
                        />
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
                        onClick={recommendPostSubmit}
                    />

                    {isProductBoxVisible && (
                        <div className="recommendPostSelectProduct">
                            <span className="recommendPostText">상품 선택</span>
                            <div>
                                {currentProducts.map((product, index) => (
                                    <div key={index} className="productItem">
                                        <input
                                            type="radio"
                                            name="product"
                                            value={product.payNum} // 실제 데이터 필드 이름 사용
                                            onChange={() => setSelectedProduct(product.payNum)}
                                            checked={selectedProduct === product.payNum}
                                        />
                                        <img src={product.productMainImage} className="recommendPostSelectImg"/>
                                        <span className="recommendPostSelectImgText">{product.productName}</span>
                                        <span className="recommendPostSelectImgText">|</span>
                                        <span className="recommendPostSelectImgText">주문일: {product.payDate}</span>
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
        </div>
    );
}

export default RecommendPostPage;
