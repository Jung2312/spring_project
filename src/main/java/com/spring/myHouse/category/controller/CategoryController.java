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

    // categoryimage가 null이 아닌 majorCategory를 가져오는 API
    @GetMapping("/major")
    public List<String> getAllMajorCategories() {
        return categoryService.getAllMajorCategories();
    }

    // 특정 majorCategory에 해당하는 subCategory들을 가져오는 API
    @GetMapping("/{majorCategory}/sub")
    public List<Category> getSubCategories(@PathVariable String majorCategory) {
        return categoryService.getSubCategoriesByMajorCategory(majorCategory);
    }

    // CategoryController.java
    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{majorCategory}/{subCategory}")
    public List<Category> getCategoriesByMajorAndSubCategory(
            @PathVariable String majorCategory,
            @PathVariable String subCategory) {
        return categoryService.getCategoriesByMajorAndSubCategory(majorCategory, subCategory);
    }
}
