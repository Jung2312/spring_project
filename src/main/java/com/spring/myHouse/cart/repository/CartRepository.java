package com.spring.myHouse.cart.repository;

import com.spring.myHouse.cart.entity.Cart;
import com.spring.myHouse.reply.entity.Reply;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUseridAndProductnum(String userid, long productnum);

    @Query("SELECT c, p FROM Cart c JOIN Product p ON c.productnum = p.productnum WHERE c.userid = :userid")
    List<Object[]> findCartWithProductInfoByUserId(@Param("userid") String userid);

    @Modifying
    @Transactional
    @Query("DELETE FROM Cart c WHERE c.userid = :userid AND c.productnum = :productnum")
    void deleteByUseridAndProductnum(@Param("userid") String userid, @Param("productnum") Long productnum);
}
