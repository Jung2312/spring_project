package com.spring.myHouse.contest.controller;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.contest.service.ContestJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ContestJoinController {
    private final ContestJoinService contestJoinService;

    @GetMapping("/contest/info/join")
    public List<Contestjoin> getContestjoins(Model model) {
        List<Contestjoin> contestjoins = contestJoinService.getContestJoin();
        model.addAttribute("contestjoins", contestjoins);
        return contestjoins;
    }

    @PostMapping("/contest/like/{joinnum}")
    public ResponseEntity<String> incrementLike(@PathVariable Long joinnum) {
        contestJoinService.incrementLike(joinnum);
        return ResponseEntity.ok("success");
    }
}
