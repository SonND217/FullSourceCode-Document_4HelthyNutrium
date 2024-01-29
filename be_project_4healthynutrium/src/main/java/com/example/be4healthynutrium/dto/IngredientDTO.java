package com.example.be4healthynutrium.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IngredientDTO {
    private Long id;

    private String ingredient_name;

    private String img;

    private float calo;

    private float fat;

    private float protein;

    private float carb;

    private float water;

    private float fiber;

    private float ash;

    private float canxi;

    private float iron;

    private float zinc;

    private float vitaminC;

    private float vitaminB1;

    private float vitaminB2;

    private float vitaminB3;

    private float vitaminB6A;

    private float vitaminD;

    private float vitaminB12;

    private float vitaminA;

    private float vitaminA_rae;

    private Boolean status;
}
