package com.spring.myHouse.coupon.repository;

import com.spring.myHouse.coupon.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> findAll();

    Coupon findAllByCouponnum(Long couponnum);
}

