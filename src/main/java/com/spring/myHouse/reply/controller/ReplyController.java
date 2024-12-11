package com.spring.myHouse.reply.controller;

import com.spring.myHouse.reply.entity.Reply;
import com.spring.myHouse.reply.service.ReplyService;
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
}

