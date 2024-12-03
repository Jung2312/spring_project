package com.spring.myHouse.liked.repository;

import com.spring.myHouse.liked.entity.Liked;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Liked, Long> {
    List<Liked> findByUseridAndJoinnum(String userid, Long joinnum);

    // 좋아요 수 카운트 메서드
    int countByUserid(String userid);
}
