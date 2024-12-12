package com.spring.myHouse.search.repository;

import com.spring.myHouse.search.entity.Search;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SearchRepository extends JpaRepository<Search, Long> {

    @Query("SELECT s.productnum, COUNT(s) AS searchCount, p.productname " +
            "FROM Search s JOIN Product p ON s.productnum = p.productnum " +
            "WHERE s.searchdate >= :oneWeekAgo " +
            "GROUP BY s.productnum " +
            "ORDER BY COUNT(s) DESC " +
            "LIMIT 10")
    List<Object[]> findTopSearchedProducts(@Param("oneWeekAgo") LocalDate oneWeekAgo);
}
