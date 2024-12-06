package com.spring.myHouse.grade.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "grade")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gradenum;

    private String gradename;

    @JoinColumn(name="couponnum")
    private Long couponnum;

}
