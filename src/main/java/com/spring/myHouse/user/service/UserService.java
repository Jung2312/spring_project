package com.spring.myHouse.user.service;

import com.spring.myHouse.user.entity.User;
import com.spring.myHouse.user.repository.UserRepository;
import jakarta.persistence.Id;
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
    public User saveOrUpdateUser(User user) {
        return userRepository.save(user);
    }

    // 로그인 아이디 조회, 비밀번호 일치 확인
    public List<User> userlogin(String userid, String password) {
        // 유저 ID로 조회
        List<User> byUser = userRepository.findByUseridAndPassword(userid, password);
        if (byUser.isEmpty()) {
            // 조회 결과 없음
            return null;
        }
        // 비밀번호 일치 여부 확인
        return byUser;
    }
}
