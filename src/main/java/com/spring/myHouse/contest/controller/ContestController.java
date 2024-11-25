package com.spring.myHouse.contest.controller;

import com.spring.myHouse.contest.entity.Contest;
import com.spring.myHouse.contest.service.ContestService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ContestController {
    private final ContestService contestService;

    @GetMapping("/contest/info")
    public List<Contest> contestInfo(Model model) {
        List<Contest> contestList = contestService.getContest();
        model.addAttribute("contestList", contestList);
        return contestList;
    }


}
