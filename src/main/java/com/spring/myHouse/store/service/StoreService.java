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

    // storeName으로 검색
    public List<Store> searchStoresByName(String query) {
        return storeRepository.findByStorenameContainingIgnoreCase(query);
    }

    // Store 정보 업데이트 (회원가입)
    public Store updateStoreByStoreName(String storename, Store updatedData) {
        List<Store> stores = storeRepository.findByStorenameContainingIgnoreCase(storename);

        if (stores.isEmpty()) {
            throw new RuntimeException("일치하는 상점 이름이 없습니다: " + storename);
        }

        // 첫 번째 일치하는 Store를 업데이트
        Store existingStore = stores.get(0);
        existingStore.setStoreid(updatedData.getStoreid());
        existingStore.setStorepwd(updatedData.getStorepwd());
        existingStore.setStorephone(updatedData.getStorephone());
        existingStore.setStoreemail(updatedData.getStoreemail());
        existingStore.setStorepostcode(updatedData.getStorepostcode());
        existingStore.setStoreaddress(updatedData.getStoreaddress());

        return storeRepository.save(existingStore);
    }

    // 아이디, 이메일, 전화번호 중복 확인
    public boolean isUserIdExists(String storeid) {
        return storeRepository.existsByStoreid((storeid));
    }
    public boolean isEmailExists(String email) {
        return storeRepository.existsByStoreemail(email);
    }
    public boolean isPhoneExists(String phone) {
        return storeRepository.existsByStorephone(phone);
    }

    // 판매자 로그인
    public List<Store> storelogin(String storeid, String storepwd){
        List<Store> byStore = storeRepository.findByStoreidAndStorepwd(storeid, storepwd);
        return byStore;
    }
}
