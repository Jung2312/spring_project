package com.spring.myHouse.contest.repository;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.entity.Contestjoin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestJoinRepository extends CrudRepository<Contestjoin, Long> {
    public List<Contestjoin> findByJoinnum(Long num);

    public boolean updateContestJoinLike(Long contestjoinnum);
}
