import React, { useState } from 'react';
import Modal from 'react-modal'; // react-modal 임포트
import axios, {post} from 'axios';
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
            document.querySelector('[name=pwdchk]').focus();
            return;
        }

        try {
            const response = await axios.post('http://localhost:80/user/signup', {
                userid: inputUser.id,
                password: inputUser.pwd,
                name: inputUser.name,
                phone: inputUser.phone,
                email: inputUser.email,
                postcode: inputUser.postcode,
                address: inputUser.address,
                addressDetail: inputUser.addressdetail,
                admin: 0,
                gradenum: 1
            });
            alert("회원가입이 완료되었습니다."); // 성공 메시지

        } catch (error) {
            alert(error.response?.data || '회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="signup-page">
            <form className="signup-container" onSubmit={handleSubmit} method="post">
                <div className="signup-logo">
                    <a href=""><img src={logo} alt="나만의집 로고" /></a>
                    <span className="signup-logo-name">나만의집</span>
                </div>
                <div className="signup-signup">
                    <span className="signup-signup-text">회원가입</span>
                </div>
                <div className="signup-id-field">
                    <span className="signup-text">아이디</span>
                    <p>다른 유저와 겹치지 않도록 입력해주세요. (2~20자)</p>
                    <input
                        type="text"
                        name="id"
                        id="signup-id-field"
                        placeholder="아이디"
                        value={inputUser.id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="signup-pwd-field">
                    <span className="signup-text">비밀번호</span>
                    <p>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</p>
                    <input
                        type="password"
                        name="pwd"
                        id="signup-pwd-field"
                        placeholder="비밀번호"
                        value={inputUser.pwd}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="signup-pwdchk-field">
                    <span className="signup-text">비밀번호 확인</span>
                    <input
                        type="password"
                        name="pwdchk"
                        id="signup-pwdchk-field"
                        placeholder="비밀번호 확인"
                        value={inputUser.pwdchk}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="signup-name-field">
                    <span className="signup-text">이름</span>
                    <input
                        type="text"
                        name="name"
                        id="signup-name-field"
                        placeholder="이름"
                        value={inputUser.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="signup-phone-field">
                    <span className="signup-text">전화번호</span>
                    <input
                        type="text"
                        name="phone"
                        id="signup-phone-field"
                        placeholder="전화번호"
                        value={inputUser.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="signup-email-field">
                    <span className="signup-text">이메일</span>
                    <input
                        type="email"
                        name="email"
                        id="signup-email-field"
                        placeholder="이메일"
                        value={inputUser.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="signup-post-field" style={{ marginBottom: '0px' }}>
                    <div className="signup-post-btn" onClick={toggle} style={{ marginBottom: '10px' }}>우편번호 검색</div>
                    <input
                        value={inputUser.postcode || ''}
                        style={{ marginBottom: '10px' }}
                        type="text"
                        name="postcode"
                        id="signup-postcode-field"
                        readOnly
                        placeholder="우편번호"
                    />
                </div>
                <div className="signup-address-field">
                    <input
                        style={{ marginBottom: '10px' }}
                        value={inputUser.address || ''}
                        type="text"
                        name="address"
                        id="signup-address-field"
                        placeholder="주소"
                        readOnly
                    />
                    <input
                        value={inputUser.addressdetail || ''}
                        type="text"
                        name="addressdetail"
                        id="signup-addressdetail-field"
                        placeholder="상세 주소"
                        onChange={handleInputChange}
                    />
                </div>
                <button className="signup-submit-btn" type="submit">가입하기</button>
            </form>
            <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
                <DaumPostCode onComplete={completeHandler} height="100%" />
            </Modal>
        </div>
    );
}

export default Signup;

