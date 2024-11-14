package com.github.mikuza32.simplesabrescorecardapp.Repo;

import com.github.mikuza32.simplesabrescorecardapp.Entities.offensiveSabermetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface offensiveSabermetricRepository extends JpaRepository<offensiveSabermetrics, Long> {

    List<offensiveSabermetrics> findByUsersId(Long userId);
}


