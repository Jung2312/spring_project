package com.spring.myHouse.store.controller;

import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.store.service.StoreService;
import com.spring.myHouse.user.entity.User;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // allowCredentials = "true" : 세션용
@RestController
@RequestMapping("/store")
public class StoreController {
    private final StoreService storeService;

    // 판매자 정보 조회
    @GetMapping("/info/{storeId}")
    public Store getStoreInfo(@PathVariable String storeid) {
        return storeService.getStoreById(storeid);
    }

    // 판매자 정보 업데이트
    @PutMapping("/info")
    public Store updateStoreInfo(@RequestBody Store updatedStore) {
        return storeService.updateStore(updatedStore);
    }

    @PostMapping("/storelogin")
    public ResponseEntity<String> Storelogin(@RequestBody Map<String, String> loginData, HttpSession session) {
        String storeid = loginData.get("userid");
        String storepwd = loginData.get("password");
        String userType = loginData.get("userType");

        // 로그인 시도
        List<Store> loginResult = storeService.storelogin(storeid, storepwd);

        if (loginResult != null && !loginResult.isEmpty()) {
            Store store = loginResult.get(0);
            if(store == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("존재하지 않는 판매자입니다.");
            } else {
                session.setAttribute("storeid", store.getStoreid());  // 세션에 사용자 정보 저장
                session.setAttribute("storename", store.getStorename());
                return ResponseEntity.ok("로그인 성공" + (String)session.getAttribute("storeid") + (String)session.getAttribute("storename"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }
}
