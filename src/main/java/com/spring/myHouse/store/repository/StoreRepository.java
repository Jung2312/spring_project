package com.spring.myHouse.store.repository;

import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.user.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends CrudRepository<Store, Long> {
    // storeId로 Store 조회
    Optional<Store> findByStoreid(String storeid);
    List<Store> findByStoreidAndStorepwd(String storeid, String storepwd);
}
