package com.github.mikuza32.simplesabrescorecardapp.Service;
import com.github.mikuza32.simplesabrescorecardapp.Entities.offensiveSabermetrics;
import com.github.mikuza32.simplesabrescorecardapp.Repo.offensiveSabermetricRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service                                       // service class that provides the math behind each offensive sabermetric calculation
public class offensiveSabermetricService {
    @Autowired
    private offensiveSabermetricRepository repository;   // calls interface to provide crud operations

    public List<offensiveSabermetrics> getAllSabermetrics() {        //lists or shows all sabermetrics calculated/retrieves all sabermetrics from db
        return repository.findAll();
    }

    public offensiveSabermetrics addSabermetric(offensiveSabermetrics sabermetrics) {         // basic service class to perform crud operations within the database on the website
        return repository.save(sabermetrics);
    }

    public double calcBattingAverage (int hits, int atBats) { //method to calculate battingAverage
        if (atBats == 0) return 0;                // if the user says that they have had 0 atBats, then their BA is .000
        return (double) hits / atBats;
    }

    public double calcOnBasePercentage(int hits, int walks, int atBats, int sacrificeFlies, int hitByPitch) {      //method to calculate onBasePercentage
        int denom = atBats + hitByPitch + walks + sacrificeFlies;                  //creates denominator int to simplify division
        if (denom == 0) return 0;                                                 //if the denominator created is 0, return 0 back to the user
        return (double) (hits + walks + hitByPitch) / denom;
    }


    public double calcWalkPercentage(int walks, int plateAppearances) {                //calculates walk percentage
        if (plateAppearances == 0) return 0;                                          // if the user has 0 plate appearances then they has a .000 walk percentage
        return (double) walks / plateAppearances;
    }


    public double calcStrikeoutPercentage(int strikeouts, int plateAppearances) {         // calculates strikeout percentage
        if (plateAppearances == 0) return 0;                                              // if the user has 0 plate appearances then they have a .000 strikeout percentage
        return (double) strikeouts / plateAppearances;
    }
                                                                                                                //all calculations return double as they are meant to be calculated as decimals
    public double calcSluggingPercentage(int totalBases, int atBats) {                     // calculates slugging percentage
        if (atBats == 0) return 0;                                                         // if the user has 0 plate appearances then they have a .000 slugging percentage
        return (double) totalBases / atBats;
    }

    public double calcOnBasePlusSlugging(double onBasePercentage, double sluggingPercentage) {
        return onBasePercentage + sluggingPercentage;                                                  //returns as double since the calculation uses two doubles (results) of two separate sabermetrics
    }

}
