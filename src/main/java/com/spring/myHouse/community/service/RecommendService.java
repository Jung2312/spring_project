package com.spring.myHouse.community.service;

import com.spring.myHouse.community.entity.Recommend;
import com.spring.myHouse.community.repository.RecommendRepository;
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
}