package com.spring.myHouse.cart.controller;

import com.spring.myHouse.cart.entity.Cart;
import com.spring.myHouse.cart.service.CartService;
import com.spring.myHouse.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getCartWithProductInfo(@RequestParam String userid) {
        List<Object[]> result = cartService.getCartWithProductInfo(userid);

        // 데이터를 JSON으로 반환할 수 있도록 변환
        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : result) {
            Cart cart = (Cart) row[0];
            Product product = (Product) row[1];

            Map<String, Object> data = new HashMap<>();
            data.put("cartnum", cart.getCartnum());
            data.put("userid", cart.getUserid());
            data.put("productnum", cart.getProductnum());
            data.put("cartrepair", cart.getCartrepair()); // 수량
            data.put("productname", product.getProductname());
            data.put("productprice", product.getProductprice());
            data.put("productmainimage", product.getProductmainimage());

            response.add(data);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCartItem(@RequestParam String userid, @RequestParam Long productnum) {
        cartService.deleteCartItem(userid, productnum);
        return ResponseEntity.ok().build();
    }
}
