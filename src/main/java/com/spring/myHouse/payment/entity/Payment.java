package com.spring.myHouse.payment.entity;

import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.store.entity.Store;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

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
    private LocalDateTime paydate;

    private Long payprice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productnum", insertable = false, updatable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "storenum", insertable = false, updatable = false)
    private Store store;

    // storenum 필드를 직접 사용할 경우
    private Long storenum;
}
