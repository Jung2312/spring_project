package com.spring.myHouse.store.repository;

import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.store.entity.Store;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends CrudRepository<Store, Long> {
    // storeId로 Store 조회
    List<Store> findByStoreid(String storeid);
    List<Store> findByStoreidAndStorepwd(String storeid, String storepwd);

    // storeName으로 검색
    List<Store> findByStorenameContainingIgnoreCase(String storename);

    // 상점 이름으로 상점 조회
    Store findByStorename(String storename);

    // 중복 여부 확인
    boolean existsByStoreid(String storeid);
    boolean existsByStoreemail(String email);
    boolean existsByStorephone(String phone);

    // storenum을 기준으로 Store를 찾는 메서드
    Store findByStorenum(Long storenum);

}
