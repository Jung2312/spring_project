import React, {useEffect, useState} from 'react';
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
    const [storename, setStorename] = useState(null); // 로그인된 사용자 아이디 상태

    // 세션에서 사용자 아이디 가져오기
    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:80/store/session', {
                method: 'GET',
                credentials: 'include'// 세션 쿠키 포함
            });

            if (response.ok) {
                const data = await response.text();
                setStorename(data.storename); // 로그인된 사용자 아이디 설정
            } else {
                setStorename(null); // 로그인되지 않음
            }
        } catch (error) {
            console.error('세션 확인 오류:', error);
            setStorename(null); // 에러 발생 시 로그인되지 않음
        }
    };

    // 컴포넌트가 렌더링될 때 세션 정보 확인
    useEffect(() => {
        checkSession();
    }, []);

    return (
        <main className="store-main-container">
            <header className="store-header">
                <div className="logo-box">
                    <a className="store-title">나만의집</a>
                </div>
                <div className="store-name-box">
                    <span className="store-name">{storename} 님</span>
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
                <section className="store-item">
                    {activeMenu === "상품 관리" && <StoreProduct/>}
                    {activeMenu === "재고 관리" && <StoreInventory/>}
                    {activeMenu === "정보 변경" && <InfoUpdate/>}
                </section>
            </div>
        </main>
    );
}

export default StoreManagement;