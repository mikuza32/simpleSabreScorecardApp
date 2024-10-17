package com.github.mikuza32.simplesabrescorecardapp.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "defensive_sabermetrics")
public class defensiveSabermetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "fielding_percentage")
    private double fieldingPercentage;

    @Column(name = "walks_hits_innings_pitched")
    private double walkHitsInningsPitched;

    @Column(name = "opposing_batting_average")
    private double opposingBattingAverage;

    @Column(name = "earned_run_average")
    private double earnedRunAverage;

    @Column(name = "earned_run_average_plus")
    private double earnedRunAveragePlus;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;


    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getFieldingPercentage() {
        return fieldingPercentage;
    }

    public void setFieldingPercentage(double fieldingPercentage) {
        this.fieldingPercentage = fieldingPercentage;
    }

    public double getEarnedRunAverage() {
        return earnedRunAverage;
    }

    public void setEarnedRunAverage(double earnedRunAverage) {
        this.earnedRunAverage = earnedRunAverage;
    }

    public double getEarnedRunAveragePlus() {
        return earnedRunAveragePlus;
    }

    public void setEarnedRunAveragePlus(double earnedRunAveragePlus) {
        this.earnedRunAveragePlus = earnedRunAveragePlus;
    }

    public double getWalkHitsInningsPitched() {
        return walkHitsInningsPitched;
    }

    public void setWalkHitsInningsPitched(double walkHitsInningsPitched) {
        this.walkHitsInningsPitched = walkHitsInningsPitched;
    }

    public double getOpposingBattingAverage() {
        return opposingBattingAverage;
    }

    public void setOpposingBattingAverage(double opposingBattingAverage) {
        this.opposingBattingAverage = opposingBattingAverage;
    }

    public defensiveSabermetrics() {
        this.createdAt = LocalDateTime.now();
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
