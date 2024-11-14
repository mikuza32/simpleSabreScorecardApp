package com.github.mikuza32.simplesabrescorecardapp.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "counting_statistics")
public class countingStatistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)                    // ID and user_id columns
    private Users user;

    private int hits;
    private int atBats;
    private int sacrificeFlies;
    private int totalBases;
    private int plateAppearances;
    private int walks;
    private int hitByPitch;
    private int strikeouts;
    private double inningsPitched;                              //creates all counting statistic entities to be initialized, manipulated, and queried
    private int earnedRunsAllowed;
    private int hitsAllowed;
    private int defSacrificies;
    private int defSacrificeFlies;
    private int errors;
    private double leagueAverageEra;
    private int putouts;
    private int assists;
    private int battersFaced;
    private int walksAllowed;
    private int catchersInterference;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public int getAtBats() {
        return atBats;
    }

    public void setAtBats(int atBats) {
        this.atBats = atBats;
    }

    public int getSacrificeFlies() {
        return sacrificeFlies;
    }

    public void setSacrificeFlies(int sacrificeFlies) {
        this.sacrificeFlies = sacrificeFlies;
    }

    public int getTotalBases() {
        return totalBases;
    }

    public void setTotalBases(int totalBases) {
        this.totalBases = totalBases;
    }                                                                                                 // setters and getters for counting statistics

    public int getPlateAppearances() {
        return plateAppearances;
    }

    public void setPlateAppearances(int plateAppearances) {
        this.plateAppearances = plateAppearances;
    }

    public int getWalks() {
        return walks;
    }

    public void setWalks(int walks) {
        this.walks = walks;
    }

    public int getHitByPitch() {
        return hitByPitch;
    }

    public void setHitByPitch(int hitByPitch) {
        this.hitByPitch = hitByPitch;
    }

    public int getStrikeouts() {
        return strikeouts;
    }

    public void setStrikeouts(int strikeouts) {
        this.strikeouts = strikeouts;
    }

    public double getInningsPitched() {
        return inningsPitched;
    }

    public void setInningsPitched(double inningsPitched) {
        this.inningsPitched = inningsPitched;
    }

    public int getEarnedRunsAllowed() {
        return earnedRunsAllowed;
    }

    public void setEarnedRunsAllowed(int earnedRunsAllowed) {
        this.earnedRunsAllowed = earnedRunsAllowed;
    }

    public int getHitsAllowed() {
        return hitsAllowed;
    }

    public void setHitsAllowed(int hitsAllowed) {
        this.hitsAllowed = hitsAllowed;
    }

    public int getDefSacrificies() {
        return defSacrificies;
    }

    public void setDefSacrificies(int defSacrificies) {
        this.defSacrificies = defSacrificies;
    }

    public int getDefSacrificeFlies() {
        return defSacrificeFlies;
    }

    public void setDefSacrificeFlies(int defSacrificeFlies) {
        this.defSacrificeFlies = defSacrificeFlies;
    }

    public int getErrors() {
        return errors;
    }

    public void setErrors(int errors) {
        this.errors = errors;
    }

    public double getLeagueAverageEarnedRunAverage() {
        return leagueAverageEra;
    }

    public void setLeagueAverageEarnedRunAverage(double leagueAverageEra) {
        this.leagueAverageEra = leagueAverageEra;
    }

    public int getPutouts() {
        return putouts;
    }

    public void setPutouts(int putouts) {
        this.putouts = putouts;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getBattersFaced() {
        return battersFaced;
    }

    public void setBattersFaced(int battersFaced) {
        this.battersFaced = battersFaced;
    }

    public int getWalksAllowed() {
        return walksAllowed;
    }

    public void setWalksAllowed(int walksAllowed) {
        this.walksAllowed = walksAllowed;
    }

    public int getCatchersInterference() {
        return catchersInterference;
    }

    public void setCatchersInterference(int catchersInterference) {
        this.catchersInterference = catchersInterference;
    }
}




