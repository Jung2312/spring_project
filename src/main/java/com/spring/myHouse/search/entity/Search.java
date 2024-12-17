package com.spring.myHouse.search.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@RequiredArgsConstructor
@Table(name="search")
public class Search {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long searchnum;

    @CreationTimestamp
    private LocalDate searchdate;

    private long productnum;
}
