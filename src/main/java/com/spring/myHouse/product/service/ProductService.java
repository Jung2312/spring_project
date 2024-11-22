package com.spring.myHouse.product.service;

import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // 특정 카테고리 번호(categorynum)에 해당하는 상품 목록 반환
    public List<Product> getProductsByCategory(Integer categorynum) {
        return productRepository.findByCategoryCategorynum(categorynum);
    }
}