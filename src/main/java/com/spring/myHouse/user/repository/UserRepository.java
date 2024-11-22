package com.spring.myHouse.user.repository;

import com.spring.myHouse.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByUserid(String userid);

    boolean existsByUserid(String userid); // 중복 아이디 확인

    boolean existsByEmail(String email); // 이메일 존재 여부 확인

    boolean existsByPhone(String phone); // 전화번호 중복 여부 확인
    
    List<User> findByUseridAndPassword(String userid, String password);
}