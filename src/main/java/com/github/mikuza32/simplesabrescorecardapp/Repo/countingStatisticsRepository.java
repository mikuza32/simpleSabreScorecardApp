package com.github.mikuza32.simplesabrescorecardapp.Repo;

import com.github.mikuza32.simplesabrescorecardapp.Entities.countingStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface countingStatisticsRepository extends JpaRepository<countingStatistics, Long> {

    // Offensive sabermetric calculation queries
    // each query takes various offensive counting statistics persisted to the user that has been entered
    // and averages them out based on user lifetime on the application, and the entire sites averages (all users counting statistics)
    // Usage of COALESCE to handle null values (i.e. user has never calculated or entered anything or the site has never had entries from users)
    // basic usage of arithmetic to calculate accurate user average and lifetime average from all users counting statistics entered
    @Query("SELECT COALESCE(AVG(cs.hits * 1.0 / cs.atBats), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeBattingAverageByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG(cs.hits * 1.0 / cs.atBats), 0.0) FROM countingStatistics cs")
    Double findSiteWideBattingAverage();

    @Query("SELECT COALESCE(AVG((cs.hits + cs.walks + cs.hitByPitch) * 1.0 / (cs.atBats + cs.walks + cs.hitByPitch + cs.sacrificeFlies)), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeOnBasePercentageByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG((cs.hits + cs.walks + cs.hitByPitch) * 1.0 / (cs.atBats + cs.walks + cs.hitByPitch + cs.sacrificeFlies)), 0.0) FROM countingStatistics cs")
    Double findSiteWideOnBasePercentage();

    @Query("SELECT COALESCE(AVG(cs.totalBases * 1.0 / cs.atBats), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeSluggingPercentageByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG(cs.totalBases * 1.0 / cs.atBats), 0.0) FROM countingStatistics cs")
    Double findSiteWideSluggingPercentage();

    @Query("SELECT COALESCE(AVG((cs.totalBases * 1.0 / cs.atBats) + ((cs.hits + cs.walks + cs.hitByPitch) * 1.0 / (cs.atBats + cs.walks + cs.hitByPitch + cs.sacrificeFlies))), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeOnBasePlusSluggingByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG((cs.totalBases * 1.0 / cs.atBats) + ((cs.hits + cs.walks + cs.hitByPitch) * 1.0 / (cs.atBats + cs.walks + cs.hitByPitch + cs.sacrificeFlies))), 0.0) FROM countingStatistics cs")
    Double findSiteWideOnBasePlusSlugging();

    @Query("SELECT COALESCE(AVG(cs.walks * 1.0 / cs.plateAppearances), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeWalkPercentageByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG(cs.walks * 1.0 / cs.plateAppearances), 0.0) FROM countingStatistics cs")
    Double findSiteWideWalkPercentage();

    @Query("SELECT COALESCE(AVG(cs.strikeouts * 1.0 / cs.plateAppearances), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeStrikeoutPercentageByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG(cs.strikeouts * 1.0 / cs.plateAppearances), 0.0) FROM countingStatistics cs")
    Double findSiteWideStrikeoutPercentage();

    // Defensive sabermetric calculation queries
    // each query takes various defensive counting statistics persisted to the user that has been entered
    // and averages them out based on user lifetime on the application, and the entire sites averages (all users counting statistics)
    // Usage of COALESCE to handle null values (i.e. user has never calculated or entered anything or the site has never had entries from users)
    // basic usage of arithmetic to calculate accurate user average and lifetime average from all users counting statistics entered

    @Query("SELECT COALESCE(AVG((cs.putouts + cs.assists) * 1.0 / (cs.putouts + cs.assists + cs.errors)), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeFieldingPercentageByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG((cs.putouts + cs.assists) * 1.0 / (cs.putouts + cs.assists + cs.errors)), 0.0) FROM countingStatistics cs")
    Double findSiteWideFieldingPercentage();

    @Query("SELECT COALESCE(AVG((cs.hitsAllowed + cs.walksAllowed) * 1.0 / cs.inningsPitched), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeWHIPByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG((cs.hitsAllowed + cs.walksAllowed) * 1.0 / cs.inningsPitched), 0.0) FROM countingStatistics cs")
    Double findSiteWideWHIP();

    @Query("SELECT COALESCE(AVG((cs.earnedRunsAllowed * 9) * 1.0 / cs.inningsPitched), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeERAByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG((cs.earnedRunsAllowed * 9) * 1.0 / cs.inningsPitched), 0.0) FROM countingStatistics cs")
    Double findSiteWideERA();

    @Query("SELECT COALESCE(AVG((cs.leagueAverageEra * 1.0) / ((cs.earnedRunsAllowed * 9) / cs.inningsPitched)), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeERAPlusByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG((cs.leagueAverageEra * 1.0) / ((cs.earnedRunsAllowed * 9) / cs.inningsPitched)), 0.0) FROM countingStatistics cs")
    Double findSiteWideERAPlus();

    @Query("SELECT COALESCE(AVG(cs.hitsAllowed * 1.0 / (cs.battersFaced - cs.walksAllowed - cs.defSacrificies - cs.defSacrificeFlies - cs.catchersInterference)), 0.0) FROM countingStatistics cs WHERE cs.user.id = :userId")
    Double findLifetimeOpposingBattingAverageByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(AVG(cs.hitsAllowed * 1.0 / (cs.battersFaced - cs.walksAllowed - cs.defSacrificies - cs.defSacrificeFlies - cs.catchersInterference)), 0.0) FROM countingStatistics cs")
    Double findSiteWideOpposingBattingAverage();

    List<countingStatistics> findByUserId(Long userId);
}