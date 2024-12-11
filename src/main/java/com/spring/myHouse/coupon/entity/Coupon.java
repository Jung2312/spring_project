package com.spring.myHouse.coupon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long couponnum;

    private String couponname;

    private String couponprice;

    private String useminprice;
}
