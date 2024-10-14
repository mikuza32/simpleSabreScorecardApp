package com.github.mikuza32.simplesabrescorecardapp.Service;
import com.github.mikuza32.simplesabrescorecardapp.Entities.offensiveSabermetrics;
import com.github.mikuza32.simplesabrescorecardapp.Repo.offensiveSabermetricRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class offensiveSabermetricService {
    @Autowired
    private offensiveSabermetricRepository repository;

    public List<offensiveSabermetrics> getAllSabermetrics() {        //lists or shows all sabermetrics calculated
        return repository.findAll();
    }

    public offensiveSabermetrics addSabermetric(offensiveSabermetrics sabermetrics) {         // basic service class to perform crud operations within the database on the website
        return repository.save(sabermetrics);
    }

}
