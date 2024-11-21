package com.spring.myHouse.user.controller;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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

    // 로그인 API
    @PostMapping("/user/login")
    public ResponseEntity<String> Userlogin(@RequestBody Map<String, String> loginData, HttpSession session) {
        String userid = loginData.get("userid");
        String password = loginData.get("password");
        String userType = loginData.get("userType");
        System.out.println(userid);

        // 로그인 시도
        List<User> loginResult = userService.userlogin(userid, password);

        if (loginResult != null && !loginResult.isEmpty()) {
            User user = loginResult.get(0);
            session.setAttribute("userid", user.getUserid());  // 세션에 사용자 정보 저장
            return ResponseEntity.ok("로그인 성공" + (String)session.getAttribute("userid"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }

    @GetMapping("/user/session")
    public ResponseEntity<String> checkSession(HttpSession session) {
        String userid = (String) session.getAttribute("userid");

        if (userid != null) {
            return ResponseEntity.ok(userid);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("세션에 저장된 사용자 정보가 없습니다.");
        }
    }

}
