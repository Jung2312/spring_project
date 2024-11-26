package com.spring.myHouse.inventory.repository;

import com.spring.myHouse.inventory.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByProductnum(Long productnum);

    @Query("SELECT i FROM Inventory i WHERE i.productnum IN (SELECT p.productnum FROM Product p WHERE p.storenum = :storenum)")
    List<Inventory> findByStorenum(Long storenum);

    @Modifying
    @Transactional
    @Query("UPDATE Inventory i SET i.inventorycount = :inventorycount  WHERE i.productnum = :productnum")
    Long updateInventoryCount(Long productnum, Long inventorycount);
}
