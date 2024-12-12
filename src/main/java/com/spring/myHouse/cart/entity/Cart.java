package com.spring.myHouse.cart.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cartnum;

    @JoinColumn(name="userid")
    private String userid;

    @JoinColumn(name="productnum")
    private long productnum;

    private long cartrepair;
}
