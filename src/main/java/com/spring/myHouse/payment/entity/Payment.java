package com.spring.myHouse.payment.entity;

import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.store.entity.Store;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

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

    @JoinColumn(name="productnum")
    private Long productnum;

    private Long payrepair;

    @CreationTimestamp
    private LocalDate paydate;

    private Long payprice;
}
