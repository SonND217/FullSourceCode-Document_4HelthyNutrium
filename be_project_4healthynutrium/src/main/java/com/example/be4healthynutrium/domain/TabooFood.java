package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Table(name = "taboofood")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TabooFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ingredient1_id", referencedColumnName = "id")
    private Ingredient ingredient1;

    @ManyToOne
    @JoinColumn(name = "ingredient2_id", referencedColumnName = "id")
    private Ingredient ingredient2;

    @Column(name = "description")
    private String description;

}
