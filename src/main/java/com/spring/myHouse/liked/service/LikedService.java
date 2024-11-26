package com.spring.myHouse.liked.service;

import com.spring.myHouse.liked.entity.Liked;
import com.spring.myHouse.liked.repository.LikeRepository;
import com.spring.myHouse.user.entity.User;
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

}
