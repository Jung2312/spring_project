package com.spring.myHouse.community.service;

import com.spring.myHouse.community.entity.Recommend;
import com.spring.myHouse.community.repository.RecommendRepository;
import com.spring.myHouse.contest.entity.Contestjoin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RecommendService {
    private final RecommendRepository recommendRepository;

    public List<Recommend> getAllPosts() {
        List<Recommend> recommends = recommendRepository.findAll();
        return new ArrayList<>(recommends);
    }

    public void saveRecommend(Recommend recommend) {
        recommendRepository.save(recommend);
    }

    public int countPostsByUserid(String userid) {
        return recommendRepository.countPostsByUserid(userid);
    }

    // 수정된 부분: List<Recommend> 반환
    public List<Recommend> getRecommendByUserid(String userid) {
        return recommendRepository.findRecommendByUserid(userid);  // Recommend 객체 반환
    }

    public void incrementRecommendLike(Long postnum) {
        recommendRepository.incrementRecommendLike(postnum);
    }

    public void decrementRecommendLike(Long postnum) {
        recommendRepository.decrementRecommendLike(postnum);
    }

    // postnum을 기준으로 추천 글 찾기
    public Recommend getPostByPostnumber(Long postnum) {
        return recommendRepository.findById(postnum).orElse(null);
    }

    // postnum으로 게시글 조회
    public Recommend getPostByPostnum(Long postnum) {
        return recommendRepository.findByPostnum(postnum);  // 레포지토리에서 게시글을 가져옴
    }

    public void updateRecommend(Recommend recommend) {
        recommendRepository.save(recommend);
    }

    public void deletePost(Long postnum) {
        if (!recommendRepository.existsById(postnum)) {
            throw new IllegalArgumentException("Post with ID " + postnum + " does not exist.");
        }
        recommendRepository.deleteById(postnum);
    }
}