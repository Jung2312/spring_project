package com.spring.myHouse.reply.controller;

import com.spring.myHouse.reply.entity.Reply;
import com.spring.myHouse.reply.service.ReplyService;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소
@RequiredArgsConstructor
@RequestMapping("/reply")
public class ReplyController {
    private final ReplyService replyService; // final 키워드 추가
    private final UserService userService;

    @GetMapping("/all")
    public List<Map<String, Object>> getAllReplies() {
        List<Reply> replies = replyService.getAllReplies();
        return replies.stream().map(reply -> {
            Map<String, Object> replyWithPost = new HashMap<>();
            replyWithPost.put("replynum", reply.getReplynum());
            replyWithPost.put("userid", reply.getUserid());
            replyWithPost.put("replycontent", reply.getReplycontent());
            replyWithPost.put("postnum", reply.getPostnum());
            replyWithPost.put("replydate", reply.getReplydate());
            return replyWithPost;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{postnum}")
    public List<Map<String, Object>> getRepliesByPostNum(@PathVariable Long postnum) {
        List<Reply> replies = replyService.getRepliesByPostNum(postnum);
        return replies.stream().map(reply -> {
            Map<String, Object> replyWithPost = new HashMap<>();
            replyWithPost.put("replynum", reply.getReplynum());
            replyWithPost.put("userid", reply.getUserid());
            replyWithPost.put("replycontent", reply.getReplycontent());
            replyWithPost.put("postnum", reply.getPostnum());
            replyWithPost.put("replydate", reply.getReplydate());
            try {
                User user = userService.getUserByIds(reply.getUserid());
                replyWithPost.put("introduce", user.getIntroduce());
                replyWithPost.put("profileimage", user.getProfileimage()); // 프로필 사진 추가
            } catch (RuntimeException e) {
                replyWithPost.put("introduce", "소개 정보 없음");
                replyWithPost.put("profileimage", "기본 프로필 사진"); // 기본 이미지 경로 또는 텍스트 추가
            }
            return replyWithPost;
        }).collect(Collectors.toList());
    }

    @PostMapping("/create")
    public Reply createReply(@RequestBody Reply newReply) {
        if (newReply.getUserid() == null || newReply.getReplycontent() == null || newReply.getPostnum() == null) {
            throw new IllegalArgumentException("댓글 작성에 필요한 데이터가 누락되었습니다.");
        }
        return replyService.saveReply(newReply);
    }
}

