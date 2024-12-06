package com.spring.myHouse.couponhistory.service;

import com.spring.myHouse.couponhistory.repository.CouponhistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CouponhistoryService {
    private final CouponhistoryRepository couponhistoryRepository;
    public int getCountCouponHistory(String userid){
        return couponhistoryRepository.countCouponhistoriesUserid(userid);
    }
}
