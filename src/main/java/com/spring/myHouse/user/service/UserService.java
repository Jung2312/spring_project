package com.spring.myHouse.user.service;

import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    // 사용자 정보 조회
    public List<User> getUserById(String userid) { return userRepository.findByUserid(userid); }

    // 사용자 정보 저장 및 업데이트
    public User saveUpdateUser(User user) { return userRepository.save(user); }
}