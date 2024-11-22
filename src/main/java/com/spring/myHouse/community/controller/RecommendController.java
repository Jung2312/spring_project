package com.spring.myHouse.community.controller;

import com.spring.myHouse.community.entity.Recommend;
import com.spring.myHouse.community.service.RecommendService;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/recommend")
public class RecommendController {
    private final RecommendService recommendService;
    private final UserService userService;

//        @GetMapping("/post")
//    public List<Recommend> getAllPosts() {
//        List<Recommend> recommends = recommendService.getAllPosts();
//        return recommends;
//    }
    @GetMapping("")
    public List<Map<String, Object>> getAllPosts() {
        List<Recommend> recommends = recommendService.getAllPosts();

        return recommends.stream().map(post -> {
            Map<String, Object> postWithUser = new HashMap<>();
            postWithUser.put("postnum", post.getPostnum());
            postWithUser.put("userid", post.getUserid());
            postWithUser.put("posttitle", post.getPosttitle());
            postWithUser.put("postcontent", post.getPostcontent());
            postWithUser.put("postdate", post.getPostdate());
            postWithUser.put("postview", post.getPostview());
            postWithUser.put("postlike", post.getPostlike());
            postWithUser.put("hashtaglist", post.getHashtaglist());
            postWithUser.put("paynum", post.getPaynum());
            postWithUser.put("postimg", post.getPostimg());
            try {
                User user = userService.getUserByIds(post.getUserid());
                postWithUser.put("introduce", user.getIntroduce());
                postWithUser.put("profileimage", user.getProfileimage()); // 프로필 사진 추가
            } catch (RuntimeException e) {
                postWithUser.put("introduce", "소개 정보 없음");
                postWithUser.put("profileimage", "기본 프로필 사진"); // 기본 이미지 경로 또는 텍스트 추가
            }
            return postWithUser;
        }).collect(Collectors.toList());
    }

}
