package com.spring.myHouse.product.repository;

import com.spring.myHouse.product.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    // 특정 카테고리 번호(categorynum)에 해당하는 상품 목록 조회
    List<Product> findByCategoryCategorynum(Long categorynum);

    List<Product> findProductByStorenum(Long storenum);

    Long countByStorenum(Long storenum);

    Product findByProductnum(Long productnum);

    // 특정 카테고리 번호와 상점 번호에 해당하는 상품 목록 조회
    List<Product> findByCategoryCategorynumAndStorenum(Long categorynum, Long storenum);

    @Query("SELECT p FROM Product p WHERE p.category.categorynum = :categorynum AND p.productprice BETWEEN :minPrice AND :maxPrice")
    List<Product> findByCategoryAndPriceRange(@Param("categorynum") Long categorynum, @Param("minPrice") String minPrice, @Param("maxPrice") String maxPrice);

    List<Product> findByProductnameContainingIgnoreCase(String productname);

    // 처음 20개 제품만 반환하는 쿼리
    @Query("SELECT p FROM Product p ORDER BY p.productnum ASC")
    List<Product> findTop20Products(Pageable pageable); // Pageable을 인자로 받음
}