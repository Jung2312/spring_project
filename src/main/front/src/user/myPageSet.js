import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../css/myPage.css'
import Header from "../header";
import {useNavigate} from "react-router-dom";

function MyPageSet() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({}); // 사용자 정보 상태
    const [profileImage, setProfileImage] = useState(null); // 새 프로필 이미지 상태
    const userid = sessionStorage.getItem("userid");

    // 서버에서 사용자 데이터 가져오기
    useEffect(() => {
        if (!userid) {
            navigate("/login")
        } else {
            axios
                .get(`http://localhost:80/user/info`, {
                    params: { userid }, // userid를 쿼리 파라미터로 전달
                })
                .then((response) => {
                    setFormData(response.data); // 가져온 사용자 데이터 저장
                })
                .catch((error) => {
                    console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
                });
        }
    }, [userid]);

    const changeUser = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, profileimage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const saveChanges = () => {
        const data = new FormData();
        data.append('userid', userid);
        data.append('name', formData.name || '');
        data.append('email', formData.email || '');
        data.append('phone', formData.phone || '');
        data.append('introduce', formData.introduce || '');
        if (profileImage) {
            data.append('profileimage', profileImage); // 새 이미지 추가
        }

        axios
            .post('http://localhost:80/user/update', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                console.log('저장 성공:', response.data);
                alert('저장되었습니다.');
                navigate("/myPage/profile");
            })
            .catch((error) => {
                console.error('저장 중 오류 발생:', error);
                alert('저장에 실패했습니다. 다시 시도해주세요.');
            });
    };

    return (
        <div>
            <Header/>
            <div className="myPage_mypagesetting">
                <div className="set-container">
                    <div className="set-image">
                        <label htmlFor="profile-upload">
                            <img
                                className="profile-img"
                                src={
                                    profileImage
                                        ? URL.createObjectURL(profileImage)
                                        : `${process.env.PUBLIC_URL}/profileImg/${formData.profileimage || 'defaultProfile.png'}`
                                }
                                alt="프로필 사진"
                                onError={(e) => {
                                    e.target.src = `${process.env.PUBLIC_URL}/profileImg/defaultProfile.png`;
                                }}
                            />
                        </label>
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="user-box">
                        <div className="user">이름</div>
                        <input className="user-text" id="user-name" name="name" value={formData.name || ""}
                               onChange={changeUser}/>
                    </div>
                    <div className="user-box">
                        <div className="user">이메일</div>
                        <input className="user-text" id="user-email" name="email" value={formData.email || ""}
                               onChange={changeUser}/>
                    </div>
                    <div className="user-box">
                        <div className="user">전화번호</div>
                        <input className="user-text" id="user-phone" name="phone" value={formData.phone || ""}
                               onChange={changeUser}/>
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
            </div>
        </div>
    )
}

export default MyPageSet;