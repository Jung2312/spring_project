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
        return contestJoinRepository.findContestjoinByContestnum(1L);
    }

    public void incrementLike(Long joinnum) {
        contestJoinRepository.incrementLike(joinnum);
    }

    public void saveContestJoin(Contestjoin contestjoin) {
        contestJoinRepository.save(contestjoin);
    }
}
