package com.spring.myHouse.contest.repository;

import com.spring.myHouse.contest.entity.Contest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestRepository extends CrudRepository<Contest, Long> {
    List<Contest> findByContestprogress(Long contest_progress);
}
