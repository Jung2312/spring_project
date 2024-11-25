package com.spring.myHouse.inventory.service;

import com.spring.myHouse.inventory.entity.Inventory;
import com.spring.myHouse.inventory.repository.InventoryRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public List<Inventory> getInventoryByProductnum(Long productnum) {
        return inventoryRepository.findByProductnum(productnum);
    }
}
