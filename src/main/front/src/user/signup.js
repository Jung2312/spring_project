import React, { useState } from 'react';
import logo from '../img/myhouse_logo.png';
import axios from 'axios';
import css from '../css/signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        name: '',
        phone: '',
        email: '',
        postcode: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // 서버로 보낼 데이터를 출력
        axios.post('/api/users/signup', formData)
            .then(response => {
                alert(response.data); // 성공 메시지 표시
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    };

    return (
        <div className="signup-page">
            <form className="container" onSubmit={handleSubmit}>
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
                    <input type="text" name="id" onChange={handleChange} id="id-field" placeholder="아이디"/>
                </div>
                <div className="pwd-field">
                    <span className="text">비밀번호</span>
                    <p>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                    <input type="password" name="pwd" onChange={handleChange} id="pwd-field" placeholder="비밀번호"/>
                </div>
                <div className="pwdchk-field">
                    <span className="text">비밀번호 확인</span>
                    <input type="password" name="pwdchk" onChange={handleChange} id="pwdchk-field" placeholder="비밀번호 확인"/>
                </div>
                <div className="name-field">
                    <span className="text">이름</span>
                    <input type="text" name="name" onChange={handleChange} id="name-field" placeholder="이름"/>
                </div>
                <div className="phone-field">
                    <span className="text">전화번호</span>
                    <input type="text" name="phone" onChange={handleChange} id="phone-field" placeholder="전화번호"/>
                </div>
                <div className="email-field">
                    <span className="text">이메일</span>
                    <input type="email" name="email" onChange={handleChange} id="email-field" placeholder="이메일"/>
                </div>
                <div className="post-field" style={{marginBottom: '0px'}}>
                    <button className="post-btn" type="button" style={{marginBottom: '10px'}}>우편번호 검색</button>
                    <input style={{marginBottom: '10px'}} type="text" name="post" onChange={handleChange} id="post-field" placeholder="우편번호"/>
                </div>
                <div className="address-field">
                    <input type="text" name="address" onChange={handleChange} id="address-field" placeholder="주소"/>
                </div>
                <button className="submit-btn" type="submit">가입하기</button>
            </form>
        </div>
    );
}

export default Signup;
