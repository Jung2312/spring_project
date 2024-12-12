package com.spring.myHouse.couponhistory.service;

import com.spring.myHouse.couponhistory.entity.Couponhistory;
import com.spring.myHouse.couponhistory.repository.CouponhistoryRepository;
import com.spring.myHouse.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CouponhistoryService {
    private final CouponhistoryRepository couponhistoryRepository;

    public List<Couponhistory> getUserCouponHistory(String userid) {
        return couponhistoryRepository.findAllByUserid(userid);
    }

    public int getCountCouponHistory(String userid){
        return couponhistoryRepository.countCouponhistoriesUserid(userid);
    }
}
