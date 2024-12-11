package com.spring.myHouse.productdetails.repository;

import com.spring.myHouse.productdetails.entity.Productdetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductdetailsRepository extends JpaRepository<Productdetails, Long>  {
    List<Productdetails> findByProductnum(long productnum);
}
