package com.spring.myHouse.community.service;

import com.spring.myHouse.community.entity.Recommend;
import com.spring.myHouse.community.repository.RecommendRepository;
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

    public List<String> getPostImagesByUserid(String userid) {
        return recommendRepository.findPostimgByUserid(userid);
    }

    // postnum을 기준으로 추천 글 찾기
    public Recommend getPostByPostnum(Long postnum) {
        return recommendRepository.findById(postnum).orElse(null);
    }
}