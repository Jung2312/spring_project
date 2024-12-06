package com.spring.myHouse.product.repository;

import com.spring.myHouse.product.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    // 특정 카테고리 번호(categorynum)에 해당하는 상품 목록 조회
    List<Product> findByCategoryCategorynum(Long categorynum);

    List<Product> findProductByStorenum(Long storenum);

    Long countByStorenum(Long storenum);

    Product findByProductnum(Long productnum);
}
