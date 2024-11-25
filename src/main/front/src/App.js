import React from 'react';

import Recommend from "./community/recommend";
import Cart from "./shopping/cart";
import MyPageSet from "./user/myPageSet";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/contest" element={<ContestApply />} />
                <Route path="/contest/champion" element={<ContestChampionship />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/storeSignup" element={<StoreSignup />} />
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/recommend/post" element={<RecommendPostPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/myPageSet" element={<MyPageSet />} />
                <Route path="/shoppingHome" element={<ShoppingHome />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/storeManagement" element={<StoreManagement />} />
                <Route path="/myPage" element={<MyPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/followPage" element={<FollowPage />} />
                <Route path="/contest/post" element={<ContestPostPage />} />
                <Route path="/contest/postDetail/:joinnum" element={<ContestPostDetailPage />} />
                <Route path="/contest/notice" element={<ContestNotice />} />
                <Route path="/shoppingCategory" element={<ShoppingCategory />} />
                <Route path="/myShoppingPage" element={<MyShoppingPage />} />
                <Route path="/productDetail" element={<ProductDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;