package com.spring.myHouse.payment.service;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.repository.ContestRepository;
import com.spring.myHouse.payment.entity.Payment;
import com.spring.myHouse.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public List<Payment> getPaymentList(String userid){
        return paymentRepository.findByUserid(userid);
    }
}
