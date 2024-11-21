import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../css/myPage.css'

function MyPageSet() {
    const [formData, setFormData] = useState({
        userid: "",
        name: "",
        email: "",
        phone: "",
        introduce: "",
        profileimage: ""
    });
    
    // 서버에서 사용자 데이터 가져옴
    useEffect(() => {
        axios
            .get('http://localhost:80/user/info') // Spring Boot API URL
            .then((response) => {
                const userData = response.data[0];
                setFormData({
                    userid: userData.userid,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    introduce: userData.introduce,
                    profileimage: userData.profileimage
                });
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
            });
    }, []);

    const changeUser = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 변경된 데이터 저장 요청
    const saveChanges = () => {
        console.log("전송할 데이터:", formData); // 요청 전 데이터 출력
        axios
            .put('http://localhost:80/user/info', formData) // PUT 요청으로 데이터 전송
            .then((response) => {
                console.log("저장 성공:", response.data);
                alert("저장되었습니다.");
            })
            .catch((error) => {
                console.error("저장 중 오류 발생:", error);
                alert("저장에 실패했습니다. 다시 시도해주세요.");
            });
    };

    return (
        <div className="set-container">
            <div className="set-image"><img src={formData.profileimage  ? formData.profileimage : require("../img/exProfile.png")} alt="profile"/></div>
            <div className="user-box">
                <div className="user">이름</div>
                <input className="user-text" id="user-name" name="name" value={formData.name || ""} onChange={changeUser}/>
            </div>
            <div className="user-box">
                <div className="user">이메일</div>
                <input className="user-text" id="user-email" name="email" value={formData.email || ""} onChange={changeUser}/>
            </div>
            <div className="user-box">
                <div className="user">전화번호</div>
                <input className="user-text" id="user-phone" name="phone" value={formData.phone || ""} onChange={changeUser}/>
            </div>
            <div className="user-box">
                <div className="user">자기소개</div>
                <textarea className="user-intro" id="user-intro" name="introduce" value={formData.introduce || ""} onChange={changeUser}/>
            </div>
            <div><a className="leave" href="#">탈퇴하기 ></a></div>
            <div className="user-box">
                <button className="save" onClick={saveChanges}>저장</button>
            </div>
        </div>
    )
}

export default MyPageSet;