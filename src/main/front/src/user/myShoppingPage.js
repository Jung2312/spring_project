import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MyPageSet from "./myPageSet";
import logo from "../img/myhouse_logo.png";

function MyShoppingPage(){
    return (
        <div>
            <div className="myShoppingPageContainer">
                <div className="myShoppingPageCategoryBox">
                    <img src={`${process.env.PUBLIC_URL}/mypageImg/couponIcon.png` || ''}/>
                    <span className="myShoppingPageCategoryTitle">내 쿠폰</span>
                    <span className="myShoppingPageCategoryContent">0</span>
                </div>
                <div className="myShoppingPageVline">
                </div>
                <div className="myShoppingPageCategoryBox">
                    <img src={`${process.env.PUBLIC_URL}/mypageImg/mlieIcon.png` || ''}/>
                    <span className="myShoppingPageCategoryTitle">마일리지</span>
                    <span className="myShoppingPageCategoryContent">0</span>
                </div>
                <div className="myShoppingPageVline2">
                </div>
                <div className="myShoppingPageCategoryBox">
                    <img src={`${process.env.PUBLIC_URL}/mypageImg/cardIcon.png` || ''}/>
                    <span className="myShoppingPageCategoryTitle">등급</span>
                    <span className="myShoppingPageCategoryContent">Basic</span>
                </div>
            </div>

            <div className="myShoppingPageOrderBox">
                <div>
                    <select className="myShoppingPageSelect">
                        <option value="1">1주일 전</option>
                        <option value="2">1개월 전</option>
                        <option value="3">3개월 전</option>
                        <option value="4">6개월 전</option>
                        <option value="5">1년 전</option>
                    </select>
                </div>
                <div>
                    <span>2024.11.12 | 주문 1건</span>
                    <a href="/myShoppingPage" className="myShoppingPageOrderDetailText">주문 상세 ></a>
                    <div className="myShoppingPageContainer2">
                        <img
                            src={`${process.env.PUBLIC_URL}/mypageImg/mlieIcon.png`}
                            className="myShoppingPageOrderImg"
                            alt="Order Item"
                        />
                        <div className="myShoppingPageOrderDetails">
                            <span className="myShoppingPageOrderTitle">어그레이어블리</span>
                            <span
                                className="myShoppingPageOrderDescription">[당일출고] 노프레임 비정형 웨이브 전신거울 A-4 + 원목/실버 받침대 선택</span>
                            <span className="myShoppingPageOrderPrice">129,000원 | 1개</span>
                        </div>
                        <input type="button" value="주문 취소" className="myShoppingPageOrderDelBtn"/>
                    </div>
                </div>

                <div>
                    <span>2024.11.12 | 주문 1건</span>
                    <a href="/myShoppingPage" className="myShoppingPageOrderDetailText">주문 상세 ></a>
                    <div className="myShoppingPageContainer2">
                        <img
                            src={`${process.env.PUBLIC_URL}/mypageImg/mlieIcon.png`}
                            className="myShoppingPageOrderImg"
                            alt="Order Item"
                        />
                        <div className="myShoppingPageOrderDetails">
                            <span className="myShoppingPageOrderTitle">어그레이어블리</span>
                            <span
                                className="myShoppingPageOrderDescription">[당일출고] 노프레임 비정형 웨이브 전신거울 A-4 + 원목/실버 받침대 선택</span>
                            <span className="myShoppingPageOrderPrice">129,000원 | 1개</span>
                        </div>
                        <input type="button" value="주문 취소" className="myShoppingPageOrderDelBtn"/>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default MyShoppingPage;