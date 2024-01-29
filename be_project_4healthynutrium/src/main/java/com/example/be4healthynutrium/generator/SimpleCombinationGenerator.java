package com.example.be4healthynutrium.generator;

import java.util.*;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

class SimpleCombinationGenerator<T> implements IGenerator<List<T>> {

    final List<T> originalVector;
    final int combinationLength;

    /**
     * Constructor
     *
     * @param originalVector Original vector which is used for generating the combination
     * @param combinationsLength Length of the combinations
     */
    SimpleCombinationGenerator(Collection<T> originalVector,
                               int combinationsLength) {
        this.originalVector = new ArrayList<>(originalVector);
        this.combinationLength = combinationsLength;
    }

    /**
     * Creates an iterator of the simple combinations (without repetitions)
     */
    @Override
    public Iterator<List<T>> iterator() {
        return new SimpleCombinationIterator<>(this);
    }
}

