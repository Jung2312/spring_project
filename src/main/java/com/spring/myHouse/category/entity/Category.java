package com.spring.myHouse.category.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categorynum;

    @Column(nullable = false)
    private String majorcategory;

    @Column(nullable = false)
    private String subcategory;

    @Column(nullable = false)
    private String categoryimage;
}
