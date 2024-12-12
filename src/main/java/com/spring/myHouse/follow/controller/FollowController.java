package com.spring.myHouse.follow.controller;

import com.spring.myHouse.follow.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/toggle")
    public Map<String, Object> toggleFollow(@RequestBody Map<String, String> followRequest) {
        String userId = followRequest.get("userid");
        String following = followRequest.get("following");

        boolean isFollowing = followService.toggleFollow(userId, following);

        // 응답을 Map 형태로 반환
        Map<String, Object> response = new HashMap<>();
        response.put("Following", isFollowing);

        return response;
    }

    @GetMapping("/status")
    public Map<String, Object> getFollowStatus(
            @RequestParam("userid") String userId,
            @RequestParam("target") String targetId) {
        boolean isFollowing = followService.isFollowing(userId, targetId);

        // Map으로 간단한 응답 생성
        Map<String, Object> response = new HashMap<>();
        response.put("following", isFollowing);

        return response;
    }
}
