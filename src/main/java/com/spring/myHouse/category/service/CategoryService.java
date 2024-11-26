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

    // CategoryService.java
    public List<Category> getAllCategories() {
        return categoryRepository.findAllWithNonNullCategoryImage();
    }

}
