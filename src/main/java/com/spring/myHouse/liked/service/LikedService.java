package com.spring.myHouse.liked.service;

import com.spring.myHouse.liked.entity.Liked;
import com.spring.myHouse.liked.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LikedService {
    private final LikeRepository likeRepository;

    public Liked getByUseridAndJoinnum(String userid, Long joinnum) {
        List<Liked> likedList = likeRepository.findByUseridAndJoinnum(userid, joinnum);

        if (likedList.isEmpty()) {
            return null;
        }

        return likedList.get(0);
    }
    public void saveLiked(Liked liked){
        likeRepository.save(liked);
    }

    // 새로운 메서드: 좋아요 수 카운트
    public int countLikesByUserid(String userid) {
        return likeRepository.countByUserid(userid);
    }

    public Liked getByUseridAndPostnum(String userid, Long postnum) {
        return likeRepository.findByUseridAndPostnum(userid, postnum).orElse(null);
    }

    public void deleteLiked(Liked liked) {
        likeRepository.delete(liked);
    }

    // 좋아요 수 카운트
    public int countLikesByPostnum(Long postnum) {
        return likeRepository.countByPostnum(postnum);
    }

    public List<Long> getLikedPostIdsByUserid(String userid) {
        return likeRepository.findLikedPostIdsByUserid(userid);
    }
}
