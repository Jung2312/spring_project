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

    // 주문 확인
    public boolean paymentExists(Long paymentnum) {
        return paymentRepository.existsById(paymentnum);
    }

    // 주문 삭제
    public void delPayment(Long paymentnum){
        paymentRepository.deleteById(paymentnum);
    }

    // 주문 조회(리뷰용)
    public boolean isExistUseridAndProductnum(String userid, long productnum){
        return paymentRepository.existsByUseridAndProductnum(userid, productnum);
    }
}
