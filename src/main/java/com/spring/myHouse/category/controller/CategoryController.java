package com.spring.myHouse.category.controller;

import com.spring.myHouse.category.entity.Category;
import com.spring.myHouse.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // 모든 majorCategory를 가져오는 API
    @GetMapping("/major")
    public List<String> getAllMajorCategories() {
        return categoryService.getAllMajorCategories();
    }

    // 특정 majorCategory에 해당하는 subCategory들을 가져오는 API
    @GetMapping("/{majorCategory}/sub")
    public List<Category> getSubCategories(@PathVariable String majorCategory) {
        return categoryService.getSubCategoriesByMajorCategory(majorCategory);
    }

    // 상점 번호를 기준으로 메인 카테고리 조회
    @GetMapping
    public List<Category> getCategoriesByStore(@RequestParam int storenum) {
        return categoryService.getCategoriesByStore(storenum);
    }

}
