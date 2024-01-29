package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Table(name = "coefficientmotion")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CoefficientMotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "age_min")
    private int ageMin;

    @Column(name = "age_max")
    private int ageMax;

    @Column(name = "coefficient_motion")
    private float coefficientMotion;

    @Column(name = "gender")
    private boolean gender;

    @Column(name = "description")
    private String description;

//    @ManyToOne
//    @JoinColumn(name = "job_id", referencedColumnName = "id")
//    private Job job;

//    @ManyToMany
//    @JoinTable(name = "cofficentdetail", joinColumns = @JoinColumn(name = "coefficient_id"),
//            inverseJoinColumns = @JoinColumn(name = "job_id"))
//    private List<Job> jobs;

}
