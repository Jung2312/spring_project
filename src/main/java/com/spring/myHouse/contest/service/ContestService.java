package com.spring.myHouse.contest.service;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.repository.ContestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ContestService {
    private final ContestRepository contestRepository;

    public List<Contest> getContest() {
        return contestRepository.findByContestprogress(1L);
    }
}
