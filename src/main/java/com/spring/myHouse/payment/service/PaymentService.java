package com.spring.myHouse.payment.service;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.repository.ContestRepository;
import com.spring.myHouse.payment.entity.Payment;
import com.spring.myHouse.payment.repository.PaymentRepository;
import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final ProductService productService;

    // PaymentService 클래스에 추가
    public List<Payment> getPaymentListByStorenum(Long storenum) {
        return paymentRepository.findByStorenum(storenum); // storenum을 기준으로 결제 내역을 조회
    }

    // 오늘 베스트 (오늘 날짜 기준)
    public List<Map<String, Object>> getTodayBest() {
        // 오늘 날짜 가져오기
        String today = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

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

    // 상품별로 구매 횟수를 기준으로 정렬하여 베스트 상품 리스트 반환
    private List<Map<String, Object>> getBestProducts(List<Payment> payments) {
        // 상품별로 결제된 횟수 카운트
        Map<Long, Long> productCount = new HashMap<>();
        for (Payment payment : payments) {
            productCount.put(payment.getProductnum(), productCount.getOrDefault(payment.getProductnum(), 0L) + 1);
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
                productData.put("productName", product.getProductname());
                productData.put("productPrice", product.getProductprice());
                productData.put("productMainImage", product.getProductmainimage());
                productData.put("purchaseCount", entry.getValue()); // 구매 횟수

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
}