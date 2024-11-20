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
import ContestChampionship from "./contest/contestChampionship";
import ContestPostPage from "./contest/contestPostPage";
import ContestPostDetail from "./contest/contestPostDetail";

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
                <Route path="/cart" element={<Cart />} />
                <Route path="/myPageSet" element={<MyPageSet />} />
                <Route path="/shoppingHome" element={<ShoppingHome />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/contest/post" element={<ContestPostPage />} />
                <Route path="/contest/postDetail" element={<ContestPostDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
