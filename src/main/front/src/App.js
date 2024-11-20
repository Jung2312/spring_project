import React from 'react';
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
                <Route path="/main" element={<MainPage />} />
                <Route path="/ShoppingHome" element={<ShoppingHome />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
