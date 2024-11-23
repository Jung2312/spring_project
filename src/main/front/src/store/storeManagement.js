import React, {useEffect, useState} from 'react';
import ProductManagement from "./productManagement";
import InfoUpdate from "./infoUpdate";
import { SidebarItem } from './sidebarItem';
import '../css/store.css';
import StoreInventory from "./store_inventory";
import StoreProduct from "./store_product";
import StoreStatus from "./store_status";

const sidebarItems = [
    { text: "상품 관리", iconSrc: "storeImg/store_productmanage.png" },
    { text: "재고 관리", iconSrc: "storeImg/store_inventory.png" },
    { text: "매출 현황", iconSrc: "storeImg/store_product.png" },
    { text: "정보 변경", iconSrc: "storeImg/info_update.png" }
];

function StoreManagement() {
    const [activeMenu, setActiveMenu] = useState("상품 관리");
    const [isLogin, setIsLogin] = useState(false);
    const [storeInfo, setStoreInfo] = useState(null);

    // 컴포넌트가 렌더링될 때 로그인 여부를 확인하고, 로그인된 경우 사용자 정보 가져오기
    useEffect(() => {
        const storeid = sessionStorage.getItem("storeid");
        if (storeid) {
            setIsLogin(true);
            console.log(storeid);
            fetchUserInfo(storeid);  // userid를 서버로 전송하여 사용자 정보 가져오기
        }
    }, []);

    // 서버에서 사용자 정보를 가져오는 함수
    const fetchUserInfo = async (storeid) => {
        try {
            const response = await fetch(`http://localhost:80/store/info?storeid=${storeid}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setStoreInfo(data);
                console.log(data);
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    return (
        <main className="store-main-container">
            <header className="store-header">
                <div className="logo-box">
                    <a className="store-title">나만의집</a>
                </div>
                <div className="store-name-box">
                    <span className="store-name">{storeInfo ? `${storeInfo.storename}님` : "로딩중..."} 님</span>
                </div>
            </header>
            <div className="store-content-wrapper">
                {/* 사이드바 */}
                <section className="store-sidebar store-item">
                    <nav className="store-sidebar-menu">
                        {sidebarItems.map((item, index) => (
                            <div
                                key={index}
                                className={`store-sidebar-item-wrapper ${activeMenu === item.text ? 'store-active' : ''}`}
                                onClick={() => setActiveMenu(item.text)}
                            >
                                <SidebarItem {...item} isActive={activeMenu === item.text}/>
                            </div>

                        ))}
                    </nav>
                </section>

                {/* 콘텐츠 섹션 */}
                <section className="store-content-section">
                    {activeMenu === "상품 관리" && <StoreProduct />}
                    {activeMenu === "재고 관리" && <StoreInventory />}
                    {activeMenu === "매출 현황" && <StoreStatus />}
                    {activeMenu === "정보 변경" && <InfoUpdate />}
                </section>
            </div>
        </main>
    );
}

export default StoreManagement;