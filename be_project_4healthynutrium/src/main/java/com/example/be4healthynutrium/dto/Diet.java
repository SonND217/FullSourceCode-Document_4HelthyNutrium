package com.example.be4healthynutrium.dto;

import com.example.be4healthynutrium.domain.Job;
import com.example.be4healthynutrium.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Diet {

    User user;
    Job job;
    double weight;
    double height;

    double breakfastCalo;
    double lunchCalo;
    double dinnerCalo;

    double breakfastCarb;
    double lunchCarb;
    double dinnerCarb;

    double breakfastProtein;
    double lunchProtein;
    double dinnerProtein;

    double breakfastFat;
    double lunchFat;
    double dinnerFat;

    double BMI;

    private List<List<FoodMass>> breakfastOptions;
    private List<List<FoodMass>> lunchOptions;
    private List<List<FoodMass>> dinnerOptions;

    double age;
}
