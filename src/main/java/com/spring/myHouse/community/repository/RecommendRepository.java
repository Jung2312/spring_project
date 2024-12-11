package com.spring.myHouse.community.repository;

import com.spring.myHouse.community.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    @Query("SELECT COUNT(r) FROM Recommend r WHERE r.userid = :userid")
    int countPostsByUserid(@Param("userid") String userid);

    @Query("SELECT r.postimg FROM Recommend r WHERE r.userid = :userid")
    List<String> findPostimgByUserid(@Param("userid") String userid);

    // postnum을 기준으로 추천 글 찾기
    Optional<Recommend> findById(Long postnum);
  
    Recommend findByPostnum(Long postnum);

}
