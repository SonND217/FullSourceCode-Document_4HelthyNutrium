package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Food;
import com.example.be4healthynutrium.domain.Ingredient;
import com.example.be4healthynutrium.dto.SearchFoodDTO;
import com.example.be4healthynutrium.dto.SearchIngredientDTO;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class CustomIngredientRepoImpl implements CustomIngredientRepo{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Ingredient> searchActive(SearchIngredientDTO searchData) {
        String filterStr = "";
        if(!searchData.getText().trim().equals("")) {
            filterStr += " and upper(i.ingredient_name) like upper('%" + searchData.getText() + "%') ";
        }
        if(searchData.getSeasonId()!=null) {
            filterStr += " and s.id = " + searchData.getSeasonId() + " ";
        }
        filterStr += " and i.status = 1 ";

        String query = "select i.* from ingredient i, season s, season_ingredient si \n" +
                "where i.id = si.ingredient_id and s.id = si.season_id " +
                filterStr +
                "group by i.id order by i.id desc";
        return (List<Ingredient>) entityManager.createNativeQuery(query,Ingredient.class).getResultList();
    }

}
