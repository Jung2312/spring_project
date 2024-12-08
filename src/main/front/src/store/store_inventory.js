import React, { useState, useEffect } from "react";
import axios from "axios";

function StoreInventory({ productData, inventoryInfo }) {
    const { productcount, productInfo } = productData;
    const [inventoryCounts, setInventoryCounts] = useState([]);

    // 초기 재고 상태 설정
    useEffect(() => {
        if (inventoryInfo.length > 0) {
            const initialCounts = productInfo.map(product => {
                const inventory = inventoryInfo.find(item => item.productnum === product.productnum);
                return { productnum: product.productnum, count: inventory ? inventory.inventorycount : 0 };
            });
            setInventoryCounts(initialCounts);
        }
    }, [productInfo, inventoryInfo]);

    // 로딩 중 상태 처리
    if (productcount === null || productInfo.length === 0 || inventoryInfo.length === 0) {
        return <div>로딩중...</div>;
    }

    // 특정 상품의 재고 업데이트
    const updateInventoryCount = (productnum, newCount) => {
        setInventoryCounts(prevCounts =>
            prevCounts.map(item =>
                item.productnum === productnum ? { ...item, count: Math.max(0, newCount) } : item
            )
        );
    };

    // 재고 수량 증가
    const handleIncrement = (productnum) => {
        const currentItem = inventoryCounts.find(item => item.productnum === productnum);
        if (currentItem) {
            updateInventoryCount(productnum, currentItem.count + 1);
        }
    };

    // 재고 수량 감소
    const handleDecrement = (productnum) => {
        const currentItem = inventoryCounts.find(item => item.productnum === productnum);
        if (currentItem) {
            updateInventoryCount(productnum, currentItem.count - 1);
        }
    };

    // 입력값 변경 처리
    const handleInputChange = (productnum, newCount) => {
        updateInventoryCount(productnum, Number(newCount));
    };

    // 저장 버튼 클릭 시 서버에 데이터 전송
    const handleInventorySubmit = async () => {
        try {
            // 모든 상품에 대해 개별적으로 요청 전송
            const requests = inventoryCounts.map(item =>
                axios.put(`http://localhost:80/inventory/updateCount/${item.productnum}`, {
                    inventorycount: item.count, // 데이터를 JSON 형식으로 전달
                })
            );

            const responses = await Promise.allSettled(requests); // 모든 요청 병렬 처리
            const failedUpdates = responses.filter(res => res.status === "rejected");

            if (failedUpdates.length === 0) {
                alert("모든 재고가 성공적으로 업데이트되었습니다.");
            } else {
                alert(`${failedUpdates.length}개의 재고 업데이트가 실패했습니다.`);
                console.error("실패한 업데이트:", failedUpdates);
            }
        } catch (error) {
            console.error("재고 저장 중 오류가 발생했습니다:", error);
            alert("재고 저장에 실패했습니다.");
        }
    };


    return (
        <div className="inventory-container">
            <div className="inventory-main-box">
                <div className="insert-inventory-btn-box">
                    <button className="insert-btn" onClick={handleInventorySubmit}>저장</button>
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
                                const inventoryItem = inventoryCounts.find(item => item.productnum === product.productnum);
                                const inventoryCount = inventoryItem ? inventoryItem.count : 0;

                                return (
                                    <tr className="inventory-table-data-box" key={index}>
                                        <td className="inventory-table-item">{product.productnum}</td>
                                        <td className="inventory-table-item">{product.productname}</td>
                                        <td className="inventory-table-item">
                                            <div className="inventory-btn-box">
                                                <input
                                                    className="inventory-del-btn"
                                                    type="button"
                                                    value="-"
                                                    onClick={() => handleDecrement(product.productnum)}
                                                />
                                                <input
                                                    className="inventory-count-input"
                                                    type="number"
                                                    value={inventoryCount}
                                                    onChange={(e) => handleInputChange(product.productnum, Number(e.target.value))}
                                                />
                                                <input
                                                    className="inventory-add-btn"
                                                    type="button"
                                                    value="+"
                                                    onClick={() => handleIncrement(product.productnum)}
                                                />
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
