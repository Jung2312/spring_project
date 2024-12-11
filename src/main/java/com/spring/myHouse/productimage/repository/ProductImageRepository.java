package com.spring.myHouse.productimage.repository;

import com.spring.myHouse.productdetails.entity.Productdetails;
import com.spring.myHouse.productimage.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findProductImageByProductnum(long productnum);
}
