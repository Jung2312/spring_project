package com.spring.myHouse.contest.service;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.contest.repository.ContestJoinRepository;
import com.spring.myHouse.liked.entity.Liked;
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

    public Contestjoin getContestjoinByUseridAndContestnum(String userid, Long contestnum) {
        List<Contestjoin> contestjoinList = contestJoinRepository.findContestjoinByUseridAndContestnum(userid, contestnum);

        if (contestjoinList.isEmpty()) {
            return null;
        }

        return contestjoinList.get(0);
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

    public void delContestJoin(Long joinnum) {
        contestJoinRepository.deleteById(joinnum);
    }

    // 수정된 부분: List<Contestjoin> 반환
    public List<Contestjoin> getJoinImagesByUserid(String userid) {
        return contestJoinRepository.findContestjoinByUserid(userid);  // Contestjoin 객체 반환
    }


    public long getCountByUserId(String userid) {
        return contestJoinRepository.countByUserId(userid);
    }

}
