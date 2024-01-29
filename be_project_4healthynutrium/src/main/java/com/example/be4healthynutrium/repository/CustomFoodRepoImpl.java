package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Food;
import com.example.be4healthynutrium.dto.SearchFoodDTO;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class CustomFoodRepoImpl implements CustomFoodRepo{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Food> search(SearchFoodDTO searchData, boolean isActive) {
        String filterStr = "";
        if(!searchData.getText().trim().equals("")) {
            filterStr += " and upper(f.food_name) like upper('%" + searchData.getText() + "%') ";
        }
        if(searchData.getSeasonId()!=null){
            filterStr += " and s.id = " + searchData.getSeasonId() + " ";
        }
        if(searchData.getCategoryId()!=null){
            filterStr += " and c.id = " + searchData.getCategoryId() + " ";
        }
        if(searchData.getMealId()!=null){
            filterStr += " and m.id = " + searchData.getMealId() + "  ";
        }
        if(isActive){
            filterStr += " and f.status = 1 ";
        }

        String query = "select f.* from food f, season s, season_food sf, category c, meal m, food_meal fm "
                + "where f.id = sf.food_id and s.id = sf.season_id and f.category_id = c.id and m.id = fm.meal_id and f.id = fm.food_id "
                + filterStr
                + "group by f.id order by f.id desc";
        return (List<Food>) entityManager.createNativeQuery(query,Food.class).getResultList();
    }

}
