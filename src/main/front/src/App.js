import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Recommend from "./community/recommend";
import Cart from "./shopping/cart";
import MyPageSet from "./user/myPageSet";
import Login from "./user/login";
import Signup from "./user/signup";
import MainPage from "./mainPage/mainPage";
import StoreSignup from "./user/storeSignup";
import ShoppingHome from "./mainPage/shoppingHome";
import ContestApply from "./contest/contestApply";
import StoreManagement from "./store/storeManagement";
import ContestChampionship from "./contest/contestChampionship";
import ContestPostPage from "./contest/contestPostPage";
import ContestPostDetailPage from "./contest/contestPostDetail";
import ContestNotice from "./contest/contestNotice";
import ShoppingCategory from "./shopping/shoppingCategory";
import MyShoppingPage from "./user/myShoppingPage";
import RecommendPostPage from "./community/recommendPostPage";
import ProductDetail from "./shopping/productDetail";
import MyPage from "./user/myPage";
import FollowPage from "./user/followPage";
import Profile from "./user/profile";
import ShoppingInformation from "./shopping/shoppingInformation";
import ShoppingBest from "./shopping/shoppingBest";
import Payment from "./shopping/payment";
import PostDetail from "./community/recommendDetail";
import ContestRegistration from "./admin/addContest";
import ContestEdit from "./admin/editContest";
import PurchaseHistory from "./shopping/purchaseHistory";
import PostDetail from "./community/recommendDetail";

function AppRouter() {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 경로를 확인하기 위해 useLocation 사용

    useEffect(() => {
        const fetchOngoingContest = async () => {
            try {
                const response = await axios.get("http://localhost:80/contest/update");
                const contestNum = response.data.contestnum;

                if (contestNum) {
                    navigate(`/ContestEdit/${contestNum}`);
                }
            } catch (error) {
                console.error("Error fetching ongoing contest:", error);

                // 특정 경로에서만 alert 표시
                if (location.pathname === "/contest") {
                    alert("현재 진행 중인 콘테스트가 없습니다.");
                }
            }
        };

        // 특정 경로에서만 실행
        if (location.pathname === "/ContestEdit") {
            fetchOngoingContest();
        }
    }, [navigate, location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/main" replace />} />
            <Route path="/contest" element={<ContestApply />} />
            <Route path="/contest/post/:contestnum" element={<ContestPostPage />} />
            <Route path="/contest/champion" element={<ContestChampionship />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/storeSignup" element={<StoreSignup />} />
            <Route path="/community/recommendDetail/:postnum" element={<PostDetail />} />
            <Route path="/community/recommend" element={<Recommend />} />
            <Route path="/recommend/post" element={<RecommendPostPage />} />
            <Route path="/shopping/cart" element={<Cart />} />
            <Route path="/myPage/setting" element={<MyPageSet />} />
            <Route path="/shopping/shoppingHome" element={<ShoppingHome />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/storeManagement" element={<StoreManagement />} />
            <Route path="/myPage/profile" element={<MyPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/followPage" element={<FollowPage />} />
            <Route path="/contest/post" element={<ContestPostPage />} />
            <Route path="/contest/postDetail/:joinnum" element={<ContestPostDetailPage />} />
            <Route path="/contest/notice" element={<ContestNotice />} />
            <Route path="/shopping/shoppingCategory" element={<ShoppingCategory />} />
            <Route path="/myPage/myShoppingPage" element={<MyShoppingPage />} />
            <Route path="/productDetail/:productnum" element={<ProductDetail />} />
            <Route path="/shoppingInformation/:storename" element={<ShoppingInformation />} />
            <Route path="/shopping/shoppingBest" element={<ShoppingBest />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/purchaseHistory" element={<PurchaseHistory />} />
            <Route path="/ContestRegistration" element={<ContestRegistration />} />
            <Route path="/ContestEdit/:contestnum" element={<ContestEdit />} />
            <Route path="/community/recommendDetail/:postnum" element={<PostDetail />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;