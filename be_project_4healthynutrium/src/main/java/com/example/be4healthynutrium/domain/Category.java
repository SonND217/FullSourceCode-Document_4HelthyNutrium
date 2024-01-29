package com.example.be4healthynutrium.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_status")
    private Boolean categoryStatus;

    @Override
    public boolean equals(Object object) {
        boolean result = false;

        if (object != null && object instanceof Category) {
            result = this.id == ((Category) object).id;
        }

        return result;
    }
}
