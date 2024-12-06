package com.spring.myHouse.mileage.repository;

import com.spring.myHouse.mileage.entity.Mileage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MileageRepository extends JpaRepository<Mileage, Long> {
    @Query("select m.balance from Mileage m where m.userid = :userid")
    int findBalanceByUserid(@Param("userid") String userid);
}
