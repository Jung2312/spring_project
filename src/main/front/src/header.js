import React from 'react';
import css from './css/header.css'
import SearchImg from './img/search_img.png'
import CartImg from './img/cart_img.png'

function Header(){
    return (
        <header className="main-header">
            <div className="logo-name-box"><a href="" className="logo-name">나만의집</a></div>
            <div className="top-category-box">
                <a href="" id="community">커뮤니티</a>
                <a href="" id="shopping">쇼핑</a>
                <a href="" id="contest">콘테스트</a>
            </div>
            <div className="search-box">
                <img className="search-img" src={SearchImg}/>
                <input className="search-field" type="text" placeholder="통합검색"/>
            </div>
            <div className="cart-box">
                <a href=""><img src={CartImg}/></a>
            </div>
            <div className="user-box">
                <a href="" id="login">로그인</a>
                <a href="" id="register">회원가입</a>
                <a href="" id="service">고객센터</a>
            </div>
            <div className="post-btn-box">
                <button className="post-btn"><span>글쓰기</span></button>
            </div>
        </header>
    )
}

export default Header;