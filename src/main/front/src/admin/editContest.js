import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom"; // useParams 훅 임포트
import css from '../css/addContest.css';

const ContestEdit = ({ match }) => {
    const { contestnum } = useParams(); // useParams로 contestnum 가져오기

    const [formData, setFormData] = useState({
        contesttitle: "",
        conteststartdate: "",
        contestenddate: "",
        couponnum: 1,
    });

    const [coupons, setCoupons] = useState([]); // 쿠폰 목록 상태
    const [selectedCouponName, setSelectedCouponName] = useState(""); // 선택된 쿠폰 이름
    const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // 이미지 미리보기 URL
    const navigate = useNavigate();

    // 초기 데이터 가져오기
    useEffect(() => {
        const fetchContestData = async () => {
            try {
                const response = await fetch(`http://localhost:80/contest/${contestnum}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        contesttitle: data.contesttitle,
                        conteststartdate: data.conteststartdate,
                        contestenddate: data.contestenddate,
                        couponnum: data.couponnum,
                    });
                    setImagePreviewUrl(data.contestimg); // 기존 이미지 URL 설정
                    // 쿠폰 데이터를 가져온 뒤 쿠폰 이름 설정
                    const couponResponse = await fetch("http://localhost:80/coupon/coupons");
                    if (couponResponse.ok) {
                        const couponData = await couponResponse.json();
                        setCoupons(couponData);

                        // 데이터에서 해당 쿠폰 이름 설정
                        const initialCoupon = couponData.find(coupon => coupon.couponnum === data.couponnum);
                        setSelectedCouponName(initialCoupon ? initialCoupon.couponname : "");
                    } else {
                        console.error('Failed to fetch coupons:', couponResponse.status);
                        alert('쿠폰 목록을 가져오는 데 실패했습니다.');
                    }
                } else {
                    alert('콘테스트 데이터를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('Error fetching contest data:', error);
                alert('콘테스트 데이터를 불러오는 중 문제가 발생했습니다.');
            }
        };

        fetchContestData();
    }, [contestnum]);

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

    // 이미지 업로드 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreviewUrl(reader.result); // 이미지 미리보기 URL 설정
            };
            reader.readAsDataURL(file);
        }
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

            // 이미지 파일 추가
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput && fileInput.files[0]) {
                formDataToSend.append("contestimg", fileInput.files[0]);
            }

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

    const handleButtonClick = () => {
        document.getElementById("hiddenFileInput").click();
    };

    return (
        <div className="admin_addContest">
            <header className="addContest_header">
                <div className="addContest_logo_box">
                    <a href="/main" className="addContest_title">나만의집</a>
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
                    <div className="addContest_description">
                        {imagePreviewUrl ? (
                            <img
                                src={imagePreviewUrl}
                                alt="미리보기"
                                className="addContest_image-preview"
                            />
                        ) : (
                            <p>이미지가 여기에 표시됩니다.</p>
                        )}
                    </div>
                    <div className="file-upload-container">
                        <div className="addContest_form-group">
                            <input
                                type="file"
                                id="hiddenFileInput"
                                accept="image/*"
                                style={{display: "none"}}
                                onChange={handleImageUpload}
                            />
                            <button
                                type="button"
                                className="addContest_image_button"
                                onClick={handleButtonClick}
                            >
                                이미지 업로드
                            </button>
                        </div>
                    </div>
                    <hr/>
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
