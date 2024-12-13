import React, {useEffect, useState} from "react";
import axios from "axios";

function StoreStatus({ productData }) {
    const { productInfo } = productData;
    const [payProducts, setPayProducts] = useState([]);

    // 서버에서 결제 데이터 가져오기
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:80/payment/best/all");
            console.log("response:", response.data);
            setPayProducts(response.data);
        } catch (error) {
            console.error("Error fetching best products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 로딩 중 상태 처리
    if ( productInfo.length === 0 ) {
        return <div>로딩중...</div>;
    }

    // 상품별 판매 데이터 매핑
    const soldCountMap = payProducts.reduce((map, product) => {
        map[product.productNum] = product.purchaseCount;
        return map;
    }, {});

    // 판매 데이터가 있는 상품만 필터링 및 정렬
    const filteredProductInfo = productInfo
        .filter(product => soldCountMap[product.productnum] > 0)
        .sort((a, b) => soldCountMap[b.productnum] - soldCountMap[a.productnum]); // 판매 개수로 내림차순 정렬


    return (
        <div className="status-container">
            {/* 판매 및 제품 섹션 (상위 5개만 출력) */}
            <div className="status-main-box">
                <div className="status-count-box count-box">
                    <span>매출 순위</span>
                </div>
                <div className="status-table-box table-box">
                    <table className="status-table">
                        <colgroup>
                            <col width="10%"/>
                            <col width="20%"/>
                            <col width="60%"/>
                            <col width="20%"/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>순위</th>
                            <th>상품번호</th>
                            <th>상품명</th>
                            <th>팔린 개수</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProductInfo.map((product, index) => (
                            <tr className="status-table-data-box" key={index}>
                                <td className="status-table-item">{index + 1}</td>
                                <td className="status-table-item">{product.productnum}</td>
                                <td className="status-table-item">{product.productname}</td>
                                <td className="status-table-item">{soldCountMap[product.productnum]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StoreStatus;
