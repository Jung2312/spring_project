package com.spring.myHouse.productimage.controller;
import com.spring.myHouse.productimage.entity.ProductImage;
import com.spring.myHouse.productimage.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RestController
public class ProductImageController {

    private final ProductImageService productImageServie;

    @GetMapping("/productimage")
    public List<ProductImage> getProductImage(@RequestParam Long productnum, Model model){
        List<ProductImage> productImages = productImageServie.getAllProductImage(productnum);
        model.addAttribute("productImages", productImages);
        return productImages;
    }
}
