package com.spring.myHouse.category.repository;

import com.spring.myHouse.category.entity.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
    // majorcategory로 서브카테고리 목록을 조회
    List<Category> findByMajorcategory(String majorCategory);

    // 모든 카테고리 목록을 조회
    List<Category> findAll();

    // 상점 번호를 기반으로 메인 카테고리를 조회하는 쿼리
    @Query("SELECT DISTINCT c FROM Category c JOIN Product p ON c.categorynum = p.category.categorynum WHERE p.storenum = :storenum")
    List<Category> findCategoriesByStoreNum(@Param("storenum") int storenum);
}
