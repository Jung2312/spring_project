import React from "react";

function StoreInventory() {
    return (
        <div className="inventory-container">
            <div className="inventory-main-box">
                <div className="insert-inventory-btn-box">
                    <button className="insert-btn">등록</button>
                    <button className="delete-btn">삭제</button>
                </div>

                <div className="inventory-count-box count-box">
                    <span>전체 {}개</span>
                </div>
                <div className="inventory-table-box table-box">
                    <table className="inventory-table">
                        <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                        </colgroup>
                        <thead>
                        <tr>
                            <th>상품번호</th>
                            <th>상품명</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>품번1</td>
                            <td>상품명1</td>
                        </tr>
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
