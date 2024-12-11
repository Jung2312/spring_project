package com.spring.myHouse.contest.service;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.repository.ContestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ContestService {
    private final ContestRepository contestRepository;

    public List<Contest> getContest() {
        return contestRepository.findByContestprogress(1L);
    }

    // 콘테스트 저장
    public void saveContest(Contest contest) {
        if (contest.getContestprogress() == null) {
            contest.setContestprogress(1L); // 기본값 설정 (예: 진행 상태)
        }
        contestRepository.save(contest); // Repository를 통해 DB에 저장
    }

    // ContestService.java
    public void updateContest(Long contestNum, String contestTitle, String contestStartDate, String contestEndDate, Long couponNum) {
        Contest contest = contestRepository.findById(contestNum)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 콘테스트를 찾을 수 없습니다."));

        // 필드 업데이트
        contest.setContesttitle(contestTitle);
        contest.setConteststartdate(LocalDate.parse(contestStartDate));
        contest.setContestenddate(LocalDate.parse(contestEndDate));
        contest.setCouponnum(couponNum);

        // 저장
        contestRepository.save(contest);
    }
}
