package com.spring.myHouse.product.controller;

import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // 특정 카테고리에 속한 상품 목록 조회
    @GetMapping("/category/{categorynum}")
    public List<Product> getProductsByCategory(@PathVariable Long categorynum) {
        System.out.println("Fetching products for category: " + categorynum); // 로그 추가
        return productService.getProductsByCategory(categorynum);
    }

    @GetMapping("/productList")
    public List<Product> getProductsByStore(@RequestParam Long storenum) {
        System.out.println("Fetching products by store : " + storenum);
        return productService.getProductsByStore(storenum);
    }

    @GetMapping("/productCount")
    public Long getProductCount(@RequestParam Long storenum){
        System.out.println("Fetching products by store : " + storenum);
        return productService.getProductCountByStore(storenum);
    }
}
