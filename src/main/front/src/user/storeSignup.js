import React, {useState} from 'react';
import logo from '../img/myhouse_logo.png';
import Modal from 'react-modal'; // react-modal 임포트
import DaumPostCode from 'react-daum-postcode';
import css from '../css/signup.css';

function StoreSignup() {

    const [inputUser, setInputUser] = useState({
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

    return (
        <div className="signup-page">
            <form className="container">
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
                    <div className="post-btn" onClick={toggle} style={{marginBottom: '10px'}}>우편번호 검색</div>
                    <input value={inputUser.postcode || ''} style={{marginBottom: '10px'}} type="text" name="post"
                           id="post-field" readOnly placeholder="우편번호"/>
                </div>
                <div className="address-field">
                    <input value={inputUser.address || ''} type="text" name="address" id="address-field"
                           placeholder="주소"/>
                    <input
                        value={inputUser.addressdetail || ''}
                        type="text"
                        name="address-detail"
                        id="address-detail-field"
                        placeholder="상세 주소"
                        onChange={(e) => setInputUser({...inputUser, addressdetail: e.target.value})}
                    />
                </div>
                <button className="submit-btn" type="submit">가입하기</button>
            </form>
            <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
                <DaumPostCode onComplete={completeHandler} height="100%"/>
            </Modal>
        </div>
    )
        ;
}

export default StoreSignup;