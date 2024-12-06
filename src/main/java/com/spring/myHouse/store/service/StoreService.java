package com.spring.myHouse.store.service;

import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.store.repository.StoreRepository;
import com.spring.myHouse.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class StoreService {
    private final StoreRepository storeRepository;

    // storeId로 Store 정보 가져오기
    public Store getStoreById(String storeid) {
        List<Store> storeList = storeRepository.findByStoreid(storeid);
        if (storeList.isEmpty()) {
            return null;
        }
        return storeList.get(0);
    }

    // Store 정보 업데이트
    public Store updateStore(Store updatedStore) {
        // storenum을 기준으로 기존 상점 찾기
        Store existingStore = storeRepository.findByStorenum(updatedStore.getStorenum());

        if (existingStore != null) {
            // 기존 상점 정보 업데이트
            existingStore.setStoreid(updatedStore.getStoreid());  // storeid는 변경할 필요가 있을 경우만
            existingStore.setStorename(updatedStore.getStorename());
            existingStore.setStorephone(updatedStore.getStorephone());
            existingStore.setStoreaddress(updatedStore.getStoreaddress());
            existingStore.setStorenotice(updatedStore.getStorenotice());
            existingStore.setStoreemail(updatedStore.getStoreemail());
            existingStore.setStorepostcode(updatedStore.getStorepostcode());
            existingStore.setStorepwd(updatedStore.getStorepwd());

            // 업데이트된 상점 정보 저장 (기존 storenum 기준으로 업데이트)
            return storeRepository.save(existingStore); // save()는 존재하는 엔티티를 업데이트합니다.
        }

        return null; // 해당 storenum에 해당하는 상점이 없으면 null 반환
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
        List<Store> byUser = storeRepository.findByStoreidAndStorepwd(storeid, storepwd);
        if (byUser.isEmpty()) {
            // 조회 결과 없음
            return null;
        }
        // 비밀번호 일치 여부 확인
        return byUser;
    }

    // 상점 이름으로 상점 정보 조회
    public Store getStoreByName(String storename) {
        return storeRepository.findByStorename(storename);
    }
}
