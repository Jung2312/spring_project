import React, {useEffect, useState} from 'react';
import axios from 'axios';
import profile from '../img/exProfile.png'
import '../css/myPage.css'

function MyPageSet() {
    const [formData, setFormData] = useState({
        userid: "",
        name: "",
        email: "",
        phone: "",
        introduce: ""
    });
    
    // 서버에서 사용자 데이터 가져옴
    useEffect(() => {
        axios
            .get("http://localhost:80/user/info") // Spring Boot API URL
            .then((response) => {
                const userData = response.data[0]; // 첫 번째 사용자 데이터
                setFormData({
                    userid: userData.userid,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    introduce: userData.introduce
                });
                console.log(userData);
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

    return (
        <div className="set-container">
            <div className="set-image"><img src={profile} alt="profile"/></div>
            <div className="user-box">
                <div className="user">이름</div>
                <input className="user-text" id="user-name" name="name" value={formData.name} onChange={changeUser}/>
            </div>
            <div className="user-box">
                <div className="user">이메일</div>
                <input className="user-text" id="user-email" name="email" value={formData.email} onChange={changeUser}/>
            </div>
            <div className="user-box">
                <div className="user">전화번호</div>
                <input className="user-text" id="user-phone" name="phone" value={formData.phone} onChange={changeUser}/>
            </div>
            <div className="user-box">
                <div className="user">자기소개</div>
                <textarea className="user-intro" id="user-intro" name="introduce" value={formData.introduce} onChange={changeUser}/>
            </div>
            <div><a className="leave" href="#">탈퇴하기 ></a></div>
            <div className="user-box">
                <button className="save" onClick="">저장</button>
            </div>
        </div>
    )
}

export default MyPageSet;