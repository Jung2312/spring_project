import React, { useState, useEffect } from "react";
import axios from "axios";

function StoreInventory({ productData, inventoryInfo }) {
    const { productcount, productInfo } = productData;
    const [inventoryCounts, setInventoryCounts] = useState([]);

    // 로딩 중 상태 처리
    if (productcount === null || productInfo.length === 0 || inventoryInfo.length === 0) {
        return <div>로딩중...</div>; // 로딩 중 메시지 또는 스피너
    }

    // 상품별로 재고를 매칭하여 inventoryInfo에서 해당 재고 정보를 찾아 표시
    const getInventoryCountForProduct = (productnum) => {
        const inventory = inventoryInfo.find(item => item.productnum === productnum);
        return inventory ? inventory.inventorycount : 0; // 해당 상품의 재고 없으면 0으로 처리
    };

    // 상품 별 재고 수량 변경
    const handleInventoryChange = (productnum, newCount) => {
        setInventoryCounts(prevState =>
            prevState.map(item =>
                item.productnum === productnum ? { ...item, inventorycount: newCount } : item
            )
        );
    };

    // + 버튼 클릭 시 재고 수량 증가
    const increaseInventory = (productnum) => {
        setInventoryCounts(prevState =>
            prevState.map(item =>
                item.productnum === productnum ? { ...item, inventorycount: item.inventorycount + 1 } : item
            )
        );
    };

    // - 버튼 클릭 시 재고 수량 감소
    const decreaseInventory = (productnum) => {
        setInventoryCounts(prevState =>
            prevState.map(item =>
                item.productnum === productnum ? { ...item, inventorycount: item.inventorycount - 1 } : item
            )
        );
    };

    // // 상품의 재고 정보를 상태로 초기화
    // useEffect(() => {
    //     const initialInventory = productInfo.map(product => {
    //         const inventory = getInventoryCountForProduct(product.productnum);
    //         return { productnum: product.productnum, inventorycount: inventory };
    //     });
    //     setInventoryCounts(initialInventory);
    // }, [productInfo, inventoryInfo]);

    // 서버로 재고 수량을 업데이트하는 함수
    const updateInventoryOnServer = (productnum, inventorycount) => {
        axios
            .put(`http://localhost:8080/inventory/updateCount/${productnum}?inventorycount=${inventorycount}`)
            .then((response) => {
                console.log("서버 응답:", response.data);
                alert(response.data); // 성공 메시지 알림
            })
            .catch((error) => {
                console.error("서버 에러:", error);
                alert("서버에서 재고 업데이트를 실패했습니다.");
            });
    };

    const handleSave = () => {
        inventoryCounts.forEach((inventory) => {
            const { productnum, inventorycount } = inventory;
            updateInventoryOnServer(productnum, inventorycount); // 각 상품별로 업데이트 요청
        });
        console.log("저장된 재고 수량:", inventoryCounts);
    };
    return (
        <div className="inventory-container">
            <div className="inventory-main-box">
                <div className="insert-inventory-btn-box">
                    <button className="insert-btn" onClick={handleSave}>저장</button>
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
                            productInfo.map((product, index) => {
                                // 해당 상품의 재고 수량을 가져오기
                                const inventoryCount = getInventoryCountForProduct(product.productnum);
                                return (
                                    <tr className="inventory-table-data-box" key={index}>
                                        <td className="inventory-table-item">{product.productnum}</td>
                                        <td className="inventory-table-item">{product.productname}</td>
                                        <td className="inventory-table-item">
                                            <div className="inventory-btn-box">
                                                <input className="inventory-del-btn" type="button" value="-" onClick={(e) => decreaseInventory(product.productnum)}/>
                                                <input
                                                    className="inventory-count-input"
                                                    type="number"
                                                    value={inventoryCount}
                                                    onChange={(e) => handleInventoryChange(product.productnum, e.target.value)}
                                                />
                                                <input className="inventory-add-btn" type="button" value="+" onClick={(e) => increaseInventory(product.productnum)}/>
                                            </div>
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
