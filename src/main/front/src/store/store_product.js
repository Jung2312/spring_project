import React, { useState, useEffect } from "react";

function StoreProduct({ productData }) {
    const { productcount, productInfo } = productData;
    const [modalOpen, setModalOpen] = useState(false); // 상품 등록 모달 상태
    const [editModalOpen, setEditModalOpen] = useState(false); // 수정 모달 상태
    const [productName, setProductName] = useState(""); // 등록할 상품명
    const [productImage, setProductImage] = useState(null); // 등록할 이미지
    const [productImagePreview, setProductImagePreview] = useState(null);
    const [productPrice, setProductPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [majorCategories, setMajorCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [editProduct, setEditProduct] = useState({}); // 선택한 상품 정보

    useEffect(() => {
        const fetchMajorCategories = async () => {
            try {
                const response = await fetch("http://localhost:80/api/categories/major");
                const data = await response.json();
                setMajorCategories(data);
            } catch (error) {
                console.error("주요 카테고리 데이터를 불러오는 데 실패했습니다:", error);
            }
        };

        fetchMajorCategories();
    }, []);

    const fetchSubCategories = async (majorCategory) => {
        try {
            const response = await fetch(`http://localhost:80/api/categories/${majorCategory}/sub`);
            const data = await response.json();
            const validSubCategories = data.filter((category) => category.subcategory !== null);
            setSubCategories(validSubCategories);
        } catch (error) {
            console.error("하위 카테고리 데이터를 불러오는 데 실패했습니다:", error);
        }
    };

    const handleMajorCategoryChange = (e) => {
        const majorCategory = e.target.value;
        setSelectedCategory(majorCategory);
        fetchSubCategories(majorCategory);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProductImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProductImagePreview(null);
        }
    };

    const handleRegisterProduct = async () => {
        console.log("Selected Sub Category: ", selectedSubCategory);

        const storenum = sessionStorage.getItem("storenum");

        console.log("storenum 값 확인:", storenum); // 값이 올바른지 확인

        const formData = new FormData();

        // Ensure valid image file
        if (productImage && productImage instanceof File) {
            formData.append("image", productImage);
        } else {
            console.error("Valid image file is not provided.");
        }

        // JSON.stringify로 product 정보 추가
        formData.append("product", JSON.stringify({ productname: productName, productprice: productPrice }));

        formData.append("storenum", storenum);
        formData.append("categorynum", selectedSubCategory ? selectedSubCategory : "0");

        console.log("FormData Contents:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }

        try {
            const response = await fetch("http://localhost:80/product/add", {
                method: "POST",
                body: formData,
            });

            console.log("Server Response: ", response.status);

            if (response.ok) {
                alert("상품 등록 성공");
                setModalOpen(false);
            } else {
                alert("상품 등록 실패");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleCheckboxChange = (e, productNum) => {
        if (e.target.checked) {
            setSelectedProducts((prev) => [...prev, productNum]); // 체크된 상품 추가
        } else {
            setSelectedProducts((prev) => prev.filter((num) => num !== productNum)); // 체크 해제 시 제거
        }
    };

    const handleDeleteProducts = async () => {
        if (selectedProducts.length === 0) {
            alert("삭제할 상품을 선택하세요.");
            return;
        }

        try {
            const storenum = sessionStorage.getItem("storenum"); // 스토어 번호 가져오기
            if (!storenum) {
                alert("스토어 번호를 찾을 수 없습니다.");
                return;
            }

            for (const productnum of selectedProducts) {
                const response = await fetch(
                    `http://localhost:80/product/delete?productnum=${productnum}&storenum=${storenum}`, // 수정된 부분
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    alert(`상품 삭제 실패: 상품번호 ${productnum}`); // 수정된 부분
                    return;
                }
            }

            alert("선택한 상품이 삭제되었습니다.");
            setSelectedProducts([]);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting products:", error);
            alert("상품 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleEditButtonClick = () => {
        if (selectedProducts.length !== 1) {
            alert("수정할 상품을 하나만 선택하세요.");
            return;
        }

        const productToEdit = productInfo.find(
            (item) => item.productnum === selectedProducts[0]
        );

        if (productToEdit) {
            setEditProduct({
                ...productToEdit,
                productname: productToEdit.productname,
                productprice: productToEdit.productprice,
                categorynum: productToEdit.categorynum || '0',
                productImage: productToEdit.productImage || '',
            });
            setEditModalOpen(true);
        }
    };

    const handleUpdateProduct = async () => {
        console.log("Selected Sub Category: ", selectedSubCategory);

        const storenum = sessionStorage.getItem("storenum");

        console.log("storenum 값 확인:", storenum); // 값이 올바른지 확인

        const formData = new FormData();

        // Ensure valid image file
        if (editProduct.productImage && editProduct.productImage instanceof File) {
            formData.append("image", editProduct.productImage);
        } else {
            console.error("Valid image file is not provided.");
        }

        // JSON.stringify로 product 정보 추가
        formData.append(
            "product",
            JSON.stringify({
                productnum: editProduct.productnum,
                productname: editProduct.productname,
                productprice: editProduct.productprice,
            })
        );

        formData.append("storenum", storenum);
        formData.append("categorynum", selectedSubCategory ? selectedSubCategory : "0");

        console.log("FormData Contents for update:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }

        try {
            const response = await fetch("http://localhost:80/product/update", {
                method: "PUT",
                body: formData,
            });

            console.log("Response Status:", response.status);

            if (response.ok) {
                alert("상품이 수정되었습니다.");
                setEditModalOpen(false);
                window.location.reload();
            } else {
                alert("상품 수정 실패");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    return (
        <div className="product-container">
            <div className="product-main-box">
                <div className="insert-product-btn-box">
                    <button className="insert-btn" onClick={() => setModalOpen(true)}>등록</button>
                    <button className="delete-btn" onClick={handleDeleteProducts}>삭제</button>
                    <button className="edit-btn" onClick={handleEditButtonClick}>수정</button>
                </div>

                <div className="product-count-box count-box">
                    <span>전체 {productcount}개</span>
                </div>
                <div className="product-table-box table-box">
                    <table className="product-table">
                        <colgroup>
                            <col width="20%"/>
                            <col width="50%"/>
                            <col width="20%"/>
                            <col width="20%" />
                        </colgroup>
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>상품번호</th>
                            <th>상품명</th>
                            <th>금액</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            productInfo.map((item, index) => (
                                <tr key={item.productnum}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(e, item.productnum)}
                                        />
                                    </td>
                                    <td>{item.productnum}</td>
                                    <td>{item.productname}</td>
                                    <td>{item.productprice} 원</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalOpen && (
                <div className="store-insert-modal">
                    <div className="store-insert-modal-content">
                        <h2>상품 등록</h2>
                        <label>
                            상품명:
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="상품명을 입력하세요"
                            />
                        </label>
                        <label>
                            상품 이미지:
                            <input type="file" onChange={handleImageChange} />
                            {productImagePreview && (
                                <div className="store-insert-image-preview">
                                    <img src={productImagePreview} alt="상품 미리보기" />
                                </div>
                            )}
                        </label>
                        <label>
                            상품 가격:
                            <input
                                type="number"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                placeholder="상품 가격을 입력하세요"
                            />
                        </label>
                        <label>
                            주요 카테고리:
                            <select onChange={handleMajorCategoryChange} value={selectedCategory}>
                                <option value="">주요 카테고리 선택</option>
                                {majorCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            하위 카테고리:
                            <select
                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                value={selectedSubCategory}
                            >
                                <option value="">하위 카테고리 선택</option>
                                {subCategories.map((category) => (
                                    <option key={category.categorynum} value={category.categorynum}>
                                        {category.subcategory}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button class="submit-button" onClick={handleRegisterProduct}>등록하기</button>
                        <button class="close-button" onClick={() => setModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}

            {editModalOpen && (
                <div className="store-insert-modal">
                    <div className="store-insert-modal-content">
                        <h2>상품 수정</h2>

                        {/* 상품명 입력 */}
                        <label>
                            상품명:
                            <input
                                type="text"
                                value={editProduct.productname}
                                onChange={(e) => setEditProduct({...editProduct, productname: e.target.value})}
                            />
                        </label>

                        {/* 상품 가격 입력 */}
                        <label>
                            상품 가격:
                            <input
                                type="number"
                                value={editProduct.productprice}
                                onChange={(e) => setEditProduct({...editProduct, productprice: e.target.value})}
                            />
                        </label>

                        {/* 상품 이미지 업로드 */}
                        <label>
                            상품 이미지:
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setEditProduct({ ...editProduct, productImage: e.target.result });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>

                        {/* 이미지 미리보기 */}
                        {editProduct.productImage && (
                            <div className="image-preview-container">
                                <h4>이미지 미리보기:</h4>
                                <img
                                    src={editProduct.productImage}
                                    alt="미리보기"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        border: '1px solid #000',
                                    }}
                                />
                            </div>
                        )}

                        {/* 카테고리 선택 */}
                        <label>
                            주요 카테고리:
                            <select onChange={handleMajorCategoryChange} value={selectedCategory}>
                                <option value="">주요 카테고리 선택</option>
                                {majorCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            하위 카테고리:
                            <select
                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                value={selectedSubCategory}
                            >
                                <option value="">하위 카테고리 선택</option>
                                {subCategories.map((category) => (
                                    <option key={category.categorynum} value={category.categorynum}>
                                        {category.subcategory}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* 수정 및 닫기 버튼 */}
                        <button className="submit-button" onClick={handleUpdateProduct}>수정</button>
                        <button className="close-button" onClick={() => setEditModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default StoreProduct;