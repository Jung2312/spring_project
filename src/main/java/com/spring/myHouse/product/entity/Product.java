package com.spring.myHouse.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productnum;

    @Column(nullable = false)
    private String productname;

    @Column(nullable = false)
    private String productprice;

    @Column(nullable = false)
    private String productmainimage;

    @ManyToOne
    @JoinColumn(name = "categorynum", nullable = false)
    private com.spring.myHouse.category.entity.Category category;
}
