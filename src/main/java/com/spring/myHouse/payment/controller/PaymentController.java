package com.spring.myHouse.payment.controller;

import com.spring.myHouse.payment.entity.Payment;
import com.spring.myHouse.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping("/orders")
    public ResponseEntity<List<Payment>> getOrders(@RequestParam String userid) {
        List<Payment> orders = paymentService.getPaymentList(userid);
        return ResponseEntity.ok(orders);
    }
}
