package com.spring.myHouse.follow.controller;

import com.spring.myHouse.follow.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
@CrossOrigin(origins = "http://localhost:3000")
public class FollowController {

    @Autowired
    private FollowService followService;

    @GetMapping("/following/count")
    public int getFollowingCount(@RequestParam String userid) {
        return followService.getFollowingCount(userid);
    }

    @GetMapping("/followers/count")
    public int getFollowerCount(@RequestParam String userid) {
        return followService.getFollowerCount(userid);
    }

    @GetMapping("/following/list")
    public List<String> getFollowingList(@RequestParam String userid) {
        return followService.getFollowingList(userid);
    }

    @GetMapping("/followers/list")
    public List<String> getFollowerList(@RequestParam String userid) {
        return followService.getFollowerList(userid);
    }
}
