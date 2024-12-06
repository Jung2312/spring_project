package com.spring.myHouse.mileage.service;

import com.spring.myHouse.mileage.entity.Mileage;
import com.spring.myHouse.mileage.repository.MileageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MileageService {
    private final MileageRepository mileageRepository;

    public int getBalanceByUserid(String userid){
        return mileageRepository.findBalanceByUserid(userid);
    }
}
