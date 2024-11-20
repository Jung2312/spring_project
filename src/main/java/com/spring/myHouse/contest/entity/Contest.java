package com.spring.myHouse.contest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "contest")
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contestnum;

    private String contesttitle;

    private String conteststartdate;

    private String contestenddate;

    private Long couponnum;

    private Long contestprogress;
}
