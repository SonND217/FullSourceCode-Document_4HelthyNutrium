package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;


@Getter
@Setter
@Table(name = "dietaryinfo")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class DietaryInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "weight")
    private double weight;

    @Column(name = "height")
    private double height;

    @Column(name = "calories_need")
    private double caloriesNeed;

    @Column(name = "fat_need")
    private double fatNeed;

    @Column(name = "carb_need")
    private double carbNeed;

    @Column(name = "protein_need")
    private double proteinNeed;

    @Column(name = "diet_date")
    private String dietDate;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private Job job;

    @ManyToOne
    @JoinColumn(name = "meal_id", referencedColumnName = "id")
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "food_id", referencedColumnName = "id")
    private Food food;

    @Column(name = "mass")
    private double mass;

    @Column(name = "age")
    private int age;

}
