package com.github.mikuza32.simplesabrescorecardapp.Controller;
import com.github.mikuza32.simplesabrescorecardapp.Entities.Users;
import com.github.mikuza32.simplesabrescorecardapp.Entities.countingStatistics;
import com.github.mikuza32.simplesabrescorecardapp.Entities.offensiveSabermetrics;
import com.github.mikuza32.simplesabrescorecardapp.Service.offensiveSabermetricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.github.mikuza32.simplesabrescorecardapp.Repo.usersRepo;
@RestController
@RequestMapping("/api/offensive")
public class offensiveSabermetricsController {

    private final offensiveSabermetricService offensiveSabermetricService;
    private final usersRepo usersRepo;

    //Initializes the service and repository needed to manipulate the counting statistics and ensure persistence for the user and entire site
    @Autowired
    public offensiveSabermetricsController(offensiveSabermetricService offensiveSabermetricService, usersRepo usersRepo) {
        this.offensiveSabermetricService = offensiveSabermetricService;
        this.usersRepo = usersRepo;
    }


    // GET requests are called from the front end to fetch the users lifetime and site wide averages
    // After each sabermetric and the necessary counting statistics are manipulated and fetched then the
    // specific total is logged, using the respective method for each lifetime/sitewide calculation
    // After fetching needed data, the data is returned to the front end and if the total is null to return zero
    @GetMapping("/lifetime/batting-average/{userId}")
    public ResponseEntity<Double> getLifetimeBattingAverage(@PathVariable Long userId) {
        Double value = offensiveSabermetricService.getLifetimeBattingAverage(userId);
        System.out.println("Lifetime Batting Average Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/batting-average")
    public ResponseEntity<Double> getSiteWideBattingAverage() {
        Double value = offensiveSabermetricService.getSiteWideBattingAverage();
        System.out.println("Site Wide Batting Average Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/on-base-percentage/{userId}")
    public ResponseEntity<Double> getLifetimeOnBasePercentage(@PathVariable Long userId) {
        Double value = offensiveSabermetricService.getLifetimeOnBasePercentage(userId);
        System.out.println("Lifetime On Base Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/on-base-percentage")
    public ResponseEntity<Double> getSiteWideOnBasePercentage() {
        Double value = offensiveSabermetricService.getSiteWideOnBasePercentage();
        System.out.println("Site Wide On Base Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/slugging-percentage/{userId}")
    public ResponseEntity<Double> getLifetimeSluggingPercentage(@PathVariable Long userId) {
        Double value = offensiveSabermetricService.getLifetimeSluggingPercentage(userId);
        System.out.println("Lifetime Slugging Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/slugging-percentage")
    public ResponseEntity<Double> getSiteWideSluggingPercentage() {
        Double value = offensiveSabermetricService.getSiteWideSluggingPercentage();
        System.out.println("Site Wide Slugging Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/ops/{userId}")
    public ResponseEntity<Double> getLifetimeOPS(@PathVariable Long userId) {
        Double value = offensiveSabermetricService.getLifetimeOPS(userId);
        System.out.println("Lifetime OPS Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/ops")
    public ResponseEntity<Double> getSiteWideOPS() {
        Double value = offensiveSabermetricService.getSiteWideOPS();
        System.out.println("Site Wide OPS Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/walk-percentage/{userId}")
    public ResponseEntity<Double> getLifetimeWalkPercentage(@PathVariable Long userId) {
        Double value = offensiveSabermetricService.getLifetimeWalkPercentage(userId);
        System.out.println("Lifetime Walk Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/walk-percentage")
    public ResponseEntity<Double> getSiteWideWalkPercentage() {
        Double value = offensiveSabermetricService.getSiteWideWalkPercentage();
        System.out.println("Site Wide Walk Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/strikeout-percentage/{userId}")
    public ResponseEntity<Double> getLifetimeStrikeoutPercentage(@PathVariable Long userId) {
        Double value = offensiveSabermetricService.getLifetimeStrikeoutPercentage(userId);
        System.out.println("Lifetime Strikeout Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/strikeout-percentage")
    public ResponseEntity<Double> getSiteWideStrikeoutPercentage() {
        Double value = offensiveSabermetricService.getSiteWideStrikeoutPercentage();
        System.out.println("Site Wide Strikeout Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @PostMapping("/calculateOffensive/{userId}")
    public ResponseEntity<?> calculateAndSaveOffensiveMetrics(@PathVariable Long userId, @RequestBody countingStatistics stats) { // passes the JSON object and authenticates potential peristed data using userId
        try {
            // Makes sure the users identity (using unique ID) can be fetched so the calculations from the service layer can be called, function, and return new results
            Users user = usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " does not exist"));
            stats.setUser(user);
            // ensures that the data is account bound and is persisted
            offensiveSabermetrics metrics = offensiveSabermetricService.calculateAndSaveOffensiveMetrics(userId, stats);
            metrics.setUsers(user);
            System.out.println("Newly calculated Offensive Sabermetrics: " + metrics);   // logging for successful calculation
            return ResponseEntity.ok(metrics);
        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());                // exception handling used for various error codes I was recieving in the browser console
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error has occured!");
        }
    }


}


