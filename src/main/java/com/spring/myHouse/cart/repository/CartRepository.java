package com.spring.myHouse.cart.repository;

import com.spring.myHouse.cart.entity.Cart;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUseridAndProductnum(String userid, long productnum);
}
