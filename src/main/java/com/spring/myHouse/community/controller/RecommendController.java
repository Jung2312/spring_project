package com.spring.myHouse.community.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.myHouse.community.entity.Recommend;
import com.spring.myHouse.community.service.RecommendService;
import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/recommend")
public class RecommendController {
    private final RecommendService recommendService;
    private final UserService userService;

//        @GetMapping("/post")
//    public List<Recommend> getAllPosts() {
//        List<Recommend> recommends = recommendService.getAllPosts();
//        return recommends;
//    }
    @GetMapping("")
    public List<Map<String, Object>> getAllPosts() {
        List<Recommend> recommends = recommendService.getAllPosts();

        return recommends.stream().map(post -> {
            Map<String, Object> postWithUser = new HashMap<>();
            postWithUser.put("postnum", post.getPostnum());
            postWithUser.put("userid", post.getUserid());
            postWithUser.put("posttitle", post.getPosttitle());
            postWithUser.put("postcontent", post.getPostcontent());
            postWithUser.put("postdate", post.getPostdate());
            postWithUser.put("postview", post.getPostview());
            postWithUser.put("postlike", post.getPostlike());
            postWithUser.put("hashtaglist", post.getHashtaglist());
            postWithUser.put("paynum", post.getPaynum());
            postWithUser.put("postimg", post.getPostimg());
            try {
                User user = userService.getUserByIds(post.getUserid());
                postWithUser.put("introduce", user.getIntroduce());
                postWithUser.put("profileimage", user.getProfileimage()); // 프로필 사진 추가
            } catch (RuntimeException e) {
                postWithUser.put("introduce", "소개 정보 없음");
                postWithUser.put("profileimage", "기본 프로필 사진"); // 기본 이미지 경로 또는 텍스트 추가
            }
            return postWithUser;
        }).collect(Collectors.toList());
    }

    @PostMapping("/post")
    public ResponseEntity<String> uploadFileAndSaveData(
            @RequestPart("file") MultipartFile file,
            @RequestPart("postData") String postDataJson) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 비어있습니다.");
        }

        // JSON 문자열을 Map으로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> postData;
        try {
            postData = objectMapper.readValue(postDataJson, Map.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("JSON 데이터를 파싱할 수 없습니다.");
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
            String extension = fileName.substring(fileName.lastIndexOf("."));
            String newFileName = UUID.randomUUID() + extension;
            String filePath = uploadDir + newFileName;
            file.transferTo(new File(filePath));

            // DB에 저장할 recommend 객체 생성
            Recommend recommend = new Recommend();
            recommend.setUserid((String) postData.get("userid"));
            recommend.setHashtaglist((String) postData.get("hashtaglist"));
            recommend.setPostimg(newFileName);
            recommend.setPostlike(0L);
            recommend.setPaynum(Long.parseLong(postData.get("paynum").toString()));
            recommend.setPostcontent((String) postData.get("postcontent"));
            recommend.setPosttitle((String) postData.get("posttitle"));
            recommend.setPostview(0L);

            // DB 저장
            recommendService.saveRecommend(recommend);

            return ResponseEntity.ok("파일 업로드 및 데이터 저장 성공");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 업로드 중 오류 발생");
        }
    }

    @PostMapping("/like")
    public ResponseEntity<String> likePost(@RequestParam("postnum") Long postnum) {
        // 추천 글을 찾아서
        Recommend recommend = recommendService.getPostByPostnumber(postnum);
        if (recommend == null) {
            return ResponseEntity.status(404).body("게시글을 찾을 수 없습니다.");
        }

        // 좋아요 수 증가
        recommend.setPostlike(recommend.getPostlike() + 1);
        recommendService.saveRecommend(recommend); // DB에 저장

        return ResponseEntity.ok("좋아요가 증가했습니다.");
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getPostCountByUser(@RequestParam("userid") String userid) {
        int postCount = recommendService.countPostsByUserid(userid);
        return ResponseEntity.ok(postCount);
    }

    @GetMapping("/post/images")
    public ResponseEntity<List<String>> getPostImages(@RequestParam String userid) {
        List<String> joinImages = recommendService.getPostImagesByUserid(userid);
        return ResponseEntity.ok(joinImages);
    }

    @GetMapping("/{postnum}")
    public Map<String, Object> getPostDetail(@PathVariable("postnum") Long postnum) {
        // 해당 postnum에 해당하는 게시글을 조회
        Recommend post = recommendService.getPostByPostnum(postnum);

        if (post == null) {
            throw new RuntimeException("게시글을 찾을 수 없습니다.");
        }

        // 조회수 증가
        post.setPostview(post.getPostview() + 1);
        recommendService.updateRecommend(post);

        // 게시글 상세 정보를 Map에 담아서 반환
        Map<String, Object> postWithUser = new HashMap<>();
        postWithUser.put("postnum", post.getPostnum());
        postWithUser.put("userid", post.getUserid());
        postWithUser.put("posttitle", post.getPosttitle());
        postWithUser.put("postcontent", post.getPostcontent());
        postWithUser.put("postdate", post.getPostdate());
        postWithUser.put("postview", post.getPostview());
        postWithUser.put("postlike", post.getPostlike());
        postWithUser.put("hashtaglist", post.getHashtaglist());
        postWithUser.put("paynum", post.getPaynum());
        postWithUser.put("postimg", post.getPostimg());

        try {
            // 해당 게시글의 사용자 정보를 추가
            User user = userService.getUserByIds(post.getUserid());
            postWithUser.put("introduce", user.getIntroduce());
            postWithUser.put("profileimage", user.getProfileimage()); // 프로필 이미지 추가
        } catch (RuntimeException e) {
            postWithUser.put("introduce", "소개 정보 없음");
            postWithUser.put("profileimage", "기본 프로필 이미지"); // 기본 이미지 경로 또는 텍스트 추가
        }

        return postWithUser;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePost(@RequestBody Map<String, Long> request) {
        Long postnum = request.get("postnum");
        if (postnum == null) {
            return ResponseEntity.badRequest().body("Invalid request: postnum is required.");
        }

        try {
            recommendService.deletePost(postnum);
            return ResponseEntity.ok("Post deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete post: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updatePost(
            @RequestParam("postnum") Long postnum,
            @RequestParam("posttitle") String posttitle,
            @RequestParam("postcontent") String postcontent,
            @RequestParam("hashtags") String hashtags,
            @RequestParam(value = "postimg", required = false) MultipartFile postimg) {

        // 기존 게시글 조회
        Recommend post = recommendService.getPostByPostnum(postnum);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
        }

        // 이미지 업로드 및 파일 경로 설정 (새 이미지가 있는 경우에만 처리)
        if (postimg != null && !postimg.isEmpty()) {
            String uploadDir = "C:\\spring_project\\src\\main\\front\\public\\postImg\\";
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }

            try {
                String fileName = postimg.getOriginalFilename();
                String extension = fileName.substring(fileName.lastIndexOf("."));
                String newFileName = UUID.randomUUID() + extension;
                String filePath = uploadDir + newFileName;
                postimg.transferTo(new File(filePath));
                post.setPostimg(newFileName); // 새 이미지 파일 경로로 업데이트
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("파일 업로드 중 오류 발생");
            }
        }

        // 게시글 수정
        post.setPosttitle(posttitle);
        post.setPostcontent(postcontent);
        post.setHashtaglist(hashtags);

        // 수정된 게시글 정보 DB에 저장
        recommendService.updateRecommend(post);

        return ResponseEntity.ok("게시글 수정 성공");
    }



}
