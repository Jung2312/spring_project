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
    public User getUserById(String userid) {
        List<User> userList = userRepository.findByUserid(userid);
        if (userList.isEmpty()) {
            return null;
        }
        return userList.get(0);
    }

    // 사용자 정보 여러 개 조회
    public User getUserByIds(String userid) {
        return userRepository.findByUserid(userid)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("User not found with userid: " + userid));
    }

    // 사용자 정보 업데이트
    public User updateUser(User user) {
        User existingUser = userRepository.findByUserid(user.getUserid())
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setIntroduce(user.getIntroduce());
        existingUser.setProfileimage(user.getProfileimage());

        return userRepository.save(existingUser);
    }

    // 사용자 저장
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // 아이디 중복 확인
    public boolean isUserIdExists(String userid) {
        return userRepository.existsByUserid((userid));
    }

    // 이메일 중복 여부 확인
    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // 전화번호 중복 여부 확인
    public boolean isPhoneExists(String phone) {
        return userRepository.existsByPhone(phone);
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
