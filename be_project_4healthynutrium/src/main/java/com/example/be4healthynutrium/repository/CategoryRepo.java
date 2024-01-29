package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long>, PagingAndSortingRepository<Category, Long> {
    @Query(value = "select * from category where upper(category_name) = upper(?)", nativeQuery = true)
    Category getByName(String categoryName);

    @Query(value = "SELECT * FROM category where category_status = 1", nativeQuery = true)
    List<Category> getAllCategory();

    @Query(value = "SELECT * FROM category WHERE " +
            "category.category_name LIKE CONCAT('%',:keyword, '%')", nativeQuery = true)
    List<Category> searchCategory(String keyword);

    @Query(value = "select * from category where upper(category_name) = upper(?) and id != ?", nativeQuery = true)
    Category getDuplicateName(String categoryName, long categoryID);

    @Query(value = "select * from category where category_status = 1", nativeQuery = true)
    List<Category> getActive();

}
