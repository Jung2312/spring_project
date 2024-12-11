package com.spring.myHouse.productdetails.controller;

import com.spring.myHouse.productdetails.entity.Productdetails;
import com.spring.myHouse.productdetails.repository.ProductdetailsRepository;
import com.spring.myHouse.productdetails.service.ProductdetailsService;
import com.spring.myHouse.productimage.entity.ProductImage;
import com.spring.myHouse.productimage.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RestController
public class ProductdetailsController {

    private final ProductdetailsService productdetailsService;

    @GetMapping("/productdetails")
    public List<Productdetails> getProductDetails(@RequestParam Long productnum, Model model){
        List<Productdetails> productImages = productdetailsService.getAllProductDetail(productnum);
        model.addAttribute("productdetails", productImages);
        return productImages;
    }
}
