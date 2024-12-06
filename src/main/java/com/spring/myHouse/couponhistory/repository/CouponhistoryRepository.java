package com.spring.myHouse.couponhistory.repository;

import com.spring.myHouse.couponhistory.entity.Couponhistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CouponhistoryRepository extends JpaRepository<Couponhistory, Long> {
    @Query("select count(c) from Couponhistory c where c.userid = :userid")
    int countCouponhistoriesUserid(@Param("userid") String userid);
}
