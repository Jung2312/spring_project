import React from 'react';

import Recommend from "./community/recommend";
import Cart from "./shopping/cart";
import MyPageSet from "./user/myPageSet";

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from "./user/login";
import Signup from './user/signup';
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
import RecommendDetail from "./community/recommendDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/main" replace />} />
                <Route path="/contest" element={<ContestApply />} />
                <Route path="/contest/champion" element={<ContestChampionship />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/storeSignup" element={<StoreSignup />} />
                <Route path="/community/recommend" element={<Recommend />} />
                <Route path="/community/recommendDetail/:postnum" element={<RecommendDetail />} />
                <Route path="/recommend/post" element={<RecommendPostPage />} />
                <Route path="/cart" element={<Cart />} />
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
                <Route path="/productDetail" element={<ProductDetail />} />
                <Route path="/shoppingInformation/:storename" element={<ShoppingInformation />} />
                <Route path="/shopping/shoppingBest" element={<ShoppingBest />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;