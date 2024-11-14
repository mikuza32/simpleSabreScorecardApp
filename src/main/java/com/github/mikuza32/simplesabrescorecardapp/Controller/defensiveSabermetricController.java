package com.github.mikuza32.simplesabrescorecardapp.Controller;

import com.github.mikuza32.simplesabrescorecardapp.Entities.Users;
import com.github.mikuza32.simplesabrescorecardapp.Entities.countingStatistics;
import com.github.mikuza32.simplesabrescorecardapp.Entities.defensiveSabermetrics;
import com.github.mikuza32.simplesabrescorecardapp.Service.defensiveSabermetricService;
import com.github.mikuza32.simplesabrescorecardapp.Repo.usersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/defensive")
public class defensiveSabermetricController {

    private final defensiveSabermetricService defensiveSabermetricService;
    private final usersRepo usersRepo;

    //Initializes the service and repository needed to manipulate the counting statistics and ensure persistence for the user and entire site
    @Autowired
    public defensiveSabermetricController(defensiveSabermetricService defensiveSabermetricService, usersRepo usersRepo) {
        this.defensiveSabermetricService = defensiveSabermetricService;
        this.usersRepo = usersRepo;
    }

    // GET requests are called from the front end to fetch the users lifetime and site wide averages
    // After each sabermetric and the necessary counting statistics are manipulated and fetched then the
    // specific total is logged, using the respective method for each lifetime/sitewide calculation
    // After fetching needed data, the data is returned to the front end and if the total is null to return zero
    @GetMapping("/lifetime/fielding-percentage/{userId}")
    public ResponseEntity<Double> getLifetimeFieldingPercentage(@PathVariable Long userId) {
        Double value = defensiveSabermetricService.getLifetimeFieldingPercentage(userId);
        System.out.println("Lifetime Fielding Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/fielding-percentage")
    public ResponseEntity<Double> getSiteWideFieldingPercentage() {
        Double value = defensiveSabermetricService.getSiteWideFieldingPercentage();
        System.out.println("Site Wide Fielding Percentage Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/whip/{userId}")
    public ResponseEntity<Double> getLifetimeWHIP(@PathVariable Long userId) {
        Double value = defensiveSabermetricService.getLifetimeWHIP(userId);
        System.out.println("Lifetime WHIP Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/whip")
    public ResponseEntity<Double> getSiteWideWHIP() {
        Double value = defensiveSabermetricService.getSiteWideWHIP();
        System.out.println("Site Wide WHIP Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/era/{userId}")
    public ResponseEntity<Double> getLifetimeERA(@PathVariable Long userId) {
        Double value = defensiveSabermetricService.getLifetimeERA(userId);
        System.out.println("Lifetime ERA Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/era")
    public ResponseEntity<Double> getSiteWideERA() {
        Double value = defensiveSabermetricService.getSiteWideERA();
        System.out.println("Site Wide ERA Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/era-plus/{userId}")
    public ResponseEntity<Double> getLifetimeERAPlus(@PathVariable Long userId) {
        Double value = defensiveSabermetricService.getLifetimeERAPlus(userId);
        System.out.println("Lifetime ERA Plus Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/era-plus")
    public ResponseEntity<Double> getSiteWideERAPlus() {
        Double value = defensiveSabermetricService.getSiteWideERAPlus();
        System.out.println("Site Wide ERA Plus Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/lifetime/opposing-batting-average/{userId}")
    public ResponseEntity<Double> getLifetimeOpposingBattingAverage(@PathVariable Long userId) {
        Double value = defensiveSabermetricService.getLifetimeOpposingBattingAverage(userId);
        System.out.println("Lifetime Opposing Batting Average Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @GetMapping("/sitewide/opposing-batting-average")
    public ResponseEntity<Double> getSiteWideOpposingBattingAverage() {
        Double value = defensiveSabermetricService.getSiteWideOpposingBattingAverage();
        System.out.println("Site Wide Opposing Batting Average Data: " + value);
        return ResponseEntity.ok(value != null ? value : 0.0);
    }

    @PostMapping("/calculateDefensive/{userId}")
    public ResponseEntity<?> calculateAndSaveDefensiveMetrics(@PathVariable Long userId, @RequestBody countingStatistics stats) {  // passes the JSON object and authenticates potential peristed data using userId
        try {
            // Makes sure the users identity (using unique ID) can be fetched so the calculations from the service layer can be called, function, and return new results
            Users user = usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " does not exist"));
            stats.setUser(user);

            // ensures that the data is account bound and is persisted
            defensiveSabermetrics metrics = defensiveSabermetricService.calculateAndSaveDefensiveMetrics(userId, stats);
            metrics.setUsers(user);
            System.out.println("Newly Calculated Defensive Sabermetrics: " + metrics); // logging for successful calculation
            return ResponseEntity.ok(metrics);
        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());          // exception handling used for various error codes I was recieving in the browser console
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error has occured!");
        }
    }
}



