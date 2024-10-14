package com.github.mikuza32.simplesabrescorecardapp.Entities;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)                                           //user entities created along with respective data connected to each individual account made on the site
    private String password;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<offensiveSabermetrics> offensiveSabermetrics;

    public Users() {
        // called in the offensiveSabermetric, defensive, and counting statistic classes
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {                   //setters and getters
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<com.github.mikuza32.simplesabrescorecardapp.Entities.offensiveSabermetrics> getOffensiveSabermetrics() {
        return offensiveSabermetrics;
    }                                                                                                                         //initializes the offensive sabermetric list for each users unique calculations

    public void setOffensiveSabermetrics(List<com.github.mikuza32.simplesabrescorecardapp.Entities.offensiveSabermetrics> offensiveSabermetrics) {
        this.offensiveSabermetrics = offensiveSabermetrics;
    }
}
