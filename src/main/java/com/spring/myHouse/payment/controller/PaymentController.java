package com.spring.myHouse.payment.controller;

import com.spring.myHouse.payment.entity.Payment;
import com.spring.myHouse.payment.service.PaymentService;
import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.service.ProductService;
import com.spring.myHouse.review.entity.Review;
import com.spring.myHouse.review.service.ReviewService;
import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final ProductService productService;
    private final StoreService storeService;

    private final ReviewService reviewService;

    // 오늘 베스트 상품 조회
    @GetMapping("/best/today")
    public List<Map<String, Object>> getTodayBest() {
        return paymentService.getTodayBest();
    }

    // 역대 베스트 상품 조회
    @GetMapping("/best/all")
    public List<Map<String, Object>> getAllTimeBest() {
        return paymentService.getAllTimeBest();
    }

    @GetMapping("/orders")
    public Map<String, Object> getOrders(@RequestParam String userid) {
        // 사용자 ID에 해당하는 결제 내역 가져오기
        List<Payment> payments = paymentService.getPaymentList(userid);

        // 결과 데이터 초기화
        List<Map<String, Object>> orders = payments.stream().map(payment -> {

            Map<String, Object> orderData = new HashMap<>();

            // Payment 기본 정보 추가
            orderData.put("payNum", payment.getPaynum());
            orderData.put("payDate", payment.getPaydate());
            orderData.put("payPrice", payment.getPayprice());
            orderData.put("payRepair", payment.getPayrepair());

            // Product 정보 추가 (연관된 productnum 활용)
            Product product = productService.getProductByProductnum(payment.getProductnum());

            if (product != null) {
                orderData.put("productName", product.getProductname());
                orderData.put("productNum", product.getProductnum());
                int productPrice = Integer.parseInt(product.getProductprice());

                orderData.put("productPrice", productPrice);
                orderData.put("productMainImage", product.getProductmainimage());
            }

            // Store 정보 추가 (연관된 storenum 활용)
            Store store = storeService.getStoreByStorenum(product.getStorenum());
            if (store != null) {
                orderData.put("storeName", store.getStorename());
            }

            return orderData;
        }).collect(Collectors.toList());

        // 응답 데이터 생성
        Map<String, Object> response = new HashMap<>();
        response.put("orders", orders);
        return response;
    }

    // 작성자가 본인 글 삭제
    @DeleteMapping("/cancle/{paymentnum}")
    public ResponseEntity<String> deletePayment(@PathVariable Long paymentnum) {

        if (!paymentService.paymentExists(paymentnum)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
        }

        try {
            paymentService.delPayment(paymentnum);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            // Handle any unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete payment");
        }
    }

    @GetMapping("/check")
    public boolean paymentExist(@RequestParam String userid, @RequestParam long productnum){
        Review review = reviewService.findAllByByUseridAndProductnum(userid, productnum);
        boolean flag = false;
        if(review != null){
            flag = true;
        }

        return flag;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPayment(@RequestBody Map<String, Object> paymentData) {
        try {
            // paymentData에서 필요한 정보 추출
            Long payOrderNum = Long.valueOf(paymentData.get("payordernum").toString());
            String userId = paymentData.get("userid").toString();
            Long productNum = Long.valueOf(paymentData.get("productnum").toString());
            Long payRepair = Long.valueOf(paymentData.get("payrepair").toString());
            Long payPrice = Long.valueOf(paymentData.get("payprice").toString());

            // Payment 객체 생성
            Payment payment = new Payment();
            payment.setPayordernum(payOrderNum);
            payment.setUserid(userId);
            payment.setProductnum(productNum);
            payment.setPayrepair(payRepair);
            payment.setPayprice(payPrice);
            payment.setPaydate(LocalDate.now());  // 현재 날짜 저장

            // 결제 저장
            paymentService.savePayments(payment);

            return ResponseEntity.ok("Payments saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving payments: " + e.getMessage());
        }
    }

    @GetMapping("/getPaymentDetails")
    public List<Map<String, Object>> getPaymentDetails(@RequestParam Long payordernum) {
        List<Payment> paymentList = paymentService.getPaymentByPayOrderNum(payordernum);

        List<Map<String, Object>> paymentWithProducts = new ArrayList<>();

        for (Payment payment : paymentList) {
            Map<String, Object> paymentWithDetails = new HashMap<>();

            paymentWithDetails.put("payordernum", payment.getPayordernum());
            paymentWithDetails.put("payprice", payment.getPayprice());
            paymentWithDetails.put("payrepair", payment.getPayrepair());
            paymentWithDetails.put("paydate", payment.getPaydate());
            paymentWithDetails.put("userid", payment.getUserid());

            Product product = productService.getProductByProductnum(payment.getProductnum());
            paymentWithDetails.put("productnum", product.getProductnum());
            paymentWithDetails.put("productname", product.getProductname());
            paymentWithDetails.put("productprice", Integer.parseInt(product.getProductprice()));

            paymentWithProducts.add(paymentWithDetails);
        }


        return paymentWithProducts;
    }
}
