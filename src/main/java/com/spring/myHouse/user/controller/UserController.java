package com.spring.myHouse.user.controller;

import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
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

    // 사용자 정보 저장 및 업데이트 API
    @PutMapping("/user/info")
    public User updateUser(@RequestBody User user) {
        System.out.println("받은 데이터 : " + user); // 로그
        return userService.saveUpdateUser(user);
    }
}