package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Table(name = "recommendation")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "age_min")
    private int ageMin;

    @Column(name = "age_max")
    private int ageMax;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "iot")
    private double iot;

    @Column(name = "vitaminA")
    private double vitaminA;

    @Column(name = "vitaminD")
    private double vitaminD;

    @Column(name = "vitaminC")
    private double vitaminC;

    @Column(name = "vitaminE")
    private double vitaminE;

    @Column(name = "vitaminK")
    private double vitaminK;

    @Column(name = "vitaminB1")
    private double vitaminB1;

    @Column(name = "vitaminB2")
    private double vitaminB2;

    @Column(name = "vitaminB3")
    private double vitaminB3;

    @Column(name = "vitaminB6")
    private double vitaminB6;

    @Column(name = "vitaminB9")
    private double vitaminB9;

    @Column(name = "vitaminB12")
    private double vitaminB12;

    @Column(name = "zinc")
    private double zinc;

    @Column(name = "magie")
    private double magie;

    @Column(name = "photpho")
    private double photpho;

    @Column(name = "iron")
    private double iron;

    @Column(name = "canxi")
    private double canxi;
}
