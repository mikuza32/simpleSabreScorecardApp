package com.github.mikuza32.simplesabrescorecardapp.Controller;


import org.springframework.web.bind.annotation.*;
import com.github.mikuza32.simplesabrescorecardapp.Service.defensiveSabermetricService;
@RestController                                    // Makes this class a REST controller that will handle web requests that are called from the frontend
@RequestMapping("/api/defensiveSabermetrics")    // this is the request URl for the defensive sabermetric APIs
@CrossOrigin(origins = "*")                         //adjusts CORS settings since the react app and spring boot are on separate ports (still not running as of 10/17 needs to be fixed)
public class defensiveSabermetricController {

    private final defensiveSabermetricService defensiveSabermetricService;

    public defensiveSabermetricController(defensiveSabermetricService defensiveSabermetricService) {
        this.defensiveSabermetricService = defensiveSabermetricService;
    }
                                                                                                          // incorporates the offensive sabermetric service methods so that the
                                                                                                          // API can provide the calculations for the respective formulas for each

    @PostMapping("/fieldingPercentage")
    public double pullFieldingPercentage(@RequestParam int assists, @RequestParam int putouts, @RequestParam int errors) {
        return defensiveSabermetricService.calcFieldingPercentage(assists, putouts, errors);
    }

    @PostMapping("/earnedRunAverage")
    public double pullEarnedRunAverage(@RequestParam int earnedRunsAllowed, @RequestParam int inningsPitched) {
        return defensiveSabermetricService.calcEarnedRunAverage(earnedRunsAllowed, inningsPitched);
    }
                                                                                                                //post endpoint for calculating all offensive sabermetrics with the parameters
                                                                                                               // needed to complete the calculation, then returns the actual
                                                                                                               //calculation back to the frontend to be displayed

    @PostMapping("/earnedRunAveragePlus")
    public double pullEarnedRunAveragePlus(@RequestParam int leagueAverageERA, @RequestParam double earnedRunAverage) {
        return defensiveSabermetricService.calcEarnedRunAveragePlus(leagueAverageERA, earnedRunAverage);
    }

    @PostMapping("/walkHitsInningsPitched")
    public double pullWalkHitsInningsPitched(@RequestParam int hitsAllowed, int walksAllowed, int inningsPitched) {
        return defensiveSabermetricService.calcWalkHitsInningsPitched(hitsAllowed, walksAllowed, inningsPitched);
    }

    @PostMapping("/opposingBattingAverage")
    public double pullOpposingBattingAverage(@RequestParam int hitsAllowed, @RequestParam int battersFaced, @RequestParam int walksAllowed, @RequestParam int hitBatters, @RequestParam int defSacrifices, @RequestParam int defSacrificeFlies, @RequestParam int catchersInterference) {
        return defensiveSabermetricService.calcOpposingBattingAverage(hitsAllowed, battersFaced, walksAllowed, hitBatters, defSacrifices, defSacrificeFlies, catchersInterference);
    }

}
