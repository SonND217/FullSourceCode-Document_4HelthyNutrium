package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Food;
import com.example.be4healthynutrium.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface JobRepo extends JpaRepository<Job, Long>, PagingAndSortingRepository<Job, Long> {

}
