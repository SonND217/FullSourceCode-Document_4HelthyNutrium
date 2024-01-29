package com.example.be4healthynutrium.generator;

import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class CombinationGenerator<T> {

    final Collection<T> originalVector;

    CombinationGenerator(Collection<T> originalVector) {
        this.originalVector = originalVector;
    }

    public IGenerator<List<T>> simple(int length) {
        return new SimpleCombinationGenerator<>(originalVector, length);
    }

}

