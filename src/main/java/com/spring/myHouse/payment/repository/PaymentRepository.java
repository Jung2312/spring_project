package com.spring.myHouse.payment.repository;

import com.spring.myHouse.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserid(String userid);

    boolean existsByUseridAndProductnum(String userid, long productnum);

    @Query("SELECT p FROM Payment p WHERE p.storenum = ?1")
    List<Payment> findByStorenum(Long storenum);
}