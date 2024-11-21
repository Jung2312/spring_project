package com.spring.myHouse.store.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "store")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeNum;

    private String storeId;

    private String storePwd;

    private String storeName;

    private String storeAddress;

    private String storePhone;

    private String storeNotice;
}
