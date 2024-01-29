package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.FoodDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodDetailRepo extends JpaRepository<FoodDetail, Long>{

    @Query(value = "select * from fooddetail where food_id = ?", nativeQuery = true)
    List<FoodDetail> getByFoodID(long foodID);

    @Query(value = "SELECT ft.* FROM fooddetail ft " +
            "inner join food f on ft.food_id = f.id " +
            "inner join category c on f.category_id = c.id " +
            "where c.category_status = 1 order by ft.food_id desc", nativeQuery = true)
    List<FoodDetail> getAllFoodDetail();

}
