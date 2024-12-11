package com.spring.myHouse.user.controller;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.coupon.service.CouponService;
import com.spring.myHouse.couponhistory.service.CouponhistoryService;
import com.spring.myHouse.grade.service.GradeService;
import com.spring.myHouse.mileage.service.MileageService;
import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // allowCredentials = "true" : 세션용
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final CouponhistoryService couponhistoryService;
    private final MileageService mileageService;
    private final GradeService gradeService;

    // 사용자 정보 조회 API
    @GetMapping("/info")
    public ResponseEntity<User> getUserInfo(@RequestParam String userid) {
        User user = userService.getUserById(userid);  // userid로 사용자 정보 조회
        if (user != null) {
            return ResponseEntity.ok(user);  // 사용자 정보를 반환
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 사용자 없으면 404 반환
        }
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
    public ResponseEntity<String> createUser(@RequestBody Map<String, Object> userData) {
        // 요청 데이터에서 값 추출
        String userid = (String) userData.get("userid");
        String password = (String) userData.get("password");
        String name = (String) userData.get("name");
        String phone = (String) userData.get("phone");
        String email = (String) userData.get("email");
        String postcode = (String) userData.get("postcode");
        String address = (String) userData.get("address");
        String addressDetail = (String) userData.get("addressDetail");

        // 필수 값 확인
        if (userid == null || userid.isEmpty()) {
            return ResponseEntity.badRequest().body("아이디를 입력해주세요.");
        }
        if (password == null || password.isEmpty()) {
            return ResponseEntity.badRequest().body("비밀번호를 입력해주세요.");
        }
        if (name == null || name.isEmpty()) {
            return ResponseEntity.badRequest().body("이름을 입력해주세요.");
        }
        if (phone == null || phone.isEmpty()) {
            return ResponseEntity.badRequest().body("전화번호를 입력해주세요.");
        }
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("이메일을 입력해주세요.");
        }
        if (postcode == null || postcode.isEmpty() || addressDetail == null || addressDetail.isEmpty()) {
            return ResponseEntity.badRequest().body("주소를 입력해주세요.");
        }

        // 아이디, 이메일, 전화번호 중복 확인
        if (userService.isUserIdExists(userid)) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }
        if (userService.isEmailExists(email)) {
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }
        if (userService.isPhoneExists(phone)) {
            return ResponseEntity.badRequest().body("이미 존재하는 전화번호입니다.");
        }

        // address와 addressDetail 결합
        if (addressDetail != null && !addressDetail.trim().isEmpty()) {
            address += ", " + addressDetail;
        }

        // User 엔티티 생성 및 데이터 설정
        User user = new User();
        user.setUserid(userid);
        user.setPassword(password);
        user.setName(name);
        user.setPhone(phone);
        user.setEmail(email);
        user.setPostcode(postcode);
        user.setAddress(address);
        user.setAdmin(0L);
        user.setGradenum(1L);

        // 사용자 저장
        userService.saveUser(user);

        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }
    
    // 로그인 API
    @PostMapping("/userlogin")
    public ResponseEntity<String> Userlogin(@RequestBody Map<String, String> loginData, HttpSession session) {
        String userid = loginData.get("userid");
        String password = loginData.get("password");
        String userType = loginData.get("userType");
        System.out.println(userid);

        // 로그인 시도
        List<User> loginResult = userService.userlogin(userid, password);

        if (loginResult != null && !loginResult.isEmpty()) {
            User user = loginResult.get(0);

            // root 아이디일 경우 admin 값 확인
            if ("root".equals(userid) && user.getAdmin() == 1) {
                session.setAttribute("userid", userid); // 관리자 세션 저장
                session.setAttribute("userType", "admin"); // 관리자로 로그인 처리
                return ResponseEntity.ok("관리자로 로그인 성공");
            }

            // 일반 사용자나 판매자 처리
            if (userType.equals("user")) {
                session.setAttribute("userid", userid); // 사용자 세션 저장
                return ResponseEntity.ok("사용자 로그인 성공");
            } else if (userType.equals("store")) {
                session.setAttribute("storeid", userid); // 판매자 세션 저장
                return ResponseEntity.ok("판매자 로그인 성공");
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }

    @GetMapping("/myShopping")
    public Map<String, Object> getContestjoinDetail(@RequestParam String userid) {
        User user = userService.getUserByIds(userid);

        int couponCnt = couponhistoryService.getCountCouponHistory(userid);
        int balance = mileageService.getBalanceByUserid(userid);
        String grade = gradeService.getGradeByGradenum(user.getGradenum());

        Map<String, Object> myPageUserData = new HashMap<>();

        myPageUserData.put("count", couponCnt); // 쿠폰 개수
        myPageUserData.put("mileage", balance); // 마일리지
        myPageUserData.put("grade", grade); // 등급

        return myPageUserData;
    }
}