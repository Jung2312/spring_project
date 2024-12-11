package com.spring.myHouse.contest.repository;

import com.spring.myHouse.contest.entity.Contest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContestRepository extends CrudRepository<Contest, Long> {
    List<Contest> findByContestprogress(Long contest_progress);

    // 현재 진행 중인 콘테스트 조회
    Optional<Contest> findByConteststartdateLessThanEqualAndContestenddateAfter(LocalDate conteststartdate, LocalDate contestenddate);


}
