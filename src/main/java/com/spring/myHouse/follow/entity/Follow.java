package com.spring.myHouse.follow.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long follownum;

    private String userid;
    private String following;
}
