package com.spring.myHouse.reply.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "reply")
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replynum;

    @JoinColumn(name="userid")
    private String userid;

    @Column(nullable = true) // NULL 값 허용
    private String replycontent;

    @JoinColumn(name="postnum")
    private Long postnum;

    @CreationTimestamp
    private String replydate;
}
