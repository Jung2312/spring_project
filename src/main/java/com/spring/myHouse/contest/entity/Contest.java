package com.spring.myHouse.contest.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "contest")
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contestnum;

    private String contesttitle;

    private LocalDate conteststartdate;

    private LocalDate contestenddate;

    private Long couponnum;

    private Long contestprogress;

}
