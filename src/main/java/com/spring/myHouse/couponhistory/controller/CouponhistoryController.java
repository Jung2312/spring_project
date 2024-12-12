package com.spring.myHouse.couponhistory.controller;

import com.spring.myHouse.coupon.entity.Coupon;
import com.spring.myHouse.coupon.service.CouponService;
import com.spring.myHouse.couponhistory.entity.Couponhistory;
import com.spring.myHouse.couponhistory.service.CouponhistoryService;
import com.spring.myHouse.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CouponhistoryController {
    @Autowired
    private CouponhistoryService couponhistoryService;
    @Autowired
    private CouponService couponService;
    
    @GetMapping("/coupon/valid/count")
    public int getValidCouponCount(@RequestParam String userid) {
        return couponhistoryService.getCountCouponHistory(userid);
    }

    @GetMapping("/couponhistory/couponlist")
    public List<Map<String, Object>> getCouponList(@RequestParam String userid) {
        // userid로 사용자 쿠폰 정보 조회
        List<Couponhistory> couponhistoryList = couponhistoryService.getUserCouponHistory(userid);

        // 결과 리스트 생성
        List<Map<String, Object>> couponhistoryWithCoupons = new ArrayList<>();

        // 각 쿠폰 데이터를 처리
        for (Couponhistory couponhistory : couponhistoryList) {
            Map<String, Object> couponhistoryWithCoupon = new HashMap<>();
            couponhistoryWithCoupon.put("couponnum", couponhistory.getCouponnum());
            couponhistoryWithCoupon.put("userid", couponhistory.getUserid());
            couponhistoryWithCoupon.put("couponusecheck", couponhistory.getCouponusecheck());
            couponhistoryWithCoupon.put("couponexpirationdate", couponhistory.getCouponexpirationdate());

            // Coupon 테이블에서 관련 데이터 조회
            Coupon coupon = couponService.getCouponsByCouponnum(couponhistory.getCouponnum());
            if (coupon != null) {
                couponhistoryWithCoupon.put("couponname", coupon.getCouponname());
                couponhistoryWithCoupon.put("couponprice", coupon.getCouponprice());
                couponhistoryWithCoupon.put("useminprice", coupon.getUseminprice());
            }
            // 리스트에 추가
            couponhistoryWithCoupons.add(couponhistoryWithCoupon);
        }
        return couponhistoryWithCoupons;
    }

}
