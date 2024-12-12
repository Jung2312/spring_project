package com.spring.myHouse.review.repository;

import com.spring.myHouse.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductnumOrderByReviewratingDesc(long productnum);

    boolean existsByUseridAndProductnum(String userid, long productnum);

    Review findAllByUseridAndProductnum(String userid, long productnum);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.productnum = :productnum")
    long countByProductNum(Long productnum);
}
