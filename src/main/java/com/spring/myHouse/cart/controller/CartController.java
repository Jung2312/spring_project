package com.spring.myHouse.cart.controller;

import com.spring.myHouse.cart.entity.Cart;
import com.spring.myHouse.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    @PostMapping("/addOrUpdate")
    public ResponseEntity<Cart> addOrUpdateCart(
            @RequestParam String userid,
            @RequestParam long productnum,
            @RequestParam long cartrepair) {
        Cart updatedCart = cartService.addOrUpdateCart(userid, productnum, cartrepair);
        return ResponseEntity.ok(updatedCart);
    }
}
