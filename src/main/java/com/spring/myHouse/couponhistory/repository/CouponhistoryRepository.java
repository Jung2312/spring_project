package com.spring.myHouse.couponhistory.repository;

import com.spring.myHouse.couponhistory.entity.Couponhistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CouponhistoryRepository extends JpaRepository<Couponhistory, Long> {
    List<Couponhistory> findAllByUserid(String userid);

    @Query("select count(c) from Couponhistory c where c.userid = :userid")
    int countCouponhistoriesUserid(@Param("userid") String userid);
}
