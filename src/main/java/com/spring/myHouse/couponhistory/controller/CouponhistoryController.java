package com.spring.myHouse.couponhistory.controller;

import com.spring.myHouse.couponhistory.service.CouponhistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CouponhistoryController {
    private final CouponhistoryService couponhistoryService;

    @GetMapping("/coupon/valid/count")
    public int getValidCouponCount(@RequestParam String userid) {
        return couponhistoryService.getCountCouponHistory(userid);
    }
}
