import React from 'react';

function InfoUpdate() {
    return (
        <form className="store-form-container">
            <div className="store-form-item">
                <label htmlFor="store-name" className="store-form-label">상점명</label>
                <input type="text" id="store-name" className="store-name-input" placeholder="상점명을 입력하세요" />
            </div>
            <div className="store-form-item">
                <label htmlFor="store-id" className="store-form-label">상점 아이디</label>
                <input type="text" id="store-id" className="store-id-input" placeholder="상점 아이디를 입력하세요" />
            </div>
            <div className="store-form-item">
                <label htmlFor="store-phone" className="store-form-label">상점 전화번호</label>
                <input type="text" id="store-phone" className="store-phone-input" placeholder="전화번호를 입력하세요" />
            </div>
            <div className="store-form-item">
                <label htmlFor="address" className="store-form-label">상점 주소</label>
                <div className="store-address-inputs">
                    <input type="text" id="address" className="store-address-input" value="17892" readOnly />
                    <button type="button" className="store-search-button">주소검색</button>
                </div>
                <input type="text" className="store-main-address-input" placeholder="주소" />
                <input type="text" className="store-detail-address-input" placeholder="상세주소" />
            </div>
            <button type="button" className="store-quit-button">탈퇴하기 &gt;</button>
            <button type="submit" className="store-submit-button">완료</button>
        </form>
    );
}

export default InfoUpdate;
