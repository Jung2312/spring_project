import React, { useState, useEffect } from 'react';
import css from './css/header.css';
import SearchImg from './img/search_img.png';
import CartImg from './img/cart_img.png';
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const location = useLocation(); // 현재 경로를 가져옴

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

    const logoutButtonClick = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    // 활성화된 경로와 일치하는지 확인하는 함수
    const isActive = (path) => location.pathname === path;

    return (
        <div className="header">
            <header className="main-header">
                <div className="logo-name-box"><a href="/" className="logo-name">나만의집</a></div>
                <div className="top-category-box">
                    <a href="/recommend" id="community">커뮤니티</a>
                    <a href="/shoppinghome" id="shopping">쇼핑</a>
                    <a href="/contest" id="contest">콘테스트</a>
                </div>
                <div className="search-box">
                    <img className="search-img" src={SearchImg}/>
                    <input className="search-field" type="text" placeholder="통합검색"/>
                </div>
                <div className="cart-box">
                    <a href=""><img src={CartImg}/></a>
                </div>
                {isLogin ? (
                    // Display user information if logged in
                    <div className="header-user-box">
                        <a href="/myPage/profile"><span
                            className="header-user-name">{userInfo ? `${userInfo.name}님` : "로딩중..."}</span></a>
                        <button id="mainpage-logout" onClick={() => logoutButtonClick()}>로그아웃</button>
                        <a href="" id="service">고객센터</a>
                    </div>
                ) : (
                    // If not logged in, show login and register links
                    <div className="header-user-box">
                        <a href="/login" id="login">로그인</a>
                        <a href="/signup" id="register">회원가입</a>
                        <a href="" id="service">고객센터</a>
                    </div>
                )}
                <div className="post-btn-box">
                    <button className="post-btn"><span>글쓰기</span></button>
                </div>
            </header>
            {/* 현재 경로가 /myPage로 시작하지 않을 때만 sub-header 표시 */}
            {!location.pathname.startsWith("/myPage") && (
                <div className="sub-header">
                    <div className="sub-header-category-box">
                        <a href="" id="sub-header-shopping">쇼핑홈</a>
                        <a href="" id="sub-header-category">카테고리</a>
                        <a href="" id="sub-header-best">베스트</a>
                    </div>
                    <div className="sub-header-realtime-search-box">
                        <div className="sub-header-realtime-search">
                            <a href="" className="sub-header-realtime-search-href">
                                <span className="sub-header-realtime-search-rank">1</span>
                                <span className="sub-header-realtime-search-img">new</span>
                                <span className="sub-header-realtime-search-product-name">리바트 소파</span>
                            </a>
                        </div>
                        <div className="sub-header-realtime-search-more-btn">
                            <button className="sub-header-more-btn">▼</button>
                        </div>
                    </div>
                </div>
            )}
            {/* 현재 경로가 /myPage로 시작할 때만 mypage_header 표시 */}
            {location.pathname.startsWith("/myPage") && (
                <div className="mypage_header">
                    <div className="mypage_header_category-box">
                        <a
                            href="/myPage/profile"
                            id="mypage_header_profile"
                            className={isActive("/myPage/profile") ? "active" : ""}
                        >
                            프로필
                        </a>
                        <a
                            href="/myPage/myShoppingPage"
                            id="mypage_header_myshopping"
                            className={isActive("/myPage/myShoppingPage") ? "active" : ""}
                        >
                            나의 쇼핑
                        </a>
                        <a
                            href="/myPage/myreview"
                            id="mypage_header_myreview"
                            className={isActive("/myPage/myreview") ? "active" : ""}
                        >
                            나의 리뷰
                        </a>
                        <a
                            href="/myPage/setting"
                            id="mypage_header_setting"
                            className={isActive("/myPage/setting") ? "active" : ""}
                        >
                            설정
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
