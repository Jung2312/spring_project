package com.spring.myHouse.follow.service;

import com.spring.myHouse.follow.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    public int getFollowingCount(String userid) {
        return followRepository.countFollowing(userid);
    }

    public int getFollowerCount(String userid) {
        return followRepository.countFollowers(userid);
    }

    public List<String> getFollowingList(String userid) {
        return followRepository.findFollowingByUserid(userid);
    }

    public List<String> getFollowerList(String userid) {
        return followRepository.findFollowersByUserid(userid);
    }
}

