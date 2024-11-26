package com.spring.myHouse.couponhistory.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "couponhistory")
public class Couponhistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long couponhistorynum;

    private Long couponnum;

    private String userid;

    private Long couponusecheck;

    private String couponexpirationdate;

}
