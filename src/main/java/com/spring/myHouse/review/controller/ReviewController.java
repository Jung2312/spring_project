package com.spring.myHouse.review.controller;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.review.entity.Review;
import com.spring.myHouse.review.service.ReviewService;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    @GetMapping
    public List<Map<String, Object>> getReviews(@RequestParam long productnum){
        List<Review> reviews = reviewService.getAllReview(productnum);

        return reviews.stream().map(review -> {
            Map<String, Object> reviewsWithUser = new HashMap<>();
            reviewsWithUser.put("reviewnum", review.getReviewnum());
            reviewsWithUser.put("userid", review.getUserid());
            reviewsWithUser.put("productnum", review.getProductnum());
            reviewsWithUser.put("reviewcontent", review.getReviewcontent());
            reviewsWithUser.put("reviewimage", review.getReviewimage());
            reviewsWithUser.put("reviewdate", review.getReviewdate());
            reviewsWithUser.put("reviewrating", review.getReviewrating());

            User user = userService.getUserByIds(review.getUserid());
            reviewsWithUser.put("profileimage", user.getProfileimage()); // 프로필 사진 추가
            reviewsWithUser.put("name", user.getName()); // 프로필 사진 추가

            return reviewsWithUser;
        }).collect(Collectors.toList());
    }

    @GetMapping("/statistics")
    public Map<String, Object> getReviewStatistics(@RequestParam long productnum) {
        // 해당 상품 번호의 모든 리뷰를 가져옴
        List<Review> reviews = reviewService.getAllReview(productnum);

        // 리뷰 개수
        int reviewCount = reviews.size();

        // 평균 rating 계산 (소수점 절삭)
        long totalRating = reviews.stream()
                .mapToLong(Review::getReviewrating)
                .sum();
        long averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

        // 결과를 Map으로 반환
        Map<String, Object> result = new HashMap<>();
        result.put("reviewcount", reviewCount);
        result.put("averagerating", averageRating);

        return result;
    }
}
