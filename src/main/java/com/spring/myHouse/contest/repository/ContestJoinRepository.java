package com.spring.myHouse.contest.repository;

import com.spring.myHouse.contest.entity.Contestjoin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ContestJoinRepository extends JpaRepository<Contestjoin, Long> {

    public List<Contestjoin> findContestjoinByContestnum(Long contestnum);

    @Modifying
    @Transactional
    @Query("UPDATE Contestjoin c SET c.joinlike = c.joinlike + 1 WHERE c.joinnum = :joinnum")
    void incrementLike(Long joinnum);

    public Contestjoin findContestjoinByJoinnum(Long joinnum);

    @Query("SELECT cj FROM Contestjoin cj WHERE cj.contestnum <> :contestnum AND cj.joinlike = (" +
            "  SELECT MAX(subCj.joinlike) FROM Contestjoin subCj WHERE subCj.contestnum = cj.contestnum)")
    List<Contestjoin> findContestjoinByContestnumNot(@Param("contestnum") Long contestnum);


    List<Contestjoin>  findContestjoinByUseridAndContestnum(String userid, Long contestnum);

    // 수정된 부분: Contestjoin 객체를 반환
    @Query("SELECT c FROM Contestjoin c WHERE c.userid = :userid")
    List<Contestjoin> findContestjoinByUserid(@Param("userid") String userid);

    @Query("SELECT COUNT(c) FROM Contestjoin c WHERE c.userid = :userid")
    long countByUserId(@Param("userid") String userid);
}