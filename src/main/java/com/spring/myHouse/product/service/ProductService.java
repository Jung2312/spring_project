package com.spring.myHouse.product.service;

import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.repository.ProductRepository;
import com.spring.myHouse.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // 특정 카테고리 번호(categorynum)에 해당하는 상품 목록 반환
    public List<Product> getProductsByCategory(Long categorynum) {
        return productRepository.findByCategoryCategorynum(categorynum);
    }

    // 특정 판매자 번호(storenum)에 해당하는 상품 목록 반환
    public List<Product> getProductsByStore(Long storenum) {
        return productRepository.findProductByStorenum(storenum);
    }

    // 판매자 번호에 해당하는 상품 개수 반환
    public Long getProductCountByStore(Long storenum) {
        return productRepository.countByStorenum(storenum);
    }


    public Product getProductByProductnum(Long productnum){
        return productRepository.findByProductnum(productnum);
    }

    // 특정 카테고리와 상점 번호에 해당하는 상품 목록 반환
    public List<Product> getProductsByCategoryAndStore(Long categorynum, Long storenum) {
        return productRepository.findByCategoryCategorynumAndStorenum(categorynum, storenum);
    }

    public List<Product> getProductsByCategoryAndPriceRange(Long categorynum, String minPrice, String maxPrice) {
        return productRepository.findByCategoryAndPriceRange(categorynum, minPrice, maxPrice);

    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByProductnameContainingIgnoreCase(query);
    }

    // 처음 20개의 제품만 반환하는 메서드
    public List<Product> getTop20Products() {
        Pageable pageable = PageRequest.of(0, 20);  // 0번째 페이지에서 20개 데이터만 요청
        return productRepository.findTop20Products(pageable);
    }
}