package com.spring.myHouse.user.controller;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    private final UserService userService;

    // 사용자 정보 조회 API
    @GetMapping("/user/info")
    public List<User> getUser(Model model) {
        List<User> userList = userService.getUserById();
        model.addAttribute("userList", userList);
        return userList;
    }
}
