package com.spring.myHouse.cart.service;

import com.spring.myHouse.cart.entity.Cart;
import com.spring.myHouse.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public Cart addOrUpdateCart(String userid, long productnum, long cartrepair) {
        // 해당 데이터가 존재하는지 체크
        return cartRepository.findByUseridAndProductnum(userid, productnum)
                .map(existingCart -> {
                    // 존재한다면 업데이트
                    existingCart.setCartrepair(existingCart.getCartrepair() + cartrepair);
                    return cartRepository.save(existingCart);
                })
                .orElseGet(() -> {
                    // 존재하지 않는다며 insert
                    Cart newCart = new Cart();
                    newCart.setUserid(userid);
                    newCart.setProductnum(productnum);
                    newCart.setCartrepair(cartrepair);
                    return cartRepository.save(newCart);
                });
    }
}
