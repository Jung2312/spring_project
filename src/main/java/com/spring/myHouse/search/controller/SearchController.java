package com.spring.myHouse.search.controller;

import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.service.ProductService;
import com.spring.myHouse.search.entity.Search;
import com.spring.myHouse.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소
public class SearchController {

    private final SearchService searchService;
    private final ProductService productService;

    @PostMapping()
    public ResponseEntity<String> saveSearchData(@RequestBody Search search){

        try {
            searchService.saveSearch(search);
            return ResponseEntity.ok("검색어 저장 성공");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("검색어 저장 중 오류 발생");
        }
    }

    @GetMapping("/top")
    public ResponseEntity<List<Object[]>> getTopSearchedProducts() {
        try {
            List<Object[]> topProducts = searchService.getTopSearchedProducts();
            return ResponseEntity.ok(topProducts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
