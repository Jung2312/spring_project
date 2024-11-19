import React from 'react';
import logo from '../img/myhouse_logo.png'
import css from '../css/login.css'

function Login() {
    return (
        <div className="container">
            <div className="logo">
                <a href=""><img src={logo}/></a>
                <span className="logo-name">나만의집</span>
            </div>
            <div className="login-field">
                <input type="text" name="id" id="id-field" placeholder="아이디"/>
            </div>
        </div>
    )
}
