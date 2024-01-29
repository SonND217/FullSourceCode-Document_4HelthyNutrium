package com.example.be4healthynutrium.repository;

import com.example.be4healthynutrium.domain.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeasonRepo extends JpaRepository<Season, Long> {
}
