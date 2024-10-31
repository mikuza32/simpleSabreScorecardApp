package com.github.mikuza32.simplesabrescorecardapp.Controller;
import org.springframework.web.bind.annotation.*;
import com.github.mikuza32.simplesabrescorecardapp.Service.defensiveSabermetricService;
import java.util.Map;

@RestController // Makes this class a REST controller that will handle web requests that are called from the frontend
@RequestMapping("/api/defensiveSabermetrics") // This is the request URL for the defensive sabermetric APIs
public class defensiveSabermetricController {

    private final defensiveSabermetricService defensiveSabermetricService;

    public defensiveSabermetricController(defensiveSabermetricService defensiveSabermetricService) {
        this.defensiveSabermetricService = defensiveSabermetricService; // Incorporates the defensive sabermetric service methods so that the API can provide the calculations for the respective formulas for each metric
    }

    // Refactored the API POST requests by leaving the map URLs the same, but used a different annotation. @RequestBody is able to take the JSON Object
    // and manipulate the key and integer, set the default value to 0 if there is no entry (not possible) and if the user does not input an int and sets it to null
    // Then is able to call the service method responsible and manipulate the respective counting statistics to return back to the UI for the user

    @PostMapping("/fieldingPercentage")
    public double pullFieldingPercentage(@RequestBody Map<String, Integer> requestBody) {
        int assists = requestBody.getOrDefault("assists", 0);
        int putouts = requestBody.getOrDefault("putouts", 0);
        int errors = requestBody.getOrDefault("errors", 0);
        return defensiveSabermetricService.calcFieldingPercentage(assists, putouts, errors);
    }

    @PostMapping("/earnedRunAverage")
    public double pullEarnedRunAverage(@RequestBody Map<String, Integer> requestBody) {
        int earnedRunsAllowed = requestBody.getOrDefault("earnedRunsAllowed", 0);
        int inningsPitched = requestBody.getOrDefault("inningsPitched", 0);
        return defensiveSabermetricService.calcEarnedRunAverage(earnedRunsAllowed, inningsPitched);
    }

    @PostMapping("/earnedRunAveragePlus")
    public double pullEarnedRunAveragePlus(@RequestBody Map<String, Double> requestBody) {
        int leagueAverageERA = requestBody.getOrDefault("leagueAverageERA", (double) 0).intValue();
        double earnedRunAverage = requestBody.getOrDefault("earnedRunAverage", 0.0);
        return defensiveSabermetricService.calcEarnedRunAveragePlus(leagueAverageERA, earnedRunAverage);
    }

    @PostMapping("/walkHitsInningsPitched")
    public double pullWalkHitsInningsPitched(@RequestBody Map<String, Integer> requestBody) {
        int hitsAllowed = requestBody.getOrDefault("hitsAllowed", 0);
        int walksAllowed = requestBody.getOrDefault("walksAllowed", 0);
        int inningsPitched = requestBody.getOrDefault("inningsPitched", 0);
        return defensiveSabermetricService.calcWalkHitsInningsPitched(hitsAllowed, walksAllowed, inningsPitched);
    }

    @PostMapping("/opposingBattingAverage")
    public double pullOpposingBattingAverage(@RequestBody Map<String, Integer> requestBody) {
        int hitsAllowed = requestBody.getOrDefault("hitsAllowed", 0);
        int battersFaced = requestBody.getOrDefault("battersFaced", 0);
        int walksAllowed = requestBody.getOrDefault("walksAllowed", 0);
        int hitBatters = requestBody.getOrDefault("hitBatters", 0);
        int defSacrifices = requestBody.getOrDefault("defSacrifices", 0);
        int defSacrificeFlies = requestBody.getOrDefault("defSacrificeFlies", 0);
        int catchersInterference = requestBody.getOrDefault("catchersInterference", 0);
        return defensiveSabermetricService.calcOpposingBattingAverage(hitsAllowed, battersFaced, walksAllowed, hitBatters, defSacrifices, defSacrificeFlies, catchersInterference
        );
    }
}

