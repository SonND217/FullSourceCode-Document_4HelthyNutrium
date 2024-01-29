package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.DietaryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DietaryInfoRepo extends JpaRepository<DietaryInfo, Long> {
    @Query(value = "select * from dietaryinfo where diet_date = (select max(diet_date) from dietaryinfo where user_id = ?)", nativeQuery = true)
    List<DietaryInfo> getByUserId(long uid);

    @Query(value = "select * from dietaryinfo where user_id = ? and diet_date = ?", nativeQuery = true)
    List<DietaryInfo> getByDateAndUser(long uid,String date);
}
