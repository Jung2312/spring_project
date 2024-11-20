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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/contest" element={<ContestApply />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/storeSignup" element={<StoreSignup />} />
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/myPageSet" element={<MyPageSet />} />
                <Route path="/shoppingHome" element={<ShoppingHome />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
