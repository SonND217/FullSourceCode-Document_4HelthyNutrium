package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Table(name = "meal")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "meal_name")
    private String mealName;

    @Override
    public boolean equals(Object object) {
        boolean result = false;

        if (object != null && object instanceof Meal) {
            result = this.id == ((Meal) object).id;
        }

        return result;
    }
}
