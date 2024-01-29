package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Ingredient;
import com.example.be4healthynutrium.dto.SearchIngredientDTO;

import java.util.List;

public interface CustomIngredientRepo {
    public List<Ingredient> searchActive(SearchIngredientDTO searchData);
}
