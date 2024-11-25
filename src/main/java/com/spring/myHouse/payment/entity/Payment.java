package com.spring.myHouse.payment.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paynum;

    private Long payordernum;

    @JoinColumn(name="userid")
    private String userid;

    @JoinColumn(name="cartnum")
    private Long cartnum;

    @CreationTimestamp
    private String paydate;

    private Long payprice;
}
