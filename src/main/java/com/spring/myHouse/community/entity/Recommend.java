package com.spring.myHouse.community.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
@Entity
@Table(name = "post")
public class Recommend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postnum;

    @JoinColumn(name="paynum")
    private Long paynum;

    @JoinColumn(name="userid")
    private String userid;
    private String posttitle;
    private String postcontent;

    @CreationTimestamp
    private Date postdate;
    private Long postview;
    private Long postlike;
    private String hashtaglist;

    @Column(nullable = true) // NULL 값 허용
    private String postimg;
}
