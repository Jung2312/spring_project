package com.spring.myHouse.store.controller;

import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/store")
public class StoreController {
    private final StoreService storeService;

    // 판매자 정보 조회
    @GetMapping("/info/{storeId}")
    public Store getStoreInfo(@PathVariable String storeId) {
        return storeService.getStoreById(storeId);
    }

    // 판매자 정보 업데이트
    @PutMapping("/info")
    public Store updateStoreInfo(@RequestBody Store updatedStore) {
        return storeService.updateStore(updatedStore);
    }
}
