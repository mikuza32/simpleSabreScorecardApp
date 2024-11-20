package com.github.mikuza32.simplesabrescorecardapp.Service;
import com.github.mikuza32.simplesabrescorecardapp.Entities.Users;
import com.github.mikuza32.simplesabrescorecardapp.Entities.countingStatistics;
import com.github.mikuza32.simplesabrescorecardapp.Entities.offensiveSabermetrics;
import com.github.mikuza32.simplesabrescorecardapp.Repo.countingStatisticsRepository;
import com.github.mikuza32.simplesabrescorecardapp.Repo.offensiveSabermetricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.mikuza32.simplesabrescorecardapp.Repo.usersRepo;

@Service
public class offensiveSabermetricService {

    private final countingStatisticsRepository countingStatisticsRepository;
    private final offensiveSabermetricRepository offensiveSabermetricRepository;

    private final usersRepo usersRepo;


    // Initializes the needed repositories in order to perform averaging, CRUD, and persistence so the user can see all calculated sabermetrics
    @Autowired
    public offensiveSabermetricService(countingStatisticsRepository countingStatisticsRepository,
                                       offensiveSabermetricRepository offensiveSabermetricRepository, usersRepo usersRepo) {
        this.countingStatisticsRepository = countingStatisticsRepository;
        this.offensiveSabermetricRepository = offensiveSabermetricRepository;
        this.usersRepo = usersRepo;
    }


    // Methods to call the countingStatisticsRepository queries to average the counting statistics
    // provided by the user in the UI, using the users unique ID to ensure correctness and authentication
    // to perform various operations
    public Double getLifetimeBattingAverage(Long userId) {
        return countingStatisticsRepository.findLifetimeBattingAverageByUser(userId);
    }

    public Double getSiteWideBattingAverage() {
        return countingStatisticsRepository.findSiteWideBattingAverage();
    }

    public Double getLifetimeOnBasePercentage(Long userId) {
        return countingStatisticsRepository.findLifetimeOnBasePercentageByUser(userId);
    }

    public Double getSiteWideOnBasePercentage() {
        return countingStatisticsRepository.findSiteWideOnBasePercentage();
    }

    public Double getLifetimeSluggingPercentage(Long userId) {
        return countingStatisticsRepository.findLifetimeSluggingPercentageByUser(userId);
    }

    public Double getSiteWideSluggingPercentage() {
        return countingStatisticsRepository.findSiteWideSluggingPercentage();
    }

    public Double getLifetimeOPS(Long userId) {
        return countingStatisticsRepository.findLifetimeOnBasePlusSluggingByUser(userId);
    }

    public Double getSiteWideOPS() {
        return countingStatisticsRepository.findSiteWideOnBasePlusSlugging();
    }

    public Double getLifetimeWalkPercentage(Long userId) {
        return countingStatisticsRepository.findLifetimeWalkPercentageByUser(userId);
    }

    public Double getSiteWideWalkPercentage() {
        return countingStatisticsRepository.findSiteWideWalkPercentage();
    }

    public Double getLifetimeStrikeoutPercentage(Long userId) {
        return countingStatisticsRepository.findLifetimeStrikeoutPercentageByUser(userId);
    }

    public Double getSiteWideStrikeoutPercentage() {
        return countingStatisticsRepository.findSiteWideStrikeoutPercentage();
    }

    public offensiveSabermetrics calculateAndSaveOffensiveMetrics(Long userId, countingStatistics stats) {
        // Fetches the user ID from the repository, then throws an exception if a user with the particular id does not exist
        Users user = usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + "could not be found!"));

        // persists the counting statistics entered so that they can be queried to display user lifetime averages and site averages
        stats.setUser(user);
        countingStatisticsRepository.save(stats);

        // Math to manipulate the provided offensive sabermetrics from the user, then set the calculations to the user account
        offensiveSabermetrics metrics = new offensiveSabermetrics();
        metrics.setBattingAverage(stats.getAtBats() == 0 ? 0 : (double) stats.getHits() / stats.getAtBats());
        metrics.setOnBasePercentage(stats.getAtBats() + stats.getWalks() + stats.getHitByPitch() + stats.getSacrificeFlies() == 0 ? 0 : (double) (stats.getHits() + stats.getWalks() + stats.getHitByPitch()) / (stats.getAtBats() + stats.getWalks() + stats.getHitByPitch() + stats.getSacrificeFlies()));
        metrics.setSluggingPercentage(stats.getAtBats() == 0 ? 0 : (double) stats.getTotalBases() / stats.getAtBats());
        metrics.setOnBasePlusSlugging(metrics.getOnBasePercentage() + metrics.getSluggingPercentage());
        metrics.setWalkPercentage(stats.getPlateAppearances() == 0 ? 0 : (double) stats.getWalks() / stats.getPlateAppearances());
        metrics.setStrikeoutPercentage(stats.getPlateAppearances() == 0 ? 0 : (double) stats.getStrikeouts() / stats.getPlateAppearances());
        metrics.setUsers(user);

        // Persistence of the counting statistics that were manipulated and are displayed on the UI
        return offensiveSabermetricRepository.save(metrics);
    }

}




