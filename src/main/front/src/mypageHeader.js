import React, { useState, useEffect } from 'react';
import css from './css/header.css';
import {useNavigate} from "react-router-dom";

function MyPageHeader() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    // 컴포넌트가 렌더링될 때 로그인 여부를 확인하고, 로그인된 경우 사용자 정보 가져오기
    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        if (userid) {
            setIsLogin(true);
            fetchUserInfo(userid);  // userid를 서버로 전송하여 사용자 정보 가져오기
        }
    }, []);

    // 서버에서 사용자 정보를 가져오는 함수
    const fetchUserInfo = async (userid) => {
        try {
            const response = await fetch(`http://localhost:80/user/info?userid=${userid}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
    return (
        <div className="mypage_header">
            <div className="mypage_header_category-box">
                <a href="/myPage/profile" id="mypage_header_profile">프로필</a>
                <a href="/myPage/myShoppingPage" id="mypage_header_myshopping">나의 쇼핑</a>
                <a href="" id="mypage_header_myreview">나의 리뷰</a>
                <a href="/myPage/setting" id="mypage_header_setting">설정</a>
            </div>
        </div>
    );
}

export default MyPageHeader;
