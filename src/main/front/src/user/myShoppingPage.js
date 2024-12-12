import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../header.js'
import MyPageHeader from "../mypageHeader";

function MyShoppingPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        count: 0, // 쿠폰 개수
        mileage: 0, // 마일리지
        grade: "웰컴", // 등급
    });
    const [orders, setOrders] = useState([]); // 전체 주문 데이터
    const [filteredOrders, setFilteredOrders] = useState([]); // 필터링된 주문 데이터
    const [filterPeriod, setFilterPeriod] = useState(7); // 기본값: 1주일

    useEffect(() => {
        const userid = sessionStorage.getItem("userid");
        if (userid == null) {
            navigate("/login");
        } else {
            // 사용자 데이터 가져오기
            axios
                .get("http://localhost:80/user/myShopping", {
                    params: { userid: userid },
                })
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error("Failed to fetch user data:", error);
                });

            // 주문 데이터 가져오기
            axios
                .get("http://localhost:80/payment/orders", {
                    params: { userid: userid },
                })
                .then((response) => {
                    const sortedOrders = response.data.orders.sort(
                        (a, b) => new Date(b.payDate) - new Date(a.payDate) // 날짜 최신순 정렬
                    );
                    setOrders(sortedOrders);
                })
                .catch((error) => {
                    console.error("Failed to fetch orders:", error);
                });
        }
    }, [navigate]);

    // 숫자를 콤마 형식으로 변환하는 함수
    const formatNumberWithCommas = (number) => {
        if (typeof number !== "number") {
            return "0"; // 기본값 설정
        }
        return number.toLocaleString("ko-KR");
    };

    // 주문 데이터 필터링
    useEffect(() => {
        const now = new Date();
        const filtered = orders.filter((order) => {
            const orderDate = new Date(order.payDate);
            if (isNaN(orderDate)) {
                console.error("Invalid date format:", order.payDate);
                return false; // 잘못된 날짜는 필터링에서 제외
            }
            const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);
            return diffDays <= filterPeriod; // 선택된 기간 내 데이터 필터링
        });
        console.log("Filtered Orders:", filtered);
        setFilteredOrders(filtered);
    }, [orders, filterPeriod]);

    // 날짜별로 주문 데이터 그룹화
    const groupedOrdersByDate = filteredOrders.reduce((acc, order) => {
        const date = order.payDate; // 날짜 값
        if (!acc[date]) acc[date] = [];
        acc[date].push(order);
        return acc;
    }, {});

    // 주문 취소 처리
    const handleCancelOrder = (payNum) => {
        fetch(`http://localhost:80/payment/cancle/${payNum}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("주문 취소 실패");
                }
                alert("주문 취소가 완료 되었습니다.");
                setOrders(prevOrders => prevOrders.filter(order => order.payNum !== payNum));
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("주문 취소가 완료 되지 않았습니다.");
            });
    };

    // 필터 변경 핸들러
    const handleFilterChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setFilterPeriod(value);
    };

    return (
        <div>
            <Header/>
            <div className="myPage_myShoppingPage">
                <div className="myShoppingPageContainer">
                    <div className="myShoppingPageCategoryBox">
                        <img
                            src={`${process.env.PUBLIC_URL}/mypageImg/couponIcon.png` || ""}
                            alt="Coupon Icon"
                        />
                        <span className="myShoppingPageCategoryTitle">내 쿠폰</span>
                        <span className="myShoppingPageCategoryContent">{userData.count}</span>
                    </div>
                    <div className="myShoppingPageVline"></div>
                    <div className="myShoppingPageCategoryBox">
                        <img
                            src={`${process.env.PUBLIC_URL}/mypageImg/mlieIcon.png` || ""}
                            alt="Mileage Icon"
                        />
                        <span className="myShoppingPageCategoryTitle">마일리지</span>
                        <span className="myShoppingPageCategoryContent">{formatNumberWithCommas(userData.mileage)}</span>
                    </div>
                    <div className="myShoppingPageVline2"></div>
                    <div className="myShoppingPageCategoryBox">
                        <img
                            src={`${process.env.PUBLIC_URL}/mypageImg/cardIcon.png` || ""}
                            alt="Grade Icon"
                        />
                        <span className="myShoppingPageCategoryTitle">등급</span>
                        <span className="myShoppingPageCategoryContent">{userData.grade}</span>
                    </div>
                </div>

                <div className="myShoppingPageOrderBox">
                    <div>
                        <select className="myShoppingPageSelect" onChange={handleFilterChange}>
                            <option value="7">1주일 전</option>
                            <option value="30">1개월 전</option>
                            <option value="90">3개월 전</option>
                            <option value="180">6개월 전</option>
                            <option value="365">1년 전</option>
                        </select>
                    </div>
                    {Object.entries(groupedOrdersByDate).map(([date, items]) => (
                        <div key={date} className="dateGroup">
                            <div>
                                <h3>
                                    {date} | 주문 {items.length}건
                                </h3>
                            </div>
                            {items.map((item) => (
                                <div key={item.payNum} className="myShoppingPageContainer2">
                                    <img
                                        src={item.productMainImage}
                                        alt={item.productName}
                                        className="myShoppingPageOrderImg"
                                    />
                                    <div onClick={() => navigate(`/productDetail/${item.productNum}`)} className="myShoppingPageOrderDetails" >
                                        <span className="myShoppingPageOrderTitle">{item.storeName}</span>

                                        <span className="myShoppingPageOrderTitle">
                                        {item.productName}
                                    </span>
                                        <span
                                            className="myShoppingPageOrderPrice">{formatNumberWithCommas(item.payPrice)}원 | {formatNumberWithCommas(item.productPrice)} X {item.payRepair}개</span>
                                    </div>
                                    <input
                                        type="button"
                                        value="주문 취소"
                                        className="myShoppingPageOrderDelBtn"
                                        onClick={() => handleCancelOrder(item.payNum)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyShoppingPage;
