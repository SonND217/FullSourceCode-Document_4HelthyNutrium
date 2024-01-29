package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.FoodDetail;
import com.example.be4healthynutrium.repository.FoodDetailRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FoodDetailService {

    @Autowired
    FoodDetailRepo repo;

    public List<FoodDetail> getAll() {
        log.info("Lấy tất cả fooddetail");
        return repo.findAll();
    }

}
