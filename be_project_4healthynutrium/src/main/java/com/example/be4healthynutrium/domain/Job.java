package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Table(name = "job")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "job_name")
    private String jobName;

    @ManyToMany
    @JoinTable(name = "cofficentdetail", joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "coefficient_id"))
    private List<CoefficientMotion> coefficientMotions;

    @Column(name = "breakfast_rate")
    private double breakfastRate;

    @Column(name = "lunch_rate")
    private double lunchRate;

    @Column(name = "dinner_rate")
    private double dinnerRate;

    @Column(name = "age_max")
    private int maxAge;

    @Column(name = "age_min")
    private int minAge;

    @Column(name = "job_type")
    private int jobType;

    @Override
    public boolean equals(Object object) {
        boolean result = false;

        if (object != null && object instanceof Job) {
            result = this.id == ((Job) object).id;
        }

        return result;
    }
}
