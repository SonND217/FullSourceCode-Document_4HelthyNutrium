package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.CoefficientMotion;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.repository.CoefficientMotionRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CoefficientMotionService {

    @Autowired
    CoefficientMotionRepo coefficientMotionRepo;

    public List<CoefficientMotion> getAll() {
        log.info("Lấy tất cả coefficientMotions");
        return coefficientMotionRepo.findAll();
    }

    public CoefficientMotion getById(long id) {
        Optional<CoefficientMotion> optional = coefficientMotionRepo.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new CustomException("Không tìm thấy coefficientMotion");
        }
    }
}
