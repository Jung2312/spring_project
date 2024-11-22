package com.spring.myHouse.store.service;

import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.store.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {
    private final StoreRepository storeRepository;

    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    // storeId로 Store 정보 가져오기
    public Store getStoreById(String storeid) {
        Optional<Store> store = storeRepository.findByStoreid(storeid);
        return store.orElseThrow(() -> new RuntimeException("Store not found with ID: " + storeid));
    }

    // Store 정보 업데이트
    public Store updateStore(Store updatedStore) {
        return storeRepository.save(updatedStore);
    }

    // 판매자 로그인
    public List<Store> storelogin(String storeid, String storepwd){
        List<Store> byStore = storeRepository.findByStoreidAndStorepwd(storeid, storepwd);
        return byStore;
    }
}
