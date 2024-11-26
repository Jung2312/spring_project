package com.spring.myHouse.inventory.controller;

import com.spring.myHouse.inventory.entity.Inventory;
import com.spring.myHouse.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @GetMapping("/inventoryList")
    public List<Inventory> getInventoryList(@RequestParam Long productnum) {
        System.out.println("Fetching products for product: " + productnum); // 로그 추가
        return inventoryService.getInventoryByProductnum(productnum);
    }

    @GetMapping("/inventoryList/{storenum}")
    public List<Inventory> getInventoryByStoreNum(@PathVariable Long storenum) {
        return inventoryService.getInventoryByStoreNum(storenum);
    }

    @PutMapping("/updateCount")
    public ResponseEntity<?> updateInventory(@PathVariable Long productnum, @RequestParam Long inventorycount) {
        boolean isUpdated = inventoryService.updateInventory(productnum, inventorycount);

        if (isUpdated) {
            return ResponseEntity.ok("재고가 성공적으로 업데이트되었습니다.");
        } else {
            return ResponseEntity.status(404).body("상품 번호를 찾을 수 없습니다.");
        }
    }
}
