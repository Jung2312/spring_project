import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom"; // useParams 훅 임포트
import css from '../css/addContest.css';

const ContestEdit = ({ match }) => {
    const [formData, setFormData] = useState({
        contesttitle: "",
        conteststartdate: "",
        contestenddate: "",
        couponnum: 1,
    });

    const [coupons, setCoupons] = useState([]); // 쿠폰 목록 상태
    const [selectedCouponName, setSelectedCouponName] = useState(""); // 선택된 쿠폰 이름
    const [contestnum, setContestnum] = useState(null); // 진행 중인 콘테스트 번호 상태
    const navigate = useNavigate();

// 진행 중인 콘테스트 번호 확인 및 데이터 로드
    useEffect(() => {
        const fetchOngoingContest = async () => {
            try {
                // 진행 중인 콘테스트 가져오기
                const ongoingResponse = await fetch("http://localhost:80/contest/update");
                if (ongoingResponse.ok) {
                    const ongoingData = await ongoingResponse.json();
                    setContestnum(ongoingData.contestnum); // 진행 중인 콘테스트 번호 설정

                    // 콘테스트 데이터 로드
                    const contestResponse = await fetch(`http://localhost:80/contest/${ongoingData.contestnum}`);
                    if (contestResponse.ok) {
                        const data = await contestResponse.json();
                        setFormData({
                            contesttitle: data.contesttitle,
                            conteststartdate: data.conteststartdate,
                            contestenddate: data.contestenddate,
                            couponnum: data.couponnum,
                        });

                        // 쿠폰 데이터 로드
                        const couponResponse = await fetch("http://localhost:80/coupon/coupons");
                        if (couponResponse.ok) {
                            const couponData = await couponResponse.json();
                            setCoupons(couponData);

                            // 초기 쿠폰 이름 설정
                            const initialCoupon = couponData.find(coupon => coupon.couponnum === data.couponnum);
                            setSelectedCouponName(initialCoupon ? initialCoupon.couponname : "");
                        } else {
                            console.error("Failed to fetch coupons:", couponResponse.status);
                            alert("쿠폰 목록을 가져오는 데 실패했습니다.");
                        }
                    } else {
                        alert("콘테스트 데이터를 불러오는 데 실패했습니다.");
                    }
                } else {
                    alert("현재 진행 중인 콘테스트가 없습니다.");
                    navigate("/ContestRegistration"); // 진행 중인 콘테스트가 없으면 등록 페이지로 이동
                }
            } catch (error) {
                console.error("Error fetching ongoing contest data:", error);
                alert("데이터를 가져오는 중 문제가 발생했습니다.");
            }
        };

        fetchOngoingContest();
    }, [navigate]);

// 쿠폰 목록 가져오기
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await fetch("http://localhost:80/coupon/coupons");
                if (response.ok) {
                    const data = await response.json();
                    setCoupons(data);

                    // formData.couponnum에 해당하는 쿠폰 이름 설정
                    const initialCoupon = data.find(coupon => coupon.couponnum === parseInt(formData.couponnum));
                    setSelectedCouponName(initialCoupon ? initialCoupon.couponname : "");
                } else {
                    console.error('Failed to fetch coupons:', response.status);
                    alert('쿠폰 목록을 가져오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('Error fetching coupons:', error);
                alert('쿠폰 목록을 가져오는 중 문제가 발생했습니다.');
            }
        };

        fetchCoupons();
    }, []); // 빈 배열로 설정하여 쿠폰 목록은 한 번만 가져옵니다.

// 쿠폰 번호 변경 시 쿠폰 이름 업데이트
    const handleCouponChange = (e) => {
        const selectedCouponNum = e.target.value;
        setFormData({ ...formData, couponnum: selectedCouponNum });

        // 선택한 쿠폰 번호에 맞는 쿠폰 이름 찾기
        const selectedCoupon = coupons.find(coupon => coupon.couponnum === parseInt(selectedCouponNum));
        setSelectedCouponName(selectedCoupon ? selectedCoupon.couponname : "");
    };

    // 입력 값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 수정 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("contesttitle", formData.contesttitle);
            formDataToSend.append("conteststartdate", formData.conteststartdate);
            formDataToSend.append("contestenddate", formData.contestenddate);
            formDataToSend.append("couponnum", formData.couponnum);

            const response = await fetch(`http://localhost:80/contest/update/${contestnum}`, {
                method: "PUT", // 수정 요청
                body: formDataToSend,
            });

            if (response.ok) {
                alert("콘테스트 수정 성공!");
            } else {
                alert("콘테스트 수정 실패!");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("서버에 문제가 발생했습니다.");
        }
    };

    if (contestnum === null) {
        return <div>Loading...</div>;
    }

    const logoutButtonClick = () => {
        sessionStorage.clear();
        window.location.reload();
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
                        <li onClick={() => navigate("/ContestRegistration")} style={{ cursor: "pointer" }}>콘테스트 등록</li>
                        <hr/>
                        <li className="addContest_active" style={{color: '#00bfff', fontWeight: 'bold'}}>콘테스트 수정</li>
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
                            min={new Date().toLocaleDateString("en-CA")} // 현재 날짜 이후만 선택 가능
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
                            value={selectedCouponName}
                            disabled
                        />
                    </div>
                    <div className="addContest_submit_button_div">
                        <button type="submit" className="addContest_submit-button">
                            수정하기
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContestEdit;
