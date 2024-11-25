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
    const [productCount, setProductCount] = useState(null);
    const [productInfo, setProductInfo] = useState({});
    const [productData, setProductData] = useState({ productcount: null, productInfo: [] });
    const [inventoryData, setInventoryData] = useState({ productcount: null, productInfo: [], inventoryInfo: []});
    const [inventoryInfo, setInventoryInfo] = useState({});

    // 컴포넌트가 렌더링될 때 로그인 여부를 확인하고, 로그인된 경우 사용자 정보 가져오기
    useEffect(() => {
        const storeid = sessionStorage.getItem("storeid");
        if (storeid) {
            setIsLogin(true);
            fetchUserInfo(storeid);  // userid를 서버로 전송하여 사용자 정보 가져오기
        }
    }, []);

    useEffect(() => {
        const storenum = sessionStorage.getItem("storenum");
        if(storenum){
            fetchProductInfo(storenum);
            fetchProductCount(storenum);
        }
    }, []);

    // 데이터가 준비되면 상태를 업데이트 (상품관리)
    useEffect(() => {
        if (productCount !== null && productInfo.length > 0) {
            // productCount와 productInfo가 모두 준비되었을 때 상태를 업데이트
            setProductData({
                productcount: productCount,
                productInfo: productInfo,
            });
            setInventoryData({
                productcount: productCount,
                productInfo: productInfo,
                inventoryInfo: inventoryInfo
            });
        }
    }, [productCount, productInfo, inventoryInfo]);
    
    useEffect(() => {
        const productnum = sessionStorage.getItem("productnum");
        if (productnum) {
            fetchInventoryInfo(productnum);
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
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // 상품 리스트 불러오기
    const fetchProductInfo = async (storenum) => {
        try {
            const response = await fetch(`http://localhost:80/product/productList?storenum=${storenum}`, {
                method: 'GET'
            });

            if(response.ok){
                const data = await response.json();
                // 상품 데이터만 추출
                const productData = data.map(item => ({
                    productnum: item.productnum,
                    productname: item.productname,
                    productprice: item.productprice
                }));
                setProductInfo(productData);
            }else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // 상품 개수 불러오기
    const fetchProductCount = async (storenum) => {
        try {
            const response = await fetch(`http://localhost:80/product/productCount?storenum=${storenum}`, {
                method: 'GET'
            });
            if(response.ok){
                const data = await response.json();
                setProductCount(data);
            }else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // 재고 리스트 불러오기
    const fetchInventoryInfo = async (productnum) => {
        try {
            const response = await fetch(`http://localhost:80/inventory/inventoryList?productnum=${productnum}`, {
                method: 'GET'
            });

            if(response.ok){
                const data = await response.json();
                setInventoryInfo(data);
                console.log(inventoryData);
            }else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const printStoreInfo = () => {
        sessionStorage.setItem("storenum", storeInfo.storenum);
        return (
            <div className="store-name-box">
                <span className="store-name">{storeInfo.storename} 님</span>
            </div>
        )
    }

    const printLoading = () => {
        return (
            <div className="store-name-box">
                <span className="store-name">로딩중...</span>
            </div>
        )
    }

    return (
        <main className="store-main-container">
            <header className="store-header">
                <div className="logo-box">
                    <a className="store-title">나만의집</a>
                </div>
                {storeInfo ? printStoreInfo() : printLoading()}
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
                <section className="store-content-section store-item">
                    {/*컴포넌트에 값 전달*/}
                    {activeMenu === "상품 관리" && <StoreProduct productData={productData}/>}
                    {activeMenu === "재고 관리" && <StoreInventory inventoryData={inventoryData}/>}
                    {activeMenu === "매출 현황" && <StoreStatus />}
                    {activeMenu === "정보 변경" && <InfoUpdate />}
                </section>
            </div>
        </main>
    );
}

export default StoreManagement;