package com.spring.myHouse.store.service;

import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.store.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StoreService {
    private final StoreRepository storeRepository;

    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    // storeId로 Store 정보 가져오기
    public Store getStoreById(String storeId) {
        Optional<Store> store = storeRepository.findByStoreId(storeId);
        return store.orElseThrow(() -> new RuntimeException("Store not found with ID: " + storeId));
    }

    // Store 정보 업데이트
    public Store updateStore(Store updatedStore) {
        return storeRepository.save(updatedStore);
    }
}
