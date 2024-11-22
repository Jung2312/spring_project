package com.spring.myHouse.category.repository;

import com.spring.myHouse.category.entity.Category;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
    // majorcategory로 서브카테고리 목록을 조회
    List<Category> findByMajorcategory(String majorCategory);

    // 모든 카테고리 목록을 조회
    List<Category> findAll();
}
