package com.spring.myHouse.store.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "store")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storenum;

    private String storeid;

    private String storepwd;

    private String storename;

    private String storeaddress;

    private String storephone;

    private String storenotice;
}
