package com.spring.myHouse.contest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "contestjoin")
public class Contestjoin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long joinnum;

    private String userid;

    private Long joinlike;

    private String joinimg;

    private Long contestnum;
}
