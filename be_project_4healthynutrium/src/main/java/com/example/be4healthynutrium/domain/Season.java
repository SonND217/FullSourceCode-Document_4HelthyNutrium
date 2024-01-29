package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Table(name = "season")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Season {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "season_name")
    private String seasonName;

    @Override
    public boolean equals(Object object) {
        boolean result = false;

        if (object != null && object instanceof Season) {
            result = this.id == ((Season) object).id;
        }

        return result;
    }

}
