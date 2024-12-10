package com.spring.myHouse.contest.controller;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.repository.ContestRepository;
import com.spring.myHouse.contest.service.ContestService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/contest")
public class ContestController {
    private final ContestService contestService;
    private final ContestRepository contestRepository;

    @GetMapping("/info")
    public List<Contest> contestInfo(Model model) {
        List<Contest> contestList = contestService.getContest();
        model.addAttribute("contestList", contestList);
        return contestList;
    }

    // 콘테스트 등록 (이미지 포함)
    @PostMapping("/register")
    public String registerContest(
            @RequestParam("contesttitle") String contestTitle,
            @RequestParam("conteststartdate") String contestStartDate,
            @RequestParam("contestenddate") String contestEndDate,
            @RequestParam("couponnum") Long couponNum,
            @RequestParam(value = "contestimg", required = false) MultipartFile contestImg
    ) {
        try {
            String savedFilePath = null;

            // 이미지 파일 저장
            if (contestImg != null && !contestImg.isEmpty()) {
                // 파일 저장 경로 설정
                String baseDir = "C:/spring_project/src/main/front/public/uploads"; // 원하는 경로로 설정
                File directory = new File(baseDir);
                if (!directory.exists()) {
                    directory.mkdirs(); // 디렉토리가 없으면 생성
                }

                // 저장 파일 이름 생성
                String fileName = UUID.randomUUID() + "_" + contestImg.getOriginalFilename();
                File file = new File(directory, fileName);

                // 파일 저장
                contestImg.transferTo(file);

                // 저장된 파일 경로 설정
                savedFilePath = "/uploads/" + fileName; // 클라이언트에서 접근 가능한 상대 경로
            }

            // Contest 객체 생성
            Contest contest = new Contest();
            contest.setContesttitle(contestTitle);
            contest.setConteststartdate(LocalDate.parse(contestStartDate));
            contest.setContestenddate(LocalDate.parse(contestEndDate));
            contest.setCouponnum(couponNum);
            contest.setContestimg(savedFilePath);
            contest.setContestprogress(1L);

            contestService.saveContest(contest);

            return "콘테스트가 성공적으로 등록되었습니다.";
        } catch (Exception e) {
            e.printStackTrace();
            return "콘테스트 등록 실패: " + e.getMessage();
        }
    }

    @GetMapping("/register")
    public String handleGetRequest() {
        return "잘못된 요청입니다. 이 API는 POST 요청만 지원합니다.";
    }

    @GetMapping("/{contestnum}")
    public Contest getContestById(@PathVariable("contestnum") Long contestNum) {
        return contestRepository.findById(contestNum)
                .orElseThrow(() -> new IllegalArgumentException("해당 번호의 콘테스트를 찾을 수 없습니다."));
    }


    // ContestController.java
    @PutMapping("/update/{contestnum}")
    public String updateContest(
            @PathVariable("contestnum") Long contestNum,
            @RequestParam("contesttitle") String contestTitle,
            @RequestParam("conteststartdate") String contestStartDate,
            @RequestParam("contestenddate") String contestEndDate,
            @RequestParam("couponnum") Long couponNum,
            @RequestParam(value = "contestimg", required = false) MultipartFile contestImg
    ) {
        try {
            String savedFilePath = null;

            // 이미지 파일이 첨부되었으면 처리
            if (contestImg != null && !contestImg.isEmpty()) {
                // 파일 저장 경로 설정
                String baseDir = "C:/spring_project/src/main/front/public/uploads";
                File directory = new File(baseDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                // 저장 파일 이름 생성
                String fileName = UUID.randomUUID() + "_" + contestImg.getOriginalFilename();
                File file = new File(directory, fileName);

                // 파일 저장
                contestImg.transferTo(file);

                // 저장된 파일 경로 설정
                savedFilePath = "/uploads/" + fileName;
            }

            // 서비스 호출
            contestService.updateContest(contestNum, contestTitle, contestStartDate, contestEndDate, couponNum, savedFilePath);

            return "콘테스트가 성공적으로 수정되었습니다.";
        } catch (Exception e) {
            e.printStackTrace();
            return "콘테스트 수정 실패: " + e.getMessage();
        }
    }

}
