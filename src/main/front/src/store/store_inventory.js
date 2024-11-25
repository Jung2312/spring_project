import React, {useEffect, useState} from "react";

function StoreInventory({inventoryData}) {
    const { productcount, productInfo, inventoryInfo } = inventoryData;

    // productcount나 productInfo가 없으면 로딩 중 상태 표시
    if (productcount === null || productInfo.length === 0 || inventoryInfo.length === 0) {
        return <div>로딩중...</div>; // 로딩 중 메시지 또는 스피너
    }

    return (
        <div className="inventory-container">
            <div className="inventory-main-box">
                <div className="insert-inventory-btn-box">
                    <button className="insert-btn">등록</button>
                    <button className="delete-btn">삭제</button>
                </div>

                <div className="inventory-count-box count-box">
                    <span>전체 {productcount}개</span>
                </div>
                <div className="inventory-table-box table-box">
                    <table className="inventory-table">
                        <colgroup>
                            <col width="20%" />
                            <col width="60%" />
                            <col width="20%" />
                        </colgroup>
                        <thead>
                        <tr>
                            <th>상품번호</th>
                            <th>상품명</th>
                            <th>재고</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            productInfo.map((item, index) => {
                                return (
                                    <tr className="inventory-table-data-box" key={index}>
                                        <td className="inventory-table-item">{item.productnum}</td>
                                        <td className="inventory-table-item">{item.productname}</td>
                                        <td className="inventory-table-item">
                                            {
                                                inventoryInfo.map((item, index) => {
                                                    return (
                                                        <div className="inventory-btn-box" key={index}>
                                                            <input className="inventory-del-btn" type="button" value="-"/>
                                                            <input className="inventory-count-input" type="number" value={item.inventorycount}/>
                                                            <input className="inventory-add-btn" type="button" value="+"/>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pagenation-box">
                {/* 페이지네이션 (필요하면 여기에 추가) */}
            </div>
        </div>
    );
}

export default StoreInventory;
