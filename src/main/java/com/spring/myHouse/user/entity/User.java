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
    private String introduce;
    private String profileimage;
    private String email;
    private int admin;
    private int gradenum;
}