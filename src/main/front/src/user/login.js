import React from 'react';
import logo from '../img/myhouse_logo.png'
import css from '../css/login.css'
import StoreManagement from "../store/storeManagement";

function Login() {
    return (
        <div className="login-container">
            <div className="logo">
                <a href="">
                    <img id="logo-img" src={logo}/>
                    <span className="logo-name">나만의집</span>
                </a>

            </div>
            <form action="/user/login" method="post">
                <div className="login-field-box">
                    <input type="text" name="id" className="textField" id="id-field" placeholder="아이디"/>
                    <input type="text" name="pw" className="textField" id="pw-field" placeholder="비밀번호"/>
                </div>
                <div className="login-btn-box">
                    <button className="login-btn login-user" type="submit">사용자</button>
                    <button className="login-btn login-seller" type="submit">판매자</button>
                </div>
                <div className="register-box">
                    <a href="" id="register-user">사용자 회원가입</a>
                    <a href="" id="register-seller">판매자 회원가입</a>
                </div>
            </form>
        </div>
    )
}
export default Login;