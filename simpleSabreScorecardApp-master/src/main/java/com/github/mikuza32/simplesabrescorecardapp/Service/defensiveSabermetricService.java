package com.github.mikuza32.simplesabrescorecardapp.Service;
import com.github.mikuza32.simplesabrescorecardapp.Entities.defensiveSabermetrics;
import com.github.mikuza32.simplesabrescorecardapp.Repo.defensiveSabermetricRepo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
@Service                                        // service class that provides the math behind each defensive sabermetric calculation
public class defensiveSabermetricService {
    @Autowired
    private defensiveSabermetricRepo repo;       // calls interface to provide crud operations

    public List<defensiveSabermetrics> getAllDefSabermetrics() {             //lists or shows all sabermetrics calculated/retrieves all sabermetrics from db
        return repo.findAll();
    }

    public defensiveSabermetrics addDefSabermetric(defensiveSabermetrics defensiveSabermetrics) {          // basic service class to perform crud operations within the database on the website
        return repo.save(defensiveSabermetrics);
    }

    public double calcFieldingPercentage (int assists, int putouts, int errors) {
        return (double) (putouts + assists) / (putouts + assists + errors);
    }

    public double calcEarnedRunAverage(int earnedRunsAllowed, int inningsPitched) {
        return (double) (earnedRunsAllowed * 9) / (inningsPitched);
    }

    public double calcEarnedRunAveragePlus(int leagueAverageERA, double earnedRunAverage) {
        return (double) leagueAverageERA / earnedRunAverage;
    }                                                                                                      // calculations follow same rules and procedure as offensiveServices, in which are double for accurate decimal response

    public double calcWalkHitsInningsPitched(int hitsAllowed, int walksAllowed, int inningsPitched) {
        return (double) (hitsAllowed + walksAllowed) / inningsPitched;
    }

    public double calcOpposingBattingAverage(int hitsAllowed, int battersFaced, int walksAllowed, int hitBatters, int defSacrifices, int defSacrificeFlies, int catchersInterference) {
        return (double) (hitsAllowed) / (battersFaced - walksAllowed - hitBatters - defSacrifices - defSacrificeFlies - catchersInterference);
    }



}
