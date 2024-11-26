package com.spring.myHouse.liked.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "liked")
public class Liked {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long likenum;

    @JoinColumn(name="userid")
    String userid;

    Long postnum;

    Long joinnum;
}
