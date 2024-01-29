package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IngredientRepo extends JpaRepository<Ingredient, Long>, PagingAndSortingRepository<Ingredient, Long>, CustomIngredientRepo {

    @Query(value = "select * from ingredient where upper(ingredient_name) = upper(?)", nativeQuery = true)
    Ingredient getByName(String ingredientName);

    @Query(value = "select * from ingredient where upper(ingredient_name) = upper(?) and id != ?", nativeQuery = true)
    Ingredient getDuplicateName(String ingredientName, long ingredientID);

    @Query(value = "SELECT * FROM ingredient WHERE " +
            "ingredient.ingredient_name LIKE CONCAT('%',:keyword, '%')", nativeQuery = true)
    List<Ingredient> searchIngredient(String keyword);

    @Query(value = "SELECT ig.* FROM season_ingredient si " +
            "inner join ingredient ig on si.ingredient_id = ig.id where si.season_id = ?", nativeQuery = true)
    List<Ingredient> selectBySeasonId(long seasonId);

    @Modifying
    @Query(value = "delete from fooddetail where ingredient_id = ?", nativeQuery = true)
    int deleteInFoodDetailTable(long id);

    @Modifying
    @Query(value = "delete from season_ingredient where ingredient_id = ?", nativeQuery = true)
    int deleteIngredientInSeason(long id);

    @Modifying
    @Query(value = "delete from ingredient where id = ?", nativeQuery = true)
    int deleteInIngredientTable(long id);

    @Modifying
    @Query(value = "update ingredient set status = ? where id = ?", nativeQuery = true)
    int changeStatus(boolean status,long id);

    @Query(value = "select * from ingredient order by id desc", nativeQuery = true)
    List<Ingredient> getAll();

    @Query(value = "select * from ingredient where status = 1 order by id desc", nativeQuery = true)
    List<Ingredient> getActive();

}
