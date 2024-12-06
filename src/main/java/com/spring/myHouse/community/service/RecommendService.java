package com.spring.myHouse.community.service;

import com.spring.myHouse.community.entity.Recommend;
import com.spring.myHouse.community.repository.RecommendRepository;
import com.spring.myHouse.contest.entity.Contestjoin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

}