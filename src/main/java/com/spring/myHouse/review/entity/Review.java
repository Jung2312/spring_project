package com.spring.myHouse.review.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
@Table(name = "review")
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewnum;

    private String userid;

    private long productnum;

    private String reviewcontent;

    @Nullable
    private String reviewimage;

    @CreationTimestamp
    private String reviewdate;

    private long reviewrating;
}
