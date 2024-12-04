package com.spring.myHouse.liked.controller;

import com.spring.myHouse.liked.service.LikedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
