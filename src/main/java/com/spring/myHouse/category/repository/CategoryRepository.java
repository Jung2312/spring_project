package com.spring.myHouse.category.repository;

import com.spring.myHouse.category.entity.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
    // majorcategory로 서브카테고리 목록을 조회
    List<Category> findByMajorcategory(String majorCategory);

    // categoryimage가 null이 아닌 majorcategory를 중복없이 가져오는 쿼리
    @Query("SELECT DISTINCT c.majorcategory FROM Category c WHERE c.categoryimage IS NOT NULL")
    List<String> findDistinctMajorCategoriesWithImage();

    // categoryimage가 null이 아닌 전체 데이터를 가져옴
    @Query("SELECT c FROM Category c WHERE c.categoryimage IS NOT NULL")
    List<Category> findAllWithNonNullCategoryImage();
}
