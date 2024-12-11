package com.spring.myHouse.productdetails.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "productdetails")
public class Productdetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productdetailsnum;

    private String productdetailsimage;

    private long productnum;
}
