package com.spring.myHouse.couponhistory.repository;

import com.spring.myHouse.couponhistory.entity.Couponhistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CouponhistoryRepository extends JpaRepository<Couponhistory, Long> {
    @Query("SELECT COUNT(c) FROM Couponhistory c WHERE c.userid = :userid AND c.couponexpirationdate >= CURRENT_DATE")
    int countCouponhistoriesUserid(@Param("userid") String userid);
}

