package com.spring.myHouse.coupon.controller;

import com.spring.myHouse.coupon.entity.Coupon;
import com.spring.myHouse.coupon.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/coupon")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/coupons")
    public List<Coupon> getCoupons() {
        return couponService.getAllCoupons();
    }
}
