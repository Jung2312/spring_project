package com.spring.myHouse.grade.service;

import com.spring.myHouse.grade.repository.GradeRepository;
import com.spring.myHouse.mileage.repository.MileageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GradeService {
    private final GradeRepository gradeRepository;

    public String getGradeByGradenum(Long gradenum){
        return gradeRepository.findGradeByGradenum(gradenum);
    }
}
