import React, { useState } from 'react';
import axios from 'axios';
import css from '../css/payment.css';
import Header from "../header";

function Payment() {
    return(
        <div className="payment-body">
            <Header/>
            <section className="payment-main">
                <section className="payment-title-section">
                    <span>주문/결제</span>
                </section>
                <section className="payment-bill-section">
                    <div className="payment-order-user-section">
                        <div className="payment-order-user">
                            <span className="payment-order-user-title">주문자</span>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}
export default Payment;