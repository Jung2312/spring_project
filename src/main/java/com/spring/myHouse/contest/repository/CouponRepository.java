package com.spring.myHouse.contest.repository;

import com.spring.myHouse.contest.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
}
