package com.spring.myHouse.contest.service;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.contest.repository.ContestJoinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ContestJoinService {
    private final ContestJoinRepository contestJoinRepository;

    public List<Contestjoin> getContestJoin() {
        return contestJoinRepository.findByJoinnum(1L);
    }

    public boolean updateContestJoinLike(Long contestjoinnum) {
        return contestJoinRepository.updateContestJoinLike(contestjoinnum);
    }
}
