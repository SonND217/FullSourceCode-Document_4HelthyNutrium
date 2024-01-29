package com.example.be4healthynutrium.dto;

import com.example.be4healthynutrium.domain.Ingredient;
import com.example.be4healthynutrium.domain.Season;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IngredientMass {

    Ingredient ingredient;

    private float mass;
}
