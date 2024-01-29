package com.example.be4healthynutrium.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchFoodDTO {

    private String text;
    private Long categoryId;
    private Long mealId;
    private Long seasonId;

}
