package com.spring.myHouse.reply.repository;

import com.spring.myHouse.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    @Query("SELECT r FROM Reply r WHERE r.postnum = :postNum")
    List<Reply> findReplyByPostNum(Long postNum);
}
