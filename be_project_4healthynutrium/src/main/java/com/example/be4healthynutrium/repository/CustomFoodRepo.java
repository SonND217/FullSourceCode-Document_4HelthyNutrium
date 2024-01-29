package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Food;
import com.example.be4healthynutrium.dto.SearchFoodDTO;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public interface CustomFoodRepo {
    public List<Food> search(SearchFoodDTO searchData, boolean isActive);

}
