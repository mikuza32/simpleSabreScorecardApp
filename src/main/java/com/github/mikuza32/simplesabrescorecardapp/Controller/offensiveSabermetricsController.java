package com.github.mikuza32.simplesabrescorecardapp.Controller;

import org.springframework.web.bind.annotation.*;
import com.github.mikuza32.simplesabrescorecardapp.Service.offensiveSabermetricService;

@RestController                   // Makes this class a REST controller that will handle web requests that are called from the frontend
@RequestMapping("/api/offensiveSabermetrics")  // this is the request URl for the offensive sabermetric APIs
@CrossOrigin (origins = "*") //adjusts CORS settings since the react app and spring boot are on separate ports (still not running as of 10/17 needs to be fixed)
public class offensiveSabermetricsController {

    private final offensiveSabermetricService offensiveSabermetricService;

    public offensiveSabermetricsController(offensiveSabermetricService offensiveSabermetricService) {
        this.offensiveSabermetricService = offensiveSabermetricService;                                //incorporates the offensive sabermetric service methods so that the
                                                                                                       // API can provide the calculations for the respective formulas for each
    }

    @PostMapping("/battingAverage")
    public double pullBattingAverage(@RequestParam int hits, @RequestParam int atBats) {
        return offensiveSabermetricService.calcBattingAverage(hits, atBats);
    }
    @PostMapping("/onBasePercentage")
    public double pullOnBasePercentage(@RequestParam int walks, @RequestParam int hits, @RequestParam int hitByPitch, @RequestParam int atBats, @RequestParam int sacrificeFlies) {
        return offensiveSabermetricService.calcOnBasePercentage(hits, walks, atBats, hitByPitch, sacrificeFlies);
    }

    @PostMapping("/walkPercentage")
    public double pullWalkPercentage(@RequestParam int walks, @RequestParam int plateAppearances) {
        return offensiveSabermetricService.calcWalkPercentage(walks, plateAppearances);
    }                                                                                            //post endpoint for calculating all offensive sabermetrics with the parameters
                                                                                                            // needed to complete the calculation, then returns the actual
                                                                                                 //calculation back to the frontend to be displayed
    @PostMapping("/strikeoutPercentage")
    public double pullStrikeoutPercentage(@RequestParam int strikeouts, @RequestParam int plateAppearances) {
        return offensiveSabermetricService.calcStrikeoutPercentage(strikeouts, plateAppearances);
    }

    @PostMapping("/onBasePlusSlugging")
    public double pullOnBasePlusSlugging(@RequestParam double onBasePercentage, @RequestParam double sluggingPercentage) {
        return offensiveSabermetricService.calcOnBasePlusSlugging(onBasePercentage, sluggingPercentage);
    }

    @PostMapping("/sluggingPercentage")
    public double pullSluggingPercentage(@RequestParam int totalBases, @RequestParam int atBats) {
        return offensiveSabermetricService.calcSluggingPercentage(totalBases, atBats);
    }


}
