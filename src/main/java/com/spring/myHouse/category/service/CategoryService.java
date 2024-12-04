package com.spring.myHouse.category.service;

import com.spring.myHouse.category.entity.Category;
import com.spring.myHouse.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // categoryimage가 null이 아닌 majorCategory 목록을 반환
    public List<String> getAllMajorCategories() {
        return categoryRepository.findDistinctMajorCategoriesWithImage();
    }

    // 특정 majorCategory에 해당하는 subCategory들을 반환
    public List<Category> getSubCategoriesByMajorCategory(String majorCategory) {
        return categoryRepository.findByMajorcategory(majorCategory);
    }

    // 상점 번호를 기준으로 메인 카테고리를 조회하는 메서드
    public List<Category> getCategoriesByStore(int storenum) {
        System.out.println("Received storenum: " + storenum);
        List<Category> categories = categoryRepository.findCategoriesByStoreNum(storenum);
        System.out.println("Categories: " + categories);
        return categories;
    }

    // CategoryService.java
    public List<Category> getAllCategories() {
        return categoryRepository.findAllWithNonNullCategoryImage();
    }

    public List<Category> getCategoriesByMajorAndSubCategory(String majorCategory, String subCategory) {
        return categoryRepository.findByMajorcategoryAndSubcategory(majorCategory, subCategory);
    }

}
