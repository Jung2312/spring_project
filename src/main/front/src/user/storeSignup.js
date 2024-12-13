import React, { useState } from 'react';
import Modal from 'react-modal'; // react-modal 임포트
import axios, {post} from 'axios';
import logo from '../img/myhouse_logo.png';
import DaumPostCode from 'react-daum-postcode';
import css from '../css/signup.css';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [inputStore, setInputStore] = useState({
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

    const [selectedStoreNum, setSelectedStoreNum] = useState(null); // 선택된 storeNum

    const navigate = useNavigate();

    const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);
    const [isStoreSearchModalOpen, setIsStoreSearchModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [storeList, setStoreList] = useState([]); // 검색 결과 저장

    const selectStore = (store) => {
        setInputStore((prev) => ({
            ...prev,
            name: store.storename,
        }));
        setSelectedStoreNum(store.storenum); // storeNum 저장
        setIsStoreSearchModalOpen(false); // 모달 닫기
    };

    const handlePostcodeComplete  = (data) => {
        setInputStore({
            ...inputStore,
            postcode: data.zonecode,
            address: data.roadAddress,
        });
        setIsPostcodeModalOpen(false);
    };

    const customPostcodeStyles = {
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

    const customStoreSearchStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
        },
        content: {
            margin: 'auto',
            width: '600px',
            height: '400px',
            padding: '10px 20px',
            overflow: 'hidden',
        },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputStore((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStoreSearch  = async () => {
        if (!searchQuery.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:80/store/search', {
                params: { query: searchQuery }, // 검색어 전달
            });
            console.log(response.data); // 데이터 구조 확인
            setStoreList(response.data); // 결과 저장
        } catch (error) {
            alert("상점 검색 중 오류가 발생했습니다.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        // 비밀번호 확인
        if (inputStore.pwd !== inputStore.pwdchk) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:80/store/signup?storename=${encodeURIComponent(inputStore.name)}`, {
                storeid: inputStore.id,
                storepwd: inputStore.pwd,
                storephone: inputStore.phone,
                storeemail: inputStore.email,
                storepostcode: inputStore.postcode,
                storeaddress: inputStore.address,
                addressDetail: inputStore.addressdetail, // 여기를 추가
            });
            alert("회원가입이 완료되었습니다."); // 성공 메시지
            navigate("/login");
        } catch (error) {
            alert(error.response?.data || '회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="signup-page">
            <form className="signup-container" onSubmit={handleSubmit} method="post">
                <div className="signup-logo">
                    <a href=""><img src={logo} alt="나만의집 로고"/></a>
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
                        value={inputStore.id}
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
                        value={inputStore.pwd}
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
                        value={inputStore.pwdchk}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="signup-store-name-field">
                    <div style={{ display: 'flex' }}>
                        <span className="signup-text" style={{marginBottom: '0px'}}>상점 이름</span>
                        <div className="signup-store_name_search_btn" onClick={() => setIsStoreSearchModalOpen(true)} style={{marginBottom: '5px'}}>상점 검색</div>
                    </div>
                    <input type="text" name="name" id="signup-store-name-field" readOnly placeholder="이름" value={inputStore.name} onChange={(e) => setInputStore({ ...inputStore, name: e.target.value })}/>
                </div>
                <div className="signup-phone-field">
                    <span className="signup-text">전화번호</span>
                    <input
                        type="text"
                        name="phone"
                        id="signup-phone-field"
                        placeholder="전화번호"
                        value={inputStore.phone}
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
                        value={inputStore.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="signup-post-field" style={{marginBottom: '0px'}}>
                    <div className="signup-post-btn" onClick={() => setIsPostcodeModalOpen(true)} style={{marginBottom: '10px'}}>우편번호 검색</div>
                    <input
                        value={inputStore.postcode || ''}
                        style={{marginBottom: '10px'}}
                        type="text"
                        name="postcode"
                        id="signup-postcode-field"
                        readOnly
                        placeholder="우편번호"
                    />
                </div>
                <div className="signup-address-field">
                    <input
                        style={{marginBottom: '10px'}}
                        value={inputStore.address || ''}
                        type="text"
                        name="address"
                        id="signup-address-field"
                        placeholder="주소"
                        readOnly
                    />
                    <input
                        value={inputStore.addressdetail || ''}
                        type="text"
                        name="addressdetail"
                        id="signup-addressdetail-field"
                        placeholder="상세 주소"
                        onChange={handleInputChange}
                    />
                </div>
                <button className="signup-submit-btn" type="submit">가입하기</button>
            </form>
            <Modal isOpen={isPostcodeModalOpen} style={customPostcodeStyles} onRequestClose={() => setIsPostcodeModalOpen(false)}>
                <DaumPostCode onComplete={handlePostcodeComplete} height="100%" />
            </Modal>

            {/* 상점 검색 모달 */}
            <Modal isOpen={isStoreSearchModalOpen} style={customStoreSearchStyles} onRequestClose={() => setIsStoreSearchModalOpen(false)}>
                <div>
                    <h2>상점 검색</h2>
                    <div className="signup-customStoreSearchDiv">
                        <input type="text" placeholder="상점 이름 입력" value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}/>
                        <button onClick={handleStoreSearch}>검색</button>
                    </div>
                    <div className="signup-customStoreSearchListDiv"> {/* 스크롤 활성화 영역 */}
                        <ul className="signup-store_name_search_list">
                            {storeList.map((store, index) => (
                                <li key={index} onClick={() => selectStore(store)}>
                                    {store.storename}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Signup;

