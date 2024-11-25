package com.spring.myHouse.inventory.controller;

import com.spring.myHouse.inventory.entity.Inventory;
import com.spring.myHouse.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
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
}
