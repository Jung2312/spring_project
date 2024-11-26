package com.spring.myHouse.contest.controller;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.contest.service.ContestJoinService;
import com.spring.myHouse.contest.service.ContestService;
import com.spring.myHouse.liked.entity.Liked;
import com.spring.myHouse.liked.service.LikedService;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/contest")
public class ContestJoinController {
    private final ContestJoinService contestJoinService;
    private final ContestService contestService;
    private final UserService userService;
    private final LikedService likedService;

    @GetMapping("/info/join")
    public List<Map<String, Object>> getContestjoins() {
        List<Contestjoin> contestjoins = contestJoinService.getContestJoin();

        return contestjoins.stream().map(contestjoin -> {
            Map<String, Object> contestWithUser = new HashMap<>();
            contestWithUser.put("joinnum", contestjoin.getJoinnum());
            contestWithUser.put("userid", contestjoin.getUserid());
            contestWithUser.put("joinlike", contestjoin.getJoinlike());
            contestWithUser.put("joinimg", contestjoin.getJoinimg());
            contestWithUser.put("contestnum", contestjoin.getContestnum());

            try {
                User user = userService.getUserByIds(contestjoin.getUserid());
                contestWithUser.put("profileimage", user.getProfileimage()); // 프로필 사진 추가
                System.out.println(user.getProfileimage());
            } catch (RuntimeException e) {
                contestWithUser.put("profileimage", "기본 프로필 사진"); // 기본 이미지 경로 또는 텍스트 추가
            }
            return contestWithUser;
        }).collect(Collectors.toList());
    }
    
    // 완료된 콘테스트 조회
    @GetMapping("/join/end")
    public List<Map<String, Object>> getEndContestjoins() {
        // 진행 중 콘테스트 가져오기 (임의로 0번째 데이터)
        List<Contest> contestList = contestService.getContest();
        Contest contest = contestList.get(0);

        // 제외된 콘테스트 데이터 가져오기
        List<Contestjoin> contestjoins = contestJoinService.getEndContestJoins(contest.getContestnum());

        // 데이터를 가공하여 반환
        return contestjoins.stream().map(contestjoin -> {
            Map<String, Object> contestWithUser = new HashMap<>();
            contestWithUser.put("joinnum", contestjoin.getJoinnum());
            contestWithUser.put("userid", contestjoin.getUserid());
            contestWithUser.put("joinlike", contestjoin.getJoinlike());
            contestWithUser.put("joinimg", contestjoin.getJoinimg());
            contestWithUser.put("contestnum", contestjoin.getContestnum());

            User user = userService.getUserByIds(contestjoin.getUserid());
            contestWithUser.put("profileimage", user.getProfileimage()); // 프로필 사진 추가
            return contestWithUser;
        }).collect(Collectors.toList());
    }

    @GetMapping("/join")
    public Map<String, Object> getContestjoinDetail(@RequestParam Long joinnum) {
        Contestjoin contestjoin = contestJoinService.getContestJoinDetail(joinnum);
        Map<String, Object> contestWithUser = new HashMap<>();
        contestWithUser.put("joinnum", contestjoin.getJoinnum());
        contestWithUser.put("userid", contestjoin.getUserid());
        contestWithUser.put("joinlike", contestjoin.getJoinlike());
        contestWithUser.put("joinimg", contestjoin.getJoinimg());
        contestWithUser.put("contestnum", contestjoin.getContestnum());

        User user = userService.getUserByIds(contestjoin.getUserid());
        contestWithUser.put("profileimage", user.getProfileimage());
        System.out.println(user.getProfileimage());
        return contestWithUser;
    }

    @PostMapping("/like")
    public ResponseEntity<String> incrementLike(@RequestHeader("userid") String userid, @RequestHeader("joinnum") Long joinnum) {
        if (userid == null || joinnum == null) {
            return ResponseEntity.badRequest().body("파라미터를 올바르게 받아오지 못했습니다.");
        }
        Liked liked = likedService.getByUseridAndJoinnum(userid, joinnum);

        if (liked == null) {
            liked = new Liked();
            liked.setUserid(userid);
            liked.setJoinnum(joinnum);
            liked.setPostnum(0L);

            contestJoinService.incrementLike(joinnum);
            likedService.saveLiked(liked);

            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.badRequest().body("이미 추천한 참여작입니다.");
        }
    }


    @PostMapping("/post")
    public ResponseEntity<String> uploadFileAndSaveData(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userid") String userid,
            @RequestParam("contestnum") Long contestnum) {

        Contestjoin contestjoin = contestJoinService.getContestjoinByUseridAndContestnum(userid, contestnum);

        if(contestjoin != null) {
            return ResponseEntity.badRequest().body("이미 참여한 콘테스트입니다.");
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
            contestjoin = new Contestjoin();
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

    // 작성자가 본인 글 삭제
    @DeleteMapping("/delete/{joinnum}")
    public ResponseEntity<String> deleteContestJoin(@PathVariable Long joinnum) {
        System.out.println(joinnum);
        contestJoinService.delContestJoin(joinnum);
        return ResponseEntity.ok("success");
    }
}
