package com.spring.myHouse.grade.repository;

import com.spring.myHouse.grade.entity.Grade;
import com.spring.myHouse.mileage.entity.Mileage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    @Query("select g.gradename from Grade g where g.gradenum = :gradenum")
    String findGradeByGradenum(@Param("gradenum") Long gradenum);
}
