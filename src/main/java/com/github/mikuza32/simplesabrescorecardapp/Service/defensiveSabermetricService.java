package com.github.mikuza32.simplesabrescorecardapp.Service;
import com.github.mikuza32.simplesabrescorecardapp.Entities.Users;
import com.github.mikuza32.simplesabrescorecardapp.Entities.countingStatistics;
import com.github.mikuza32.simplesabrescorecardapp.Entities.defensiveSabermetrics;
import com.github.mikuza32.simplesabrescorecardapp.Repo.countingStatisticsRepository;
import com.github.mikuza32.simplesabrescorecardapp.Repo.defensiveSabermetricRepo;
import com.github.mikuza32.simplesabrescorecardapp.Repo.usersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class defensiveSabermetricService {

    private final countingStatisticsRepository countingStatisticsRepository;
    private final defensiveSabermetricRepo defensiveSabermetricRepo;

    private final usersRepo usersRepo;

    // Initializes the needed repositories in order to perform averaging, CRUD, and persistence so the user can see all calculated sabermetrics
    @Autowired
    public defensiveSabermetricService(countingStatisticsRepository countingStatisticsRepository,
                                       defensiveSabermetricRepo defensiveSabermetricRepo, usersRepo usersRepo) {
        this.countingStatisticsRepository = countingStatisticsRepository;
        this.defensiveSabermetricRepo = defensiveSabermetricRepo;
        this.usersRepo = usersRepo;
    }


    // Methods to call the countingStatisticsRepository queries to average the counting statistics
    // provided by the user in the UI, using the users unique ID to ensure correctness and authentication
    // to perform various operations
    public Double getLifetimeFieldingPercentage(Long userId) {
        return countingStatisticsRepository.findLifetimeFieldingPercentageByUser(userId);
    }

    public Double getSiteWideFieldingPercentage() {
        return countingStatisticsRepository.findSiteWideFieldingPercentage();
    }

    public Double getLifetimeWHIP(Long userId) {
        return countingStatisticsRepository.findLifetimeWHIPByUser(userId);
    }

    public Double getSiteWideWHIP() {
        return countingStatisticsRepository.findSiteWideWHIP();
    }

    public Double getLifetimeERA(Long userId) {
        return countingStatisticsRepository.findLifetimeERAByUser(userId);
    }

    public Double getSiteWideERA() {
        return countingStatisticsRepository.findSiteWideERA();
    }

    public Double getLifetimeERAPlus(Long userId) {
        return countingStatisticsRepository.findLifetimeERAPlusByUser(userId);
    }

    public Double getSiteWideERAPlus() {
        return countingStatisticsRepository.findSiteWideERAPlus();
    }

    public Double getLifetimeOpposingBattingAverage(Long userId) {
        return countingStatisticsRepository.findLifetimeOpposingBattingAverageByUser(userId);
    }

    public Double getSiteWideOpposingBattingAverage() {
        return countingStatisticsRepository.findSiteWideOpposingBattingAverage();
    }


    public defensiveSabermetrics calculateAndSaveDefensiveMetrics(Long userId, countingStatistics stats) {
        // Fetches the user ID from the repository, then throws an exception if a user with the particular id does not exist
        Users user = usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " does not exist"));

        // persists the counting statistics entered so that they can be queried to display user lifetime averages and site averages
        stats.setUser(user);
        countingStatisticsRepository.save(stats);

        // Math to manipulate the provided offensive sabermetrics from the user, then set the calculations to the user account
        double fieldingPercentage = (stats.getPutouts() + stats.getAssists()) == 0 ? 0 : (double) (stats.getPutouts() + stats.getAssists()) / (stats.getPutouts() + stats.getAssists() + stats.getErrors());

        double earnedRunAverage = stats.getInningsPitched() == 0 ? 0 :
                (double) (stats.getEarnedRunsAllowed() * 9) / stats.getInningsPitched();

        double earnedRunAveragePlus = earnedRunAverage == 0 ? 0 :
                (double) stats.getLeagueAverageEarnedRunAverage() / earnedRunAverage;

        double walkHitsInningsPitched = stats.getInningsPitched() == 0 ? 0 :
                (double) (stats.getHitsAllowed() + stats.getWalksAllowed()) / stats.getInningsPitched();

        double opposingBattingAverage = (stats.getBattersFaced() - stats.getWalksAllowed() -
                stats.getDefSacrificies() - stats.getDefSacrificeFlies() - stats.getCatchersInterference()) == 0 ? 0 :
                (double) stats.getHitsAllowed() /
                        (stats.getBattersFaced() - stats.getWalksAllowed() -
                                stats.getDefSacrificies() - stats.getDefSacrificeFlies() - stats.getCatchersInterference());


        // calls each sabermetric calculation to be set to the user
        defensiveSabermetrics metrics = new defensiveSabermetrics();
        metrics.setFieldingPercentage(fieldingPercentage);
        metrics.setEarnedRunAverage(earnedRunAverage);
        metrics.setEarnedRunAveragePlus(earnedRunAveragePlus);
        metrics.setWalkHitsInningsPitched(walkHitsInningsPitched);
        metrics.setOpposingBattingAverage(opposingBattingAverage);
        metrics.setUsers(user);

        // Persistence of the counting statistics that were manipulated and are displayed on the UI
        return defensiveSabermetricRepo.save(metrics);
    }
}



