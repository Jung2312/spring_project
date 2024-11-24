import React, {useEffect, useState} from "react";

function StoreProduct(props) {
    return (
        <div className="product-container">
            <div className="product-main-box">
                <div className="insert-product-btn-box">
                    <button className="insert-btn">등록</button>
                    <button className="delete-btn">삭제</button>
                </div>

                <div className="product-count-box count-box">
                    <span>전체 {props.productcount}개</span>
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
                        {/*<tr>
                            <td>품번1</td>
                            <td>상품명1</td>
                            <td>19,000</td>
                        </tr>*/}
                        {
                            Array(props.productcount).fill(
                                <tr>
                                    <td>{props.productnum}</td>
                                    <td>{props.productname}</td>
                                    <td>{props.productprice}</td>
                                </tr>
                            )
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
