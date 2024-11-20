import React from "react";
import '.././css/store.css'
// import Pagination from "react-js-pagination";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/*const product = (

);*/

function StoreProduct() {
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
                        <li className="category-item"><a href="" id="product-manage"><span>상품 관리</span></a></li>
                        <li className="category-item"><a href="" id="inventory-manage"><span>재고 관리</span></a></li>
                        <li className="category-item"><a href="" id="sales-status"><span>매출 현황</span></a></li>
                        <li className="category-item"><a href="" id="change-info"><span>정보 변경</span></a></li>
                    </ul>
                </div>
                <div className="product-container store-item">
                    <div className="product-main-box">
                        <div className="insert-product-btn-box">
                            <button className="insert-btn">등록</button>
                            <button className="delete-btn">삭제</button>
                        </div>

                        <div className="product-count-box count-box"><span>전체 {}개</span></div>
                        <div className="product-table-box table-box">
                            <table className="product-table">
                                <colgroup>
                                    <col width="20%"/>
                                    <col width="60%"/>
                                    <col width="20%"/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>상품번호</th>
                                    <th>상품명</th>
                                    <th>금액</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>품번1</td>
                                    <td>상품명1</td>
                                    <td>19,000</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagenation-box">
                        {/*<Pagination*/}
                        {/*    activePage={1}*/}
                        {/*    itemsCountPerPage={10}*/}
                        {/*    totalItemsCount={450}*/}
                        {/*    pageRangeDisplayed={5}*/}
                        {/*    onChange={this.handlePageChange.bind(this)}*/}
                        {/*    previousLabel={<FiChevronLeft />} //이전*/}
                        {/*    nextLabel={<FiChevronRight />} //다음*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreProduct;
