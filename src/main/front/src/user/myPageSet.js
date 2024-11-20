import React from 'react';
import profile from '../img/exProfile.png'
import '../css/myPage.css'

function MyPageSet() {
    return (
        <div className="set-container">
            <div className="set-image"><img src={profile} alt="profile"/></div>
            <div className="user-box">
                <div className="user">닉네임</div>
                <input type="text" id="user-name"/>
            </div>
            <div className="user-box">
                <div className="user">이메일</div>
                <input type="text" id="user-email"/>
            </div>
            <div className="user-box">
                <div className="user">전화번호</div>
                <input type="text" id="user-phone"/>
            </div>
            <div className="user-box">
                <div className="user">생년월일</div>
                <input type="text" id="user-email"/>
            </div>
            <div><a className="leave">탈퇴하기 ></a></div>
            <div className="user-box">
                <button className="save" onClick="">저장</button>
            </div>
        </div>
    )
}

export default MyPageSet;