import React, { useState } from 'react';
import axios from 'axios';
import logo from '../img/myhouse_logo.png';
import css from '../css/login.css';
import { useNavigate } from "react-router-dom";

function Login() {
    const [userType, setUserType] = useState('');
    const [inputUser, setInputUser] = useState({
        userid: '',
        password: ''
    });

    const navigate = useNavigate();

    const loginButtonClick = (type) => {
        setUserType(type); // 'user' or 'store'
    };

    const goMain = () => {
        navigate('/');
    };

    const goStoreManagement = () => {
        navigate('/StoreManagement');
    };

    // Handle form submission for login
    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (userType === 'user') {
                response = await axios.post('http://localhost:80/user/userlogin', {
                    userid: inputUser.id,
                    password: inputUser.password,
                    userType
                });
                alert(`사용자로 로그인이 완료되었습니다.`);
                sessionStorage.setItem("userid", inputUser.id);
                console.log(response.data); // Check successful login response
                goMain();
            } else {
                response = await axios.post('http://localhost:80/store/storelogin', {
                    userid: inputUser.id,
                    password: inputUser.password,
                    userType
                });
                alert(`판매자로 로그인이 완료되었습니다.`);
                console.log(response.data); // Check successful store login response
                goStoreManagement();
            }

        } catch (error) {
            alert(error.response?.data || '로그인 중 오류가 발생했습니다.');
        }
    };

    const loginInputChange = (e) => {
        const { name, value } = e.target;
        setInputUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <a href="/" className="login-aTag">
                    <img id="login-logo-img" src={logo} alt="Logo" />
                    <span className="logo-name">나만의집</span>
                </a>
            </div>
            <form onSubmit={loginSubmit}>
                <div className="login-field-box">
                    <input
                        type="text"
                        name="id"
                        value={inputUser.id || ""}
                        className="textField"
                        onChange={loginInputChange}
                        id="login-id-field"
                        placeholder="아이디"
                    />
                    <input
                        type="password"
                        name="password"
                        value={inputUser.password || ""}
                        className="textField"
                        onChange={loginInputChange}
                        id="login-pw-field"
                        placeholder="비밀번호"
                    />
                </div>
                <div className="login-btn-box">
                    <button className="login-btn login-user" type="submit" onClick={() => loginButtonClick('user')}>사용자</button>
                    <button className="login-btn login-seller" type="submit" onClick={() => loginButtonClick('store')}>판매자</button>
                </div>
                <div className="register-box">
                    <a href="/register/user" className="login-aTag" id="register-user">사용자 회원가입</a>
                    <a href="/register/seller" className="login-aTag" id="register-seller">판매자 회원가입</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
