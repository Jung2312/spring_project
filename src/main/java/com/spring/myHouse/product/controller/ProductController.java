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
    public List<Map<String, Object>> getProducts(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "8") int limit) {
        // 페이지와 제한 개수로 계산된 OFFSET
        int offset = (page - 1) * limit;

        // LIMIT과 OFFSET을 사용한 쿼리
        String query = "SELECT p.productmainimage, p.productname, p.productprice, s.storename " +
                "FROM product p " +
                "JOIN store s ON p.storenum = s.storenum " +
                "LIMIT ? OFFSET ?"; // LIMIT과 OFFSET 사용;

        // 쿼리 파라미터로 limit과 offset을 넘겨서 처리
        return jdbcTemplate.query(query, new Object[]{limit, offset}, (rs, rowNum) -> {
            Map<String, Object> result = new HashMap<>();
            result.put("productMainImage", rs.getString("productmainimage"));
            result.put("productName", rs.getString("productname"));
            result.put("productPrice", rs.getInt("productprice"));
            result.put("storeName", rs.getString("storename"));
            return result;
        });
    }

    @GetMapping("/category/{categorynum}/price-range")
    public List<Product> getProductsByCategoryAndPriceRange(
            @PathVariable Long categorynum,
            @RequestParam String minPrice,
            @RequestParam String maxPrice) {
        return productService.getProductsByCategoryAndPriceRange(categorynum, minPrice, maxPrice);
    }

}
