package com.github.mikuza32.simplesabrescorecardapp.Entities;
import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name="offensive_sabermetrics")
public class offensiveSabermetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name= "batting_average")
    private double battingAverage;

    @Column(name= "on_base_percentage")
    private double onBasePercentage;

    @Column(name= "slugging_percentage")                         // offensiveSabermetrics entity created with respective table and columns within the table
    private double sluggingPercentage;

    @Column(name= "on_base_plus_slugging")
    private double onBasePlusSlugging;

    @Column(name= "walk_percentage")
    private double walkPercentage;

    @Column(name = "strikeout_percentage")
    private double strikeoutPercentage;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;                                           // connects users to their unique sabermetrics as many users have their own calculations

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getBattingAverage() {
        return battingAverage;
    }



    public void setBattingAverage(double battingAverage) {
        this.battingAverage = battingAverage;
    }

    public double getOnBasePercentage() {
        return onBasePercentage;
    }

    public void setOnBasePercentage(double onBasePercentage) {        // setters and getters for each column
        this.onBasePercentage = onBasePercentage;
    }

    public double getSluggingPercentage() {
        return sluggingPercentage;
    }

    public void setSluggingPercentage(double sluggingPercentage) {
        this.sluggingPercentage = sluggingPercentage;
    }

    public double getOnBasePlusSlugging() {
        return onBasePlusSlugging;
    }

    public void setOnBasePlusSlugging(double onBasePlusSlugging) {
        this.onBasePlusSlugging = onBasePlusSlugging;
    }

    public double getWalkPercentage() {
        return walkPercentage;
    }

    public void setWalkPercentage(double walkPercentage) {
        this.walkPercentage = walkPercentage;
    }

    public double getStrikeoutPercentage() {
        return strikeoutPercentage;
    }

    public void setStrikeoutPercentage(double strikeoutPercentage) {
        this.strikeoutPercentage = strikeoutPercentage;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers (Users users) {
        this.users = users;
    }

    public offensiveSabermetrics() {
        this.createdAt = LocalDateTime.now();      //sets the timestamp to the exact date and time the user last calculated their offensive sabermetrics
    }
}




