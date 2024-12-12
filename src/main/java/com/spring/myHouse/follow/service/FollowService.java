package com.spring.myHouse.follow.service;

import com.spring.myHouse.follow.entity.Follow;
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

    public boolean toggleFollow(String userid, String following) {
        // 팔로우 관계가 이미 존재하는지 확인
        Follow existingFollow = followRepository.findByUseridAndFollowing(userid, following);

        if (existingFollow != null) {
            // 이미 팔로우 중이라면 취소 (삭제)
            followRepository.delete(existingFollow);
            return false; // 팔로우 취소됨
        } else {
            // 팔로우 중이 아니면 추가
            Follow newFollow = new Follow();
            newFollow.setUserid(userid);
            newFollow.setFollowing(following);
            followRepository.save(newFollow);
            return true; // 팔로우 추가됨
        }
    }

    // 팔로우 상태 확인
    public boolean isFollowing(String userId, String targetId) {
        // 팔로우 관계가 존재하는지 확인
        return followRepository.existsByUseridAndFollowing(userId, targetId);
    }
}

