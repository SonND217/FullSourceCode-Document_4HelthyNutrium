package com.example.be4healthynutrium.dto;

import com.example.be4healthynutrium.domain.Category;
import com.example.be4healthynutrium.domain.Ingredient;
import com.example.be4healthynutrium.domain.Meal;
import com.example.be4healthynutrium.domain.Season;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodDTO {

    private Long id;

    private String foodName;

    private String img;

    private String recipe;

    private float fat;

    private float protein;

    private float carb;

    private float calo;

    private Category category;

    private List<IngredientMass> ingredientMasses;

    private List<Meal> meals;

    private List<Season> seasons;

    private Boolean status;

}
