import React, { useState } from 'react';
import ProductManagement from "./productManagement";
import InfoUpdate from "./infoUpdate";
import { SidebarItem } from './sidebarItem';
import '../css/store.css';
import StoreInventory from "./store_inventory";
import StoreProduct from "./store_product";

const sidebarItems = [
    { text: "상품 관리", iconSrc: "storeImg/store_productmanage.png" },
    { text: "재고 관리", iconSrc: "storeImg/store_inventory.png" },
    { text: "매출 현황", iconSrc: "storeImg/store_product.png" },
    { text: "정보 변경", iconSrc: "storeImg/info_update.png" }
];

function StoreManagement() {
    const [activeMenu, setActiveMenu] = useState("상품 관리");

    return (
        <main className="store-main-container">
            <div className="store-content-wrapper">
                {/* 사이드바 */}
                <section className="store-sidebar">
                    <header className="store-sidebar-header">
                        <h1 className="store-title">나만의집</h1>
                    </header>
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
                    {activeMenu === "정보 변경" && <InfoUpdate />}
                </section>
            </div>
        </main>
    );
}

export default StoreManagement;