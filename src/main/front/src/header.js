import React, {useState, useEffect} from 'react';
import css from './css/header.css'
import SearchImg from './img/search_img.png'
import CartImg from './img/cart_img.png'

function Header(){
    const [userId, setUserId] = useState(null); // 로그인된 사용자 아이디 상태

    // 세션에서 사용자 아이디 가져오기
    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:80/user/session', {
                method: 'GET',
                credentials: 'include', // 세션 쿠키 포함
            });

            if (response.ok) {
                const data = await response.text();
                setUserId(data); // 로그인된 사용자 아이디 설정
            } else {
                setUserId(null); // 로그인되지 않음
            }
        } catch (error) {
            console.error('세션 확인 오류:', error);
            setUserId(null); // 에러 발생 시 로그인되지 않음
        }
    };

    // 컴포넌트가 렌더링될 때 세션 정보 확인
    useEffect(() => {
        checkSession();
    }, []);

    return (
        <header className="main-header">
            <div className="logo-name-box"><a href="" className="logo-name">나만의집</a></div>
            <div className="top-category-box">
                <a href="" id="community">커뮤니티</a>
                <a href="" id="shopping">쇼핑</a>
                <a href="" id="contest">콘테스트</a>
            </div>
            <div className="search-box">
                <img className="search-img" src={SearchImg}/>
                <input className="search-field" type="text" placeholder="통합검색"/>
            </div>
            <div className="cart-box">
                <a href=""><img src={CartImg}/></a>
            </div>
            <div className="header-user-box">
                {userId ? (
                    // 로그인된 경우, 아이디를 표시하고 로그인/회원가입 링크를 숨김
                    <span className="header-user-name">{userId}님</span>
                ) : (
                    // 로그인되지 않은 경우, 로그인 및 회원가입 링크를 표시
                    <>
                        <a href="/login" id="login">로그인</a>
                        <a href="/register" id="register">회원가입</a>
                    </>
                )}
                <a href="" id="service">고객센터</a>
            </div>
            <div className="post-btn-box">
                <button className="post-btn"><span>글쓰기</span></button>
            </div>
        </header>
    )
}

export default Header;