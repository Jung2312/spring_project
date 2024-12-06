import React, { useEffect, useState } from 'react';
import DaumPostCode from 'react-daum-postcode'; // 주소 검색 라이브러리
import Modal from 'react-modal'; // 모달 라이브러리
import '../css/infoUpdate.css'; // 스타일 파일

function InfoUpdate() {
    const [storeInfo, setStoreInfo] = useState({
        storename: '',
        storeid: '',
        storephone: '',
        storeaddress: '',
        storenotice: '',
        storeemail: '',
        storepostcode: '',
        storepwd: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    useEffect(() => {
        const storeid = sessionStorage.getItem("storeid");
        if (storeid) {
            fetchStoreInfo(storeid);
        }
    }, []);

    // 서버에서 상점 정보 가져오기
    const fetchStoreInfo = async (storeid) => {
        try {
            const response = await fetch(`http://localhost:80/store/info?storeid=${storeid}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setStoreInfo({
                    storenum: data.storenum,
                    storename: data.storename,
                    storeid: data.storeid,
                    storephone: data.storephone,
                    storeaddress: data.storeaddress,
                    storenotice: data.storenotice,
                    storeemail: data.storeemail,
                    storepostcode: data.storepostcode,
                    storepwd: data.storepwd,
                });
            } else {
                console.error('Failed to fetch store info');
            }
        } catch (error) {
            console.error('Error fetching store info:', error);
        }
    };

    // 변경된 데이터를 서버로 전송
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStoreInfo = {
            storenum: storeInfo.storenum,  // 수정하려는 상점의 storenum 포함
            storeid: storeInfo.storeid,
            storename: storeInfo.storename,
            storephone: storeInfo.storephone,
            storeaddress: storeInfo.storeaddress,
            storenotice: storeInfo.storenotice,
            storeemail: storeInfo.storeemail,
            storepostcode: storeInfo.storepostcode,
            storepwd: storeInfo.storepwd,
        };

        try {
            const response = await fetch('http://localhost:80/store/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStoreInfo),
            });

            if (response.ok) {
                alert('정보가 성공적으로 수정되었습니다.');
            } else {
                alert('정보 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error updating store info:', error);
        }
    };


    // 모달 열기/닫기
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 주소 검색 완료 시 처리
    const handlePostCodeComplete = (data) => {
        setStoreInfo((prev) => ({
            ...prev,
            storepostcode: data.zonecode,
            storeaddress: data.roadAddress,
        }));
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <form className="infoUpdate-store-form-container" onSubmit={handleSubmit}>
            {/* 기존 필드들 */}
            <div className="infoUpdate-store-form-item">
                <label htmlFor="store-name" className="infoUpdate-store-form-label">상점명</label>
                <input
                    type="text"
                    className="infoUpdate-store-name-input"
                    value={storeInfo.storename}
                    onChange={(e) => setStoreInfo({...storeInfo, storename: e.target.value})}
                />
            </div>
            <div className="infoUpdate-store-form-item">
                <label htmlFor="store-id" className="infoUpdate-store-form-label">상점 아이디</label>
                <input
                    type="text"
                    className="infoUpdate-store-id-input"
                    value={storeInfo.storeid}
                    readOnly
                />
            </div>
            <div className="infoUpdate-store-form-item">
                <label htmlFor="store-pwd" className="infoUpdate-store-form-label">비밀번호</label>
                <input
                    type="password"
                    className="infoUpdate-store-pwd-input"
                    value={storeInfo.storepwd}
                    onChange={(e) => setStoreInfo({...storeInfo, storepwd: e.target.value})}
                />
            </div>
            <div className="infoUpdate-store-form-item">
                <label htmlFor="store-phone" className="infoUpdate-store-form-label">상점 전화번호</label>
                <input
                    type="text"
                    className="infoUpdate-store-phone-input"
                    value={storeInfo.storephone}
                    onChange={(e) => setStoreInfo({...storeInfo, storephone: e.target.value})}
                />
            </div>
            <div className="infoUpdate-store-form-item">
                <label htmlFor="address" className="infoUpdate-store-form-label">상점 주소</label>
                <div className="infoUpdate-store-address-inputs">
                    <input
                        type="text"
                        className="infoUpdate-store-address-inputs"
                        value={storeInfo.storeaddress}
                        readOnly
                    />
                    <button type="button" className="infoUpdate-store-search-button" onClick={toggleModal}>
                        주소검색
                    </button>
                </div>
            </div>
            <div className="infoUpdate-store-form-item">
                <label htmlFor="store-postcode" className="infoUpdate-store-form-label">우편번호</label>
                <input
                    type="text"
                    className="infoUpdate-store-postcode-input"
                    value={storeInfo.storepostcode}
                    readOnly
                />
            </div>
            <div className="infoUpdate-store-form-item">
                <label htmlFor="store-notice" className="infoUpdate-store-form-label">공지사항</label>
                <textarea
                    className="infoUpdate-store-notice-textarea"
                    value={storeInfo.storenotice}
                    onChange={(e) => setStoreInfo({...storeInfo, storenotice: e.target.value})}
                ></textarea>
            </div>
            <div className="infoUpdate-store-form-item">
                <label htmlFor="store-email" className="infoUpdate-store-form-label">이메일</label>
                <input
                    type="email"
                    className="infoUpdate-store-email-input"
                    value={storeInfo.storeemail}
                    onChange={(e) => setStoreInfo({...storeInfo, storeemail: e.target.value})}
                />
            </div>
            <button type="submit" className="infoUpdate-store-submit-button">수정하기</button>

            {/* 주소 검색 모달 */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={toggleModal}
                style={{
                    overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
                    content: {margin: 'auto', width: '400px', height: '500px', padding: '0'},
                }}
            >
                <DaumPostCode onComplete={handlePostCodeComplete}/>
            </Modal>
        </form>
    );
}

export default InfoUpdate;
