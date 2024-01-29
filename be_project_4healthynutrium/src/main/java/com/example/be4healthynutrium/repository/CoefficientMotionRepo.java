package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.CoefficientMotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CoefficientMotionRepo extends JpaRepository<CoefficientMotion, Long> {

    @Query(value = "select * from coefficientmotion where id = ?", nativeQuery = true)
    CoefficientMotion getCoefficientMotionById(Long id);

//    @Query(value = "select * from coefficientMotion where gender = ?", nativeQuery = true)
//    CoefficientMotion getCoefficientMotionByGender(Boolean gender);
//
//    @Query(value = "select * from coefficientMotion where age = ?", nativeQuery = true)
//    CoefficientMotion getCoefficientMotionByAge(String age);
}
