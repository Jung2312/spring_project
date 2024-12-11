package com.spring.myHouse.productimage.service;

import com.spring.myHouse.productimage.entity.ProductImage;
import com.spring.myHouse.productimage.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImageService{
    private final ProductImageRepository productImageRepository;

    public List<ProductImage> getAllProductImage(long productnum){
        return productImageRepository.findProductImageByProductnum(productnum);
    }

}
