package com.spring.myHouse.store.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "store")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long storenum;

    @Column(nullable = true) // NULL 값 허용
    private String storeid;
    private String storepwd;
    private String storename;
    private String storeaddress;
    private String storephone;
    private String storenotice;
    private String storeemail;
    private String storepostcode;
}
