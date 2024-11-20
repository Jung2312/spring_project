import React from 'react';
import logo from '../img/myhouse_logo.png';
import css from '../css/signup.css';

function StoreSignup() {
    return (
        <div className="container">
            <div className="logo">
                <a href=""><img src={logo} alt="나만의집 로고"/></a>
                <span className="logo-name">나만의집</span>
            </div>
            <div className="signup">
                <span className="signup-text">회원가입</span>
            </div>
            <div className="id-field">
                <span className="text">아이디</span>
                <p>다른 유저와 겹치지 않도록 입력해주세요. (2~20자)</p>
                <input type="text" name="id" id="id-field" placeholder="아이디"/>
            </div>
            <div className="pwd-field">
                <span className="text">비밀번호</span>
                <p>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                <input type="password" name="pwd" id="pwd-field" placeholder="비밀번호"/>
            </div>
            <div className="pwdchk-field">
                <span className="text">비밀번호 확인</span>
                <input type="password" name="pwdchk" id="pwdchk-field" placeholder="비밀번호 확인"/>
            </div>
            <div className="store-name-field">
                <span className="text">상점 이름</span>
                <input type="text" name="store-name" id="store-name-field" placeholder="이름"/>
            </div>
            <div className="phone-field">
                <span className="text">전화번호</span>
                <input type="text" name="phone" id="phone-field" placeholder="전화번호"/>
            </div>
            <div className="email-field">
                <span className="text">이메일</span>
                <input type="email" name="email" id="email-field" placeholder="이메일"/>
            </div>
            <div className="post-field" style={{marginBottom: '0px'}}>
                <button className="post-btn" type="button" style={{marginBottom: '10px'}}>우편번호 검색</button>
                <input style={{marginBottom: '10px'}} type="text" name="post" id="post-field"
                       placeholder="우편번호"/>
            </div>
            <div className="address-field">
                <input type="text" name="address" id="address-field" placeholder="주소"/>
            </div>
            <button className="submit-btn" type="submit">가입하기</button>
        </div>
    );
}

export default StoreSignup;
