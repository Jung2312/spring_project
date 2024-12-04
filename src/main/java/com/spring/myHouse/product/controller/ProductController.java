package com.spring.myHouse.product.controller;

import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final JdbcTemplate jdbcTemplate;

    // 특정 카테고리에 속한 상품 목록 조회
    @GetMapping("/category/{categorynum}")
    public List<Product> getProductsByCategory(@PathVariable Long categorynum) {
        System.out.println("Fetching products for category: " + categorynum); // 로그 추가
        return productService.getProductsByCategory(categorynum);
    }

    @GetMapping("/category/{categorynum}/store/{storenum}")
    public List<Product> getProductsByCategoryAndStore(
            @PathVariable Long categorynum,
            @PathVariable Long storenum) {
        System.out.println("Fetching products for category: " + categorynum + ", store: " + storenum);
        return productService.getProductsByCategoryAndStore(categorynum, storenum);
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

    @GetMapping("/productslist")
    public List<Map<String, Object>> getProducts() {
        String query = "SELECT p.productmainimage, p.productname, p.productprice, s.storename " +
                "FROM product p " +
                "JOIN store s ON p.storenum = s.storenum";
        return jdbcTemplate.query(query, (rs, rowNum) -> {
            Map<String, Object> result = new HashMap<>();
            result.put("productMainImage", rs.getString("productmainimage"));
            result.put("productName", rs.getString("productname"));
            result.put("productPrice", rs.getInt("productprice"));
            result.put("storeName", rs.getString("storename"));
            return result;
        });
    }

}
