package com.spring.myHouse.contest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long couponNum;

    private String couponName;

    private String couponPrice;

    private String useMinPrice;
}
