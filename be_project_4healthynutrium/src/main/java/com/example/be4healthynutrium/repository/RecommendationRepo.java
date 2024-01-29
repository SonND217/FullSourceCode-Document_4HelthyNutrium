package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.FoodDetail;
import com.example.be4healthynutrium.domain.Job;
import com.example.be4healthynutrium.domain.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface RecommendationRepo extends JpaRepository<Recommendation, Long> {

    @Query(value = "select * from recommendation where ? between age_min and age_max and gender = ?", nativeQuery = true)
    Recommendation getByAgeAndGender(int age, boolean gender);
}
