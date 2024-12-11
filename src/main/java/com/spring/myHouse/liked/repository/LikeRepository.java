package com.spring.myHouse.liked.repository;

import com.spring.myHouse.liked.entity.Liked;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Liked, Long> {
    List<Liked> findByUseridAndJoinnum(String userid, Long joinnum);

    // 좋아요 수 카운트 메서드
    int countByUserid(String userid);


    Optional<Liked> findByUseridAndPostnum(String userid, Long postnum);
    int countByPostnum(Long postnum);

    @Query("SELECT l.postnum FROM Liked l WHERE l.userid = :userid")
    List<Long> findLikedPostIdsByUserid(@Param("userid") String userid);
}
