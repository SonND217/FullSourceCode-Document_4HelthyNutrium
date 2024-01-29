package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Table(name = "ingredient")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ingredient_name")
    private String ingredientName;

    @Column(name = "min_limit")
    private int minLimit;

    @Column(name = "max_limit")
    private int maxLimit;

    @Column(name = "img")
    private String img;

    @Column(name = "calo")
    private float calo;

    @Column(name = "fat")
    private float fat;

    @Column(name = "protein")
    private float protein;

    @Column(name = "carb")
    private float carb;

    @Column(name = "water")
    private float water;

    @Column(name = "fiber")
    private float fiber;

    @Column(name = "ash")
    private float ash;

    @Column(name = "canxi")
    private float canxi;

    @Column(name = "iron")
    private float iron;

    @Column(name = "zinc")
    private float zinc;

    @Column(name = "vitaminC")
    private float vitaminC;

    @Column(name = "vitaminB1")
    private float vitaminB1;

    @Column(name = "vitaminB2")
    private float vitaminB2;

    @Column(name = "vitaminB3")
    private float vitaminB3;

    @Column(name = "vitaminB6A")
    private float vitaminB6A;

    @Column(name = "vitaminD")
    private float vitaminD;

    @Column(name = "vitaminB12")
    private float vitaminB12;

    @Column(name = "vitaminA")
    private float vitaminA;

    @Column(name = "vitaminA_rae")
    private float vitaminARae;

    @ManyToMany
    @JoinTable(name = "season_ingredient", joinColumns = @JoinColumn(name = "ingredient_id"),
            inverseJoinColumns = @JoinColumn(name = "season_id"))
    private List<Season> seasons;

    @Column(name = "status")
    private Boolean status;
}
