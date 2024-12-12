package com.spring.myHouse.search.service;

import com.spring.myHouse.search.entity.Search;
import com.spring.myHouse.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final SearchRepository searchRepository;

    public void saveSearch(Search search){
        searchRepository.save(search);
    }

    public List<Object[]> getTopSearchedProducts() {
        LocalDate oneWeekAgo = LocalDate.now().minusDays(7); // 현재 날짜 기준으로 7일 전 계산
        return searchRepository.findTopSearchedProducts(oneWeekAgo);
    }
}
