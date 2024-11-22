package com.spring.myHouse.product.repository;

import com.spring.myHouse.product.entity.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepository extends CrudRepository<Product, Integer> {

    // 특정 카테고리 번호(categorynum)에 해당하는 상품 목록 조회
    List<Product> findByCategoryCategorynum(Integer categorynum);
}
