package com.example.be4healthynutrium.dto;

import com.example.be4healthynutrium.domain.Job;
import com.example.be4healthynutrium.domain.Recommendation;
import com.example.be4healthynutrium.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DietaryInfoDTO {

    private User user;
    private Job job;
    private String date;
    private double weight;
    private double height;
    private double breakfastCalo;
    private double lunchCalo;
    private double dinnerCalo;
    private double breakfastCarb;
    private double lunchCarb;
    private double dinnerCarb;
    private double breakfastProtein;
    private double lunchProtein;
    private double dinnerProtein;
    private double breakfastFat;
    private double lunchFat;
    private double dinnerFat;
    private double bmi;
    private List<FoodMass> breakfast;
    private List<FoodMass> lunch;
    private List<FoodMass> dinner;
    private int age;
    private Recommendation recommendation;
    private double totalCalo;
    private double totalExpectedCalo;
}
