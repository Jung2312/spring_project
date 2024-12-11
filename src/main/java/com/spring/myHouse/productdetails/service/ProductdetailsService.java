package com.spring.myHouse.productdetails.service;

import com.spring.myHouse.productdetails.entity.Productdetails;
import com.spring.myHouse.productdetails.repository.ProductdetailsRepository;
import com.spring.myHouse.productimage.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductdetailsService {
    private final ProductdetailsRepository productdetailsRepository;

    public List<Productdetails> getAllProductDetail(long productnum){
        return productdetailsRepository.findByProductnum(productnum);
    }
}
