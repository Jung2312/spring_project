package com.spring.myHouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/test")
    public Map<String, String> data() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "실행");
        return response;
    }

}
