package com.spring.myHouse.productimage.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "productimage")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productimagenum;

    private String productimage;
    private long productnum;
}
