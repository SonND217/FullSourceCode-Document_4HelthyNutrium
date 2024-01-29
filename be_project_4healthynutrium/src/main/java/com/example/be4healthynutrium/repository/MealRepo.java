package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Food;
import com.example.be4healthynutrium.domain.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepo extends JpaRepository<Meal, Long> {

    @Query(value = "select * from meal where upper(meal_name) = upper(?)", nativeQuery = true)
    Meal getByName(String mealName);
}
