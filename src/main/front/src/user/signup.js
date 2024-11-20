import React, { useState } from 'react';
import Modal from 'react-modal'; // react-modal 임포트
import axios from 'axios';
import logo from '../img/myhouse_logo.png';
import DaumPostCode from 'react-daum-postcode';
import css from '../css/signup.css';

function Signup() {
    const [inputUser, setInputUser] = useState({
        id: '',
        pwd: '',
        pwdchk: '',
        name: '',
        phone: '',
        email: '',
        postcode: '',
        address: '',
        addressdetail: '',
    });

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const completeHandler = (data) => {
        setInputUser({
            ...inputUser,
            postcode: data.zonecode, // 수정: 'zoncode' -> 'zonecode'
            address: data.roadAddress, // 수정: 'roadAddres' -> 'roadAddress'
        });
        setIsOpen(false);
    };

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
        },
        content: {
            margin: 'auto',
            width: '600px',
            height: '400px',
            padding: '0',
            overflow: 'hidden',
        },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        // 비밀번호 확인
        if (inputUser.pwd !== inputUser.pwdchk) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:80/api/users', {
                userId: inputUser.id,
                password: inputUser.pwd,
                name: inputUser.name,
                phone: inputUser.phone,
                email: inputUser.email,
                postcode: inputUser.postcode,
                address: inputUser.address,
                addressDetail: inputUser.addressdetail,
            });
            alert(response.data); // 성공 메시지
        } catch (error) {
            alert(error.response?.data || '회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="signup-page">
            <form className="container" onSubmit={handleSubmit}>
                <div className="logo">
                    <a href=""><img src={logo} alt="나만의집 로고" /></a>
                    <span className="logo-name">나만의집</span>
                </div>
                <div className="signup">
                    <span className="signup-text">회원가입</span>
                </div>
                <div className="id-field">
                    <span className="text">아이디</span>
                    <p>다른 유저와 겹치지 않도록 입력해주세요. (2~20자)</p>
                    <input
                        type="text"
                        name="id"
                        id="id-field"
                        placeholder="아이디"
                        value={inputUser.id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="pwd-field">
                    <span className="text">비밀번호</span>
                    <p>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                    <input
                        type="password"
                        name="pwd"
                        id="pwd-field"
                        placeholder="비밀번호"
                        value={inputUser.pwd}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="pwdchk-field">
                    <span className="text">비밀번호 확인</span>
                    <input
                        type="password"
                        name="pwdchk"
                        id="pwdchk-field"
                        placeholder="비밀번호 확인"
                        value={inputUser.pwdchk}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="name-field">
                    <span className="text">이름</span>
                    <input
                        type="text"
                        name="name"
                        id="name-field"
                        placeholder="이름"
                        value={inputUser.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="phone-field">
                    <span className="text">전화번호</span>
                    <input
                        type="text"
                        name="phone"
                        id="phone-field"
                        placeholder="전화번호"
                        value={inputUser.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="email-field">
                    <span className="text">이메일</span>
                    <input
                        type="email"
                        name="email"
                        id="email-field"
                        placeholder="이메일"
                        value={inputUser.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="post-field" style={{ marginBottom: '0px' }}>
                    <div className="post-btn" onClick={toggle} style={{ marginBottom: '10px' }}>우편번호 검색</div>
                    <input
                        value={inputUser.postcode || ''}
                        style={{ marginBottom: '10px' }}
                        type="text"
                        name="postcode"
                        id="post-field"
                        readOnly
                        placeholder="우편번호"
                    />
                </div>
                <div className="address-field">
                    <input
                        style={{ marginBottom: '10px' }}
                        value={inputUser.address || ''}
                        type="text"
                        name="address"
                        id="address-field"
                        placeholder="주소"
                        readOnly
                    />
                    <input
                        value={inputUser.addressdetail || ''}
                        type="text"
                        name="addressdetail"
                        id="address-detail-field"
                        placeholder="상세 주소"
                        onChange={handleInputChange}
                    />
                </div>
                <button className="submit-btn" type="submit">가입하기</button>
            </form>
            <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
                <DaumPostCode onComplete={completeHandler} height="100%" />
            </Modal>
        </div>
    );
}

export default Signup;

