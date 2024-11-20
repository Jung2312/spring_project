import React from "react";
import '.././css/store.css'

function StoreInventory(){
    return (
        <div className="container">
            <header className="store-header">
                <div className="logo-box">
                    <a href="">나만의집</a>
                </div>
                <div className="store-name-box">
                    <span className="store-name">스토어이름</span>
                </div>
            </header>
            <div className="main-contents">
                <div className="floating-banner-box store-item">
                    <ul className="manage-category-box">
                        <li className="category-item"><a href="" id="inventory-manage"><span>상품 관리</span></a></li>
                        <li className="category-item"><a href="" id="inventory-manage"><span>재고 관리</span></a></li>
                        <li className="category-item"><a href="" id="sales-status"><span>매출 현황</span></a></li>
                        <li className="category-item"><a href="" id="change-info"><span>정보 변경</span></a></li>
                    </ul>
                </div>
                <div className="inventory-container store-item">
                    <div className="inventory-main-box">
                        <div className="insert-inventory-btn-box">
                            <button className="insert-btn">등록</button>
                            <button className="delete-btn">삭제</button>
                        </div>

                        <div className="inventory-count-box count-box"><span>전체 {}개</span></div>
                        <div className="inventory-table-box table-box">
                            <table className="inventory-table">
                                <colgroup>
                                    <col width="20%"/>
                                    <col width="80%"/>
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreInventory;
