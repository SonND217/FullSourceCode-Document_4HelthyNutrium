package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface FoodRepo extends JpaRepository<Food, Long>, PagingAndSortingRepository<Food, Long>, CustomFoodRepo {

    @Query(value = "select * from food where upper(food_name) = upper(?)", nativeQuery = true)
    Food getByName(String foodName);

    @Query(value = "select * from food where category_id = ?", nativeQuery = true)
    List<Food> selectFoodByCateID(long cateId);

    @Query(value = "select * from food where upper(food_name) = upper(?) and id != ?", nativeQuery = true)
    Food getDuplicateName(String foodName, long foodID);

    @Query(value = "SELECT * FROM food " +
            "where category_id in (select id from category " +
            "where category_name like CONCAT('%',:keyword, '%'))", nativeQuery = true)
    List<Food> selectByCategoryName(String keyword);

    @Query(value = "SELECT f.* FROM fooddetail fd " +
            "inner join ingredient ig on fd.ingredient_id = ig.id " +
            "inner join food f on fd.food_id = f.id " +
            "where ingredient_name like CONCAT('%',:keyword, '%')", nativeQuery = true)
    List<Food> searchFoodByIngredientName(String keyword);

    @Query(value = "SELECT f.* FROM fooddetail fd " +
            "inner join food f on f.id = fd.food_id where ingredient_id = ?", nativeQuery = true)
    List<Food> selectFoodByIngredientId(long ingredientId);

    @Query(value = "SELECT f.* FROM season_food sf " +
            "inner join food f on sf.food_id = f.id where season_id = ?", nativeQuery = true)
    List<Food> selectBySeasonId(long seasonId);

    @Query(value = "SELECT f.* FROM food_meal fm " +
            "inner join food f on fm.food_id = f.id where meal_id = ?", nativeQuery = true)
    List<Food> selectByMealId(long mealId);

    @Query(value = "select f.* from food f, season s, season_food sf, category c, meal m, food_meal fm\n" +
            "where f.id = sf.food_id and s.id = sf.season_id and f.category_id = c.id and m.id = fm.meal_id and f.id = fm.food_id " +
            "and upper(f.food_Name) like upper(concat('%', ?,'%')) and CONVERT(c.id, CHAR) = ? and CONVERT(m.id, CHAR) = ? and CONVERT(s.id, CHAR) = ? " +
            "group by f.id order by f.id desc", nativeQuery = true)
    List<Food> searchFood(String text, String catId, String mealId, String seasonId);

    @Modifying
    @Query(value = "delete from food where id = ?", nativeQuery = true)
    int deleteInFoodTable(long id);

    @Modifying
    @Query(value = "delete from season_food where food_id = ?", nativeQuery = true)
    int deleteInFoodSeasonTable(long id);

    @Modifying
    @Query(value = "delete from fooddetail where food_id = ?", nativeQuery = true)
    int deleteInFoodDetailTable(long id);

    @Modifying
    @Query(value = "delete from food_meal where food_id = ?", nativeQuery = true)
    int deleteInFoodMealTable(long id);

    @Modifying
    @Query(value = "update food set status = ? where id = ?", nativeQuery = true)
    int changeStatus(boolean status, long id);

    @Query(value = "select * from food order by id desc", nativeQuery = true)
    List<Food> getAll();

    @Query(value = "select * from food where status = 1 order by id desc", nativeQuery = true)
    List<Food> getActive();

}
