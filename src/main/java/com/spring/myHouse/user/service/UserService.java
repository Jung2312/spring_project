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

    public boolean isUserIdExists(String userid) {
        // 아이디 중복 확인
        return userRepository.existsByUserid((userid));
    }

    public User saveUser(User user) {
        // 사용자 저장
        return userRepository.save(user);
    }

    // 이메일 중복 여부 확인
    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // 전화번호 중복 여부 확인
    public boolean isPhoneExists(String phone) {
        return userRepository.existsByPhone(phone);
    }
}