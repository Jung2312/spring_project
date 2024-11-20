package com.spring.myHouse.user.controller;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    // 사용자 정보 조회 API
    @GetMapping("/user/info")
    public List<User> getUser(Model model) {
        String userid = "aaa";
        List<User> userList = userService.getUserById(userid);
        model.addAttribute("userList", userList);
        return userList;
    }

    @PostMapping("/user/signup")
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