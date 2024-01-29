package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.Job;
import com.example.be4healthynutrium.repository.JobRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class JobService {

    @Autowired
    JobRepo jobRepo;

    public List<Job> getAll(){
        log.info("Lấy tất cả các job");
        return jobRepo.findAll();
    }
}
