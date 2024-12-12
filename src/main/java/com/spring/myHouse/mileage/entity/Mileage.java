package com.spring.myHouse.mileage.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "mileage")
public class Mileage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mileagenum;

    @JoinColumn(name="userid")
    private String userid;

    private Long balance;

}
