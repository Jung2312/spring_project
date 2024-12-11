import React, { useState, useEffect } from "react";
import css from '../css/addContest.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ContestRegistration = () => {
    const [formData, setFormData] = useState({
        contesttitle: "",
        conteststartdate: "",
        contestenddate: "",
        couponnum: 1,
    });

    const [coupons, setCoupons] = useState([]); // 쿠폰 목록 상태
    const [selectedCouponName, setSelectedCouponName] = useState(""); // 선택된 쿠폰 이름
    const navigate = useNavigate();

    // 시작 날짜를 동적으로 설정 (현재 날짜 이후로 설정)
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = (today.getMonth() + 1).toString().padStart(2, '0');
        const dd = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`; // "YYYY-MM-DD" 형식으로 변환
        setFormData((prevState) => ({
            ...prevState,
            conteststartdate: formattedDate, // 현재 날짜를 시작일로 설정
            contestenddate: formattedDate,   // 종료일도 현재 날짜로 초기화
        }));
    }, []);

    // 쿠폰 목록을 가져오는 함수
    const fetchCoupons = async () => {
        try {
            const response = await fetch("http://localhost:80/coupon/coupons"); // 정확한 URL 사용
            if (response.ok) {
                const data = await response.json();
                setCoupons(data); // 쿠폰 목록 업데이트

                // 초기 쿠폰 이름 설정
                const initialCoupon = data.find(coupon => coupon.couponnum === formData.couponnum);
                setSelectedCouponName(initialCoupon ? initialCoupon.couponname : "");
            } else {
                console.error('Failed to fetch coupons:', response.status);
                alert('쿠폰 목록을 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching coupons:', error);
            alert('쿠폰 목록을 가져오는 데 실패했습니다.');
        }
    };

    // 쿠폰 목록을 컴포넌트가 마운트될 때 한 번만 가져오기
    useEffect(() => {
        fetchCoupons();
    }, []);

    // 쿠폰 선택 시 해당 쿠폰 이름을 입력란에 설정
    const handleCouponChange = (e) => {
        const couponnum = e.target.value;
        setFormData({ ...formData, couponnum });

        // 선택된 쿠폰 번호에 해당하는 쿠폰 이름을 찾기
        const selectedCoupon = coupons.find(coupon => coupon.couponnum === parseInt(couponnum));
        setSelectedCouponName(selectedCoupon ? selectedCoupon.couponname : "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData(); // FormData 객체 생성
            formDataToSend.append("contesttitle", formData.contesttitle);
            formDataToSend.append("conteststartdate", formData.conteststartdate);
            formDataToSend.append("contestenddate", formData.contestenddate);
            formDataToSend.append("couponnum", formData.couponnum);

            const response = await fetch("http://localhost:80/contest/register", {
                method: "POST",
                body: formDataToSend, // JSON 대신 FormData 전송
            });

            if (response.ok) {
                alert("콘테스트 등록 성공!");
            } else {
                alert("콘테스트 등록 실패!");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("서버에 문제가 발생했습니다.");
        }
    };

    const logoutButtonClick = () => {
        sessionStorage.clear();
        navigate("/login"); // 로그인 페이지로 이동
    }

    return (
        <div className="admin_addContest">
            <header className="addContest_header">
                <div className="addContest_logo_box">
                    <a href="/main" className="addContest_title">나만의집</a>
                    <button id="admin_logout" onClick={() => logoutButtonClick()}>로그아웃</button>
                </div>
            </header>
            <form className="addContest_container" onSubmit={handleSubmit}>
                <div className="addContest_sidebar">
                    <ul>
                        <li onClick={() => navigate("/ContestRegistration")} className="addContest_active" style={{color: '#00bfff', fontWeight: 'bold', cursor: "pointer"}}>콘테스트 등록</li>
                        <hr/>
                        <li onClick={() => navigate("/ContestEdit")} style={{cursor: "pointer"}}>콘테스트 수정</li>
                    </ul>
                </div>
                <div className="addContest_content">
                    <div className="addContest_content_title">
                        <span>제목</span>
                        <input
                            type="text"
                            name="contesttitle"
                            placeholder="제목을 입력하세요."
                            className="addContest_title-input"
                            value={formData.contesttitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addContest_form-group">
                        <label>콘테스트 시작일</label>
                        <input
                            type="date"
                            name="conteststartdate"
                            value={formData.conteststartdate}
                            onChange={handleChange}
                            // 시작 날짜가 변경될 때마다 min 속성 갱신
                            min={new Date().toLocaleDateString("en-CA")} // 로컬 날짜 기준 // 항상 현재 날짜 이후만 선택
                        />
                    </div>
                    <div className="addContest_form-group">
                        <label>콘테스트 종료일</label>
                        <input
                            type="date"
                            name="contestenddate"
                            value={formData.contestenddate}
                            onChange={handleChange}
                            min={formData.conteststartdate} // 시작일 이후로만 종료일 선택 가능
                        />
                    </div>
                    <div className="addContest_form-group">
                        <label>쿠폰번호</label>
                        <select
                            name="couponnum"
                            value={formData.couponnum}
                            onChange={handleCouponChange}
                        >
                            {coupons.map(coupon => (
                                <option key={coupon.couponnum} value={coupon.couponnum}>
                                    {coupon.couponnum}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="불러낸 쿠폰 이름"
                            className="addContest_coupon-name"
                            value={selectedCouponName} // 선택된 쿠폰 이름을 출력
                            disabled
                        />
                    </div>
                    <div className="addContest_submit_button_div">
                        <button type="submit" className="addContest_submit-button">
                            등록하기
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContestRegistration;

