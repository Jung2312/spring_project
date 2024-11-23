package com.spring.myHouse.store.controller;

import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.store.service.StoreService;
import com.spring.myHouse.user.entity.User;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RestController
@RequestMapping("/store")
public class StoreController {
    private final StoreService storeService;

    // 판매자 정보 조회
    /*@GetMapping("/info/{storeId}")
    public Store getStoreInfo(@PathVariable String storeid) {
        return storeService.getStoreById(storeid);
    }*/

    // 사용자 정보 조회 API
    @GetMapping("/info")
    public ResponseEntity<Store> getUserInfo(@RequestParam String userid) {
        Store store = storeService.getStoreById(userid);  // userid로 사용자 정보 조회
        System.out.println("상점::::::::::::::::::::::::::::::::::::::::::::::::::"+store);
        if (store != null) {
            return ResponseEntity.ok(store);  // 사용자 정보를 반환
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 사용자 없으면 404 반환
        }
    }

    // 판매자 정보 업데이트
    @PutMapping("/info")
    public Store updateStoreInfo(@RequestBody Store updatedStore) {
        return storeService.updateStore(updatedStore);
    }

    // 상점 검색
    @GetMapping("/search")
    public List<Store> searchStores(@RequestParam("query") String query, Model model) {
        List<Store> stores = storeService.searchStoresByName(query);
        model.addAttribute("stores", stores);
        return stores;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> updateStoreByStoreName(@RequestParam("storename") String storename, @RequestBody Map<String, Object> storeData) {
        // 요청 데이터에서 값 추출
        String storeid = (String) storeData.get("storeid");
        String storepwd = (String) storeData.get("storepwd");
        String storephone = (String) storeData.get("storephone");
        String storeemail = (String) storeData.get("storeemail");
        String storepostcode = (String) storeData.get("storepostcode");
        String storeaddress = (String) storeData.get("storeaddress");
        String storeaddressDetail = (String) storeData.get("addressDetail");

        // 필수 값 확인
        if (storeid == null || storeid.isEmpty()) {
            return ResponseEntity.badRequest().body("아이디를 입력해주세요.");
        }
        if (storepwd == null || storepwd.isEmpty()) {
            return ResponseEntity.badRequest().body("비밀번호를 입력해주세요.");
        }
        if (storename == null || storename.isEmpty()) {
            return ResponseEntity.badRequest().body("상점 이름을 선택해주세요.");
        }
        if (storephone == null || storephone.isEmpty()) {
            return ResponseEntity.badRequest().body("전화번호를 입력해주세요.");
        }
        if (storeemail == null || storeemail.isEmpty()) {
            return ResponseEntity.badRequest().body("이메일을 입력해주세요.");
        }
        if (storepostcode == null || storepostcode.isEmpty() || storeaddressDetail == null || storeaddressDetail.isEmpty()) {
            return ResponseEntity.badRequest().body("주소를 입력해주세요.");
        }

        // 아이디 중복 확인
        if (storeService.isUserIdExists(storeid)) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }
        // 이메일 중복 확인
        if (storeService.isEmailExists(storeemail)) {
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }
        // 전화번호 중복 확인
        if (storeService.isPhoneExists(storephone)) {
            return ResponseEntity.badRequest().body("이미 존재하는 전화번호입니다.");
        }

        // address와 addressDetail 결합
        String fullAddress = storeaddress; // 결합된 주소
        if (storeaddressDetail != null && !storeaddressDetail.trim().isEmpty()) {
            fullAddress += ", " + storeaddressDetail;
        }

        try {
            // Store 객체 생성 및 값 설정
            Store store = new Store();
            store.setStoreid(storeid);
            store.setStorepwd(storepwd);
            store.setStorephone(storephone);
            store.setStoreemail(storeemail);
            store.setStorepostcode(storepostcode);
            store.setStoreaddress(fullAddress); // 결합된 주소 사용

            // storename으로 데이터를 업데이트
            Store updatedStore = storeService.updateStoreByStoreName(storename, store);

            return ResponseEntity.ok("회원가입이 완료되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/storelogin")
    public ResponseEntity<String> Storelogin(@RequestBody Map<String, String> loginData, HttpSession session) {
        String storeid = loginData.get("storeid");
        String storepwd = loginData.get("password");
        String userType = loginData.get("userType");

        // 로그인 시도
        List<Store> loginResult = storeService.storelogin(storeid, storepwd);

        if (loginResult != null && !loginResult.isEmpty()) {
            Store store = loginResult.get(0);
            return ResponseEntity.ok("로그인 성공");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }
}
