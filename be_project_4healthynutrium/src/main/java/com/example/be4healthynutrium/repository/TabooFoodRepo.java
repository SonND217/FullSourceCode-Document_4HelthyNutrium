package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.TabooFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TabooFoodRepo extends JpaRepository<TabooFood, Long>, PagingAndSortingRepository<TabooFood, Long> {

    @Query(value = "SELECT * FROM taboofood where ingredient1_id = ?", nativeQuery = true)
    List<TabooFood> searchTabooFoodByIngredientName1(long id);

    @Query(value = "SELECT * FROM taboofood where ingredient2_id = ?", nativeQuery = true)
    List<TabooFood> searchTabooFoodByIngredientName2(long id);

    @Query(value = "select * from taboofood where ingredient1_id = ? or ingredient2_id = ?", nativeQuery = true)
    List<TabooFood> getByIngredientId(Long id1, Long id2);
}
