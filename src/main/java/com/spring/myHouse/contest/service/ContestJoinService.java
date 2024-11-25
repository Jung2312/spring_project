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

    public List<Contestjoin> getEndContestJoins(Long contestnum) {
        return contestJoinRepository.findContestjoinByContestnumNot(contestnum);
    }

    public Contestjoin getContestJoinDetail(Long joinnum) {
        return contestJoinRepository.findContestjoinByJoinnum(joinnum);
    }

    public void incrementLike(Long joinnum) {
        contestJoinRepository.incrementLike(joinnum);
    }

    public void saveContestJoin(Contestjoin contestjoin) {
        contestJoinRepository.save(contestjoin);
    }
}
