package com.spring.myHouse.review.controller;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.review.entity.Review;
import com.spring.myHouse.review.service.ReviewService;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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

    @PostMapping("save")
    public ResponseEntity<String> reviewSave(
            @RequestParam("userid") String userid,
            @RequestParam("productnum") long productnum,
            @RequestParam("reviewcontent") String reviewcontent,
            @RequestParam("reviewrating") long reviewrating,
            @RequestParam(value = "reviewimage", required = false) MultipartFile reviewimage){

        // 이미 작성된 리뷰가 있는지 확인
        boolean reviewExists = reviewService.existsByUseridAndProductnum(userid, productnum);
        if (reviewExists) {
            return ResponseEntity.status(400).body("이미 해당 상품에 리뷰를 작성하셨습니다.");
        }

        String fileName = null;
        if (reviewimage != null && !reviewimage.isEmpty()) {
            reviewimage.getOriginalFilename();
        }
        String uploadDir = "C:\\spring_project\\src\\main\\front\\public\\postImg\\";
        File uploadPath = new File(uploadDir);
        String newFileName = null;
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        if(fileName != null){
            String extension = fileName.substring(fileName.lastIndexOf("."), fileName.length());
            UUID uuid = UUID.randomUUID();

            newFileName = uuid.toString() + extension;
            String filePath = uploadDir + newFileName;

            try{ // 파일 저장
                reviewimage.transferTo(new File(filePath));
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("리뷰 저장 중 오류 발생");
            }

        }

        try {
            // Review 객체 생성 및 저장
            Review review = new Review();
            review.setUserid(userid);
            review.setProductnum(productnum);
            review.setReviewcontent(reviewcontent);
            review.setReviewrating(reviewrating);
            review.setReviewimage(newFileName); // 파일 이름 저장

            reviewService.saveReview(review);

            return ResponseEntity.ok("리뷰 저장 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("리뷰 저장 중 오류 발생");
        }
    }

    @GetMapping("/count")
    public long getReviewCount(@RequestParam Long productnum) {
        return reviewService.getReviewCountByProductNum(productnum);
    }
}
