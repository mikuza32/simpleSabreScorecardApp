package com.github.mikuza32.simplesabrescorecardapp.Repo;

import com.github.mikuza32.simplesabrescorecardapp.Entities.Users;
import com.github.mikuza32.simplesabrescorecardapp.Entities.defensiveSabermetrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface defensiveSabermetricRepo extends JpaRepository<defensiveSabermetrics, Long> {
    List<defensiveSabermetrics> findByUsersId(Long userId);
}
