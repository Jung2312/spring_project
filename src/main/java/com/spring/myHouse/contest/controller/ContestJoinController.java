package com.spring.myHouse.contest.controller;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.contest.service.ContestJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ContestJoinController {
    private final ContestJoinService contestJoinService;

    @GetMapping("/contest/info/join")
    public List<Contestjoin> getContestjoins(Model model) {
        List<Contestjoin> contestjoins = contestJoinService.getContestJoin();
        model.addAttribute("contestjoins", contestjoins);
        return contestjoins;
    }

    @PostMapping("/contest/like/{joinnum}")
    public ResponseEntity<String> incrementLike(@PathVariable Long joinnum) {
        contestJoinService.incrementLike(joinnum);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/contest/post")
    public ResponseEntity<String> uploadFileAndSaveData(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userid") String userid,
            @RequestParam("contestnum") Long contestnum) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 비어있습니다.");
        }

        // 파일 저장 경로 설정
        String uploadDir = "C:\\spring_project\\src\\main\\front\\public\\postImg\\";
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        try {
            // 파일 저장
            String fileName = file.getOriginalFilename();
            String extension = fileName.substring(fileName.lastIndexOf("."), fileName.length());

            UUID uuid = UUID.randomUUID();
            String newFileName = uuid.toString() + extension;


            String filePath = uploadDir + newFileName;
            file.transferTo(new File(filePath));

            // DB에 저장할 Contestjoin 객체 생성
            Contestjoin contestjoin = new Contestjoin();
            contestjoin.setUserid(userid);
            contestjoin.setContestnum(contestnum);
            contestjoin.setJoinimg(newFileName); // 저장된 파일 이름 저장
            contestjoin.setJoinlike(0L); // 기본 좋아요 수 0


            // DB 저장
            contestJoinService.saveContestJoin(contestjoin);

            return ResponseEntity.ok("파일 업로드 및 데이터 저장 성공");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 업로드 중 오류 발생");
        }
    }
}
