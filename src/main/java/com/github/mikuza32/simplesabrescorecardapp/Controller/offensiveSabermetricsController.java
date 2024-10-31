package com.github.mikuza32.simplesabrescorecardapp.Controller;

import org.springframework.web.bind.annotation.*;
import com.github.mikuza32.simplesabrescorecardapp.Service.offensiveSabermetricService;

import java.util.Map;

@RestController                   // Makes this class a REST controller that will handle web requests that are called from the frontend
@RequestMapping("/api/offensiveSabermetrics")  // This is the request URL for the offensive sabermetric APIs
public class offensiveSabermetricsController {

    private final offensiveSabermetricService offensiveSabermetricService;

    public offensiveSabermetricsController(offensiveSabermetricService offensiveSabermetricService) {
        this.offensiveSabermetricService = offensiveSabermetricService; // Incorporates the offensive sabermetric service methods so that the API can provide the calculations for the respective formulas for each
    }



    // Refactored the API POST requests by leaving the map URLs the same, but used a different annotation. @RequestBody is able to take the JSON Object
    // and manipulate the key and integer, set the default value to 0 if there is no entry (not possible) and if the user does not input an int and sets it to null
    // Then is able to call the service method responsible and manipulate the respective counting statistics to return back to the UI for the user

    @PostMapping("/battingAverage")
    public double pullBattingAverage(@RequestBody Map<String, Integer> requestBody) {
        int hits = requestBody.getOrDefault("hits", 0);
        int atBats = requestBody.getOrDefault("atBats", 0);
        return offensiveSabermetricService.calcBattingAverage(hits, atBats);
    }

    @PostMapping("/onBasePercentage")
    public double pullOnBasePercentage(@RequestBody Map<String, Integer> requestBody) {
        int hits = requestBody.getOrDefault("hits", 0);
        int atBats = requestBody.getOrDefault("atBats", 0);
        int walks = requestBody.getOrDefault("walks", 0);
        int hitByPitch = requestBody.getOrDefault("hitByPitch", 0);
        int sacrificeFlies = requestBody.getOrDefault("sacrificeFlies", 0);
        return offensiveSabermetricService.calcOnBasePercentage(hits, walks, atBats, sacrificeFlies, hitByPitch);
    }

    @PostMapping("/walkPercentage")
    public double pullWalkPercentage(@RequestBody Map<String, Integer> requestBody) {
        int walks = requestBody.getOrDefault("walks", 0);
        int plateAppearances = requestBody.getOrDefault("plateAppearances", 0);
        return offensiveSabermetricService.calcWalkPercentage(walks, plateAppearances);
    }

    @PostMapping("/strikeoutPercentage")
    public double pullStrikeoutPercentage(@RequestBody Map<String, Integer> requestBody) {
        int strikeouts = requestBody.getOrDefault("strikeouts", 0);
        int plateAppearances = requestBody.getOrDefault("plateAppearances", 0);
        return offensiveSabermetricService.calcStrikeoutPercentage(strikeouts, plateAppearances);
    }

    @PostMapping("/onBasePlusSlugging")
    public double pullOnBasePlusSlugging(@RequestBody Map<String, Double> requestBody) {
        double onBasePercentage = requestBody.getOrDefault("onBasePercentage", 0.0);
        double sluggingPercentage = requestBody.getOrDefault("sluggingPercentage", 0.0);
        return offensiveSabermetricService.calcOnBasePlusSlugging(onBasePercentage, sluggingPercentage);
    }

    @PostMapping("/sluggingPercentage")
    public double pullSluggingPercentage(@RequestBody Map<String, Integer> requestBody) {
        int totalBases = requestBody.getOrDefault("totalBases", 0);
        int atBats = requestBody.getOrDefault("atBats", 0);
        return offensiveSabermetricService.calcSluggingPercentage(totalBases, atBats);
    }
}

