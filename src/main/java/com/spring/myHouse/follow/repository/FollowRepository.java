package com.spring.myHouse.follow.repository;

import com.spring.myHouse.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.userid = :userid")
    int countFollowing(String userid);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.following = :userid")
    int countFollowers(String userid);

    @Query("SELECT f.following FROM Follow f WHERE f.userid = :userid")
    List<String> findFollowingByUserid(String userid);

    @Query("SELECT f.userid FROM Follow f WHERE f.following = :userid")
    List<String> findFollowersByUserid(String userid);
}

