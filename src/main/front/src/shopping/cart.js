import React, {useEffect, useState} from 'react';
import product from '../img/exProfile.png'
import '../css/shopping.css';
import Header from "../header";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]); // 체크된 상품의 ID 저장
    const [totalPrice, setTotalPrice] = useState(0);
    const deliveryFee = 2500; // 고정 배송비
    const userid = sessionStorage.getItem("userid");
    const formatPrice = (price) => {
        return price.toLocaleString(); // 쉼표
    };

    // 서버에서 장바구니 가져오기
    useEffect(() => {
        if (!userid) {
            navigate("/login");
        } else {
            axios
                .get(`http://localhost:80/cart/all`, {
                    params: { userid }, // userid를 쿼리 파라미터로 전달
                })
                .then((response) => {
                    setCart(response.data); // 가져온 데이터 저장
                })
                .catch((error) => {
                    console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
                });
        }
    }, [userid]);

    // 총 상품 금액 계산
    useEffect(() => {
        const total = selectedItems.reduce((sum, id) => {
            const item = cart.find((product) => product.productnum === id);
            return sum + (item ? parseInt(item.productprice) * item.cartrepair : 0);
        }, 0);
        setTotalPrice(total);
    }, [selectedItems, cart]);

    // 체크 박스 핸들러
    const handleCheckboxChange = (productnum) => {
        setSelectedItems((prev) =>
            prev.includes(productnum)
                ? prev.filter((id) => id !== productnum) // 체크 해제
                : [...prev, productnum] // 체크 추가
        );
    };

    // 삭제 버튼 핸들러
    const handleDelete = (productnum) => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios
                .delete(`http://localhost:80/cart/delete`, {
                    params: { userid, productnum },
                })
                .then(() => {
                    const updatedCart = cart.filter((product) => product.productnum !== productnum);
                    setCart(updatedCart);
                })
                .catch((error) => {
                    console.error("삭제 중 오류가 발생했습니다.", error);
                    console.log("Error Config:", error.config);
                    console.log("Error Request:", error.request);
                    console.log("Error Response:", error.response);
                });
        }
    };

    return (
        <div>
            <Header/>
            <div className="cart-container">
            <div className="purchase-container">
                <div className="product-section">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div className="product-tab" key={index}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.productnum)}
                                    onChange={() => handleCheckboxChange(item.productnum)}
                                />
                                <div className="product-info">
                                    <div className="product-image">
                                        <img src={item.productmainimage} alt={item.productname}/>
                                    </div>
                                    <div className="product-name">{item.productname}</div>
                                </div>
                                <div className="quantity-control">
                                    <div>
                                        <button
                                            className="down"
                                            onClick={() => {
                                                if (item.cartrepair > 1) {
                                                    const updatedCart = cart.map((product) =>
                                                        product.productnum === item.productnum
                                                            ? {
                                                                ...product,
                                                                cartrepair: product.cartrepair - 1,
                                                            }
                                                            : product
                                                    );
                                                    setCart(updatedCart);
                                                }
                                            }}
                                        > -
                                        </button>
                                        {item.cartrepair}
                                        <button
                                            className="up"
                                            onClick={() => {
                                                const updatedCart = cart.map((product) =>
                                                    product.productnum === item.productnum
                                                        ? {
                                                            ...product,
                                                            cartrepair: product.cartrepair + 1,
                                                        }
                                                        : product
                                                );
                                                setCart(updatedCart);
                                            }}
                                        > +
                                        </button>
                                    </div>
                                </div>
                                <div className="product-price">
                                    {formatPrice(parseInt(item.productprice) * item.cartrepair)}원
                                </div>
                                <button
                                    className="product-del"
                                    onClick={() => handleDelete(item.productnum)}
                                > X
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>장바구니가 비어 있습니다.</p>
                    )}
                </div>
                <div className="summary-section">
                    <div className="summary-item">
                    <span>총 상품금액</span>
                        <span>{formatPrice(totalPrice)}원</span>
                    </div>
                    <div className="summary-item">
                        <span>총 배송비</span>
                        <span>+ {formatPrice(selectedItems.length > 0 ? deliveryFee : 0)}원</span>
                    </div>
                    <div className="total-payment">
                        <span>결제금액</span>
                        <span>{formatPrice(totalPrice + (selectedItems.length > 0 ? deliveryFee : 0))}원</span>
                    </div>
                    <button className="purchase-button" disabled={selectedItems.length === 0}>
                        상품 구매하기
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Cart;

