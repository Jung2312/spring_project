package com.spring.myHouse.payment.service;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.repository.ContestRepository;
import com.spring.myHouse.payment.controller.PaymentController;
import com.spring.myHouse.payment.entity.Payment;
import com.spring.myHouse.payment.repository.PaymentRepository;
import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final ProductService productService;

    // 오늘 베스트 (오늘 날짜 기준)
    public List<Map<String, Object>> getTodayBest() {
        // 오늘 날짜 가져오기
        String today = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        // 오늘 날짜와 결제 날짜 비교
        List<Payment> todayPayments = paymentRepository.findAll()
                .stream()
                .filter(payment -> payment.getPaydate().equals(today)) // 오늘 결제 내역만 필터링
                .collect(Collectors.toList());

        return getBestProducts(todayPayments);
    }

    // 역대 베스트 (전체 결제 내역 기준)
    public List<Map<String, Object>> getAllTimeBest() {
        List<Payment> allPayments = paymentRepository.findAll();
        return getBestProducts(allPayments);
    }

    private List<Map<String, Object>> getBestProducts(List<Payment> payments) {
        // 상품별로 결제 횟수 및 마지막 결제 날짜 카운트
        Map<Long, Long> productCount = new HashMap<>();
        Map<Long, LocalDate> lastPaymentDate = new HashMap<>();

        for (Payment payment : payments) {
            Long productNum = payment.getProductnum();
            productCount.put(productNum, productCount.getOrDefault(productNum, 0L) + 1);
            lastPaymentDate.put(productNum, payment.getPaydate());
        }

        // 구매 횟수를 기준으로 내림차순 정렬
        List<Map.Entry<Long, Long>> sortedEntries = productCount.entrySet()
                .stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue())) // 내림차순
                .collect(Collectors.toList());

        List<Map<String, Object>> bestProducts = new ArrayList<>();
        for (Map.Entry<Long, Long> entry : sortedEntries) {
            Product product = productService.getProductByProductnum(entry.getKey());
            if (product != null) {
                Map<String, Object> productData = new HashMap<>();
                productData.put("productNum", product.getProductnum());
                productData.put("productName", product.getProductname());
                productData.put("productPrice", product.getProductprice());
                productData.put("productMainImage", product.getProductmainimage());
                productData.put("purchaseCount", entry.getValue());
                productData.put("lastPaymentDate", lastPaymentDate.get(entry.getKey())); // 마지막 결제 날짜 추가

                bestProducts.add(productData);
            }
        }
        return bestProducts;
    }

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

    // 결제 저장
    public void savePayments(Payment payments) {
        paymentRepository.save(payments);
    }

    // 주문번호로 주문 조회
    public List<Payment> getPaymentByPayOrderNum(Long payordernum) {
        return paymentRepository.findByPayordernum(payordernum);  // payordernum으로 데이터 조회
    }
}
