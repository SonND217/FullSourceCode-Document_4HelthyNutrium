package com.example.be4healthynutrium.dto;

import com.example.be4healthynutrium.domain.Food;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FoodMass {

    private Food food;
    private double mass;

}
