package com.spring.myHouse.payment.repository;

import com.spring.myHouse.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserid(String userid);

    boolean existsByUseridAndProductnum(String userid, long productnum);
}
