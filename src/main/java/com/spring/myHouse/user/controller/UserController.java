package com.spring.myHouse.user.controller;

import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    // 사용자 정보 조회 API
    @GetMapping("/info")
    public List<User> getUser(Model model) {
        String userid = "aaa";
        List<User> userList = userService.getUserById(userid);
        model.addAttribute("userList", userList);
        return userList;
    }

    // 사용자 정보 업데이트
    @PatchMapping("/update")
    public ResponseEntity<?> updateStoreInfo(@RequestBody User user) {
        if (user.getUserid() == null || user.getUserid().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid User ID");
        }
        try {
            User updatedUser = userService.updateUser(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        // 아이디 중복 확인
        if (userService.isUserIdExists(user.getUserid())) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }

        // 이메일 중복 확인
        if (userService.isEmailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }

        // 전화번호 중복 확인
        if (userService.isPhoneExists(user.getPhone())) {
            return ResponseEntity.badRequest().body("이미 존재하는 전화번호입니다.");
        }

        // 사용자 저장
        userService.saveUser(user);
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }
}