package com.spring.myHouse.inventory.service;

import com.spring.myHouse.inventory.entity.Inventory;
import com.spring.myHouse.inventory.repository.InventoryRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public List<Inventory> getInventoryByProductnum(Long productnum) {
        return inventoryRepository.findByProductnum(productnum);
    }

    public List<Inventory> getInventoryByStoreNum(Long stornum){
        return inventoryRepository.findByStorenum(stornum);
    }

    public boolean updateInventory(Long productnum, Long inventorycount) {
        // 업데이트 된 행의 수 리턴
        int updateCount = inventoryRepository.updateInventoryCount(productnum, inventorycount);
        return updateCount > 0;
    }
}
