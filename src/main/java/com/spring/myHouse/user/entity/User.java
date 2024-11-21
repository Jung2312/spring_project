package com.spring.myHouse.user.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    private String userid;
    private String password;
    private String name;
    private String address;
    private String postcode;
    private String phone;
    private String email;

    @Column(nullable = true) // NULL 값 허용
    private String introduce;
    private String profileimage;
    private Long admin;
    private Long gradenum;
}