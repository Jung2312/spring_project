package com.spring.myHouse.contest.controller;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.contest.service.ContestJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ContestJoinController {
    private final ContestJoinService contestJoinService;

    @GetMapping("/contest/info/join")
    public List<Contestjoin> getContestJoins(Model model) {
        List<Contestjoin> contestJoin = contestJoinService.getContestJoin();
        model.addAttribute("contestJoin", contestJoin);
        return contestJoin;
    }
}
