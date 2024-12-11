package com.spring.myHouse.review.service;

import com.spring.myHouse.review.entity.Review;
import com.spring.myHouse.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public List<Review> getAllReview(long productnum){
        return reviewRepository.findByProductnum(productnum);
    }
}
