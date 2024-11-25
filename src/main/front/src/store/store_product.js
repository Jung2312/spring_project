import React, {useEffect, useState} from "react";

function StoreProduct({productData}) {
    const { productcount, productInfo } = productData;

    // productcount나 productInfo가 없으면 로딩 중 상태 표시
    if (!productInfo || productcount === null || productInfo.length === 0) {
        return <div>로딩중...</div>; // 로딩 중 메시지 또는 스피너
    }

    return (
        <div className="product-container">
            <div className="product-main-box">
                <div className="insert-product-btn-box">
                    <button className="insert-btn">등록</button>
                    <button className="delete-btn">삭제</button>
                </div>

                <div className="product-count-box count-box">
                    <span>전체 {productcount}개</span>
                </div>
                <div className="product-table-box table-box">
                    <table className="product-table">
                        <colgroup>
                            <col width="20%" />
                            <col width="60%" />
                            <col width="20%" />
                        </colgroup>
                        <thead>
                        <tr>
                            <th>상품번호</th>
                            <th>상품명</th>
                            <th>금액</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            productInfo.map((item, index) => {
                                sessionStorage.setItem("productnum", item.productnum);
                                return (
                                    <tr key={item.productnum}>
                                        <td>{item.productnum}</td>
                                        <td>{item.productname}</td>
                                        <td>{item.productprice} 원</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pagenation-box">
                {/* 페이지네이션 기능 (필요할 경우 활성화) */}
            </div>
        </div>
    );
}

export default StoreProduct;
