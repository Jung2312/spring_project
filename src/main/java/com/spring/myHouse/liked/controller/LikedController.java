package com.spring.myHouse.liked.controller;

import com.spring.myHouse.liked.entity.Liked;
import com.spring.myHouse.liked.service.LikedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // allowCredentials = "true" : 세션용
@RequestMapping("/liked")
public class LikedController {

    private final LikedService likedService;

    @GetMapping("/count")
    public int getLikeCount(@RequestParam String userid) {
        return likedService.countLikesByUserid(userid);
    }

    // 좋아요 추가/취소
    @PostMapping("/end")
    public boolean endLike(@RequestParam String userid, @RequestParam Long postnum) {
        Liked existingLike = likedService.getByUseridAndJoinnum(userid, postnum);

        if (existingLike != null) {
            likedService.deleteLiked(existingLike); // 이미 존재하면 삭제
            return false; // 좋아요 취소
        } else {
            Liked newLike = new Liked();
            newLike.setUserid(userid);
            newLike.setPostnum(postnum);
            likedService.saveLiked(newLike); // 없으면 저장
            return true; // 좋아요 추가
        }
    }

    @GetMapping("/user")
    public List<Long> getLikedPosts(@RequestParam String userid) {
        return likedService.getLikedPostIdsByUserid(userid);
    }
}
