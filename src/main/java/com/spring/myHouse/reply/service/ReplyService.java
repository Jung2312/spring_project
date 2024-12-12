package com.spring.myHouse.reply.service;

import com.spring.myHouse.reply.entity.Reply;
import com.spring.myHouse.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReplyService {
    private final ReplyRepository replyRepository;

    public List<Reply> getAllReplies() {
        List<Reply> replies = replyRepository.findAll();
        System.out.println("서비스에서 가져온 댓글 데이터: " + replies); // 디버깅 로그
        return new ArrayList<>(replies);
    }

    public List<Reply> getRepliesByPostNum(Long postNum) {
        return replyRepository.findReplyByPostNum(postNum);
    }

    public Reply saveReply(Reply newReply) {
        return replyRepository.save(newReply);
    }
}
