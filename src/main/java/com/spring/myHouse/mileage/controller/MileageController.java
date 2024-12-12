package com.spring.myHouse.mileage.controller;

import com.spring.myHouse.inventory.service.InventoryService;
import com.spring.myHouse.mileage.service.MileageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/mileage")
public class MileageController {
    private final MileageService mileageService;

    @GetMapping("/mileageCount")
    public int mileageCount(@RequestParam String userid) {
        return mileageService.getBalanceByUserid(userid);
    }
}
