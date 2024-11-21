package com.spring.myHouse.user.repository;

import com.spring.myHouse.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByUserid(String userid);

    List<User> findByUseridAndPassword(String userid, String password);
}