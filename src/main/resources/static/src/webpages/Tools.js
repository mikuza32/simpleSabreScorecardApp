import React, {useEffect, useState} from 'react';
import '../design/Tools.css'
import axios from 'axios';




const Tools = () => {
    const[toolsData, setToolsData] = useState({       //
        hits: '',
        atBats: '',
        sacrificeFlies: '',
        totalBases: '',
        plateAppearances: '',
        walks: '',
        hitByPitch: '',
        strikeouts: '',

        inningsPitched: '',
        earnedRunsAllowed: '',
        hitsAllowed: '',
        defSacrifices: '',
        defSacrificeFlies: '',
        errors: '',                                 //Every single property pertaining to offensive/defensive variables and metrics are initialized
        leagueAverageERA: '',
        putouts: '',
        assists: '',
        battersFaced: '',
        walksAllowed: '',
        catchersInterference: '',
        hitBatters: '',

        battingAverage: '',
        onBasePercentage: '',
        walkPercentage: '',
        strikeoutPercentage: '',
        fieldingPercentage: '',
        opposingBattingAverage: '',                  // added sabermetric lifetime properties and site wide averages to be fetched and displayed
        sluggingPercentage: '',
        onBasePlusSlugging: '',
        earnedRunAverage: '',
        earnedRunAveragePlus: '',
        walkHitsInningsPitched: '',
        newEarnedRunAverage: '',

        lifetimeBattingAverage: '',
        lifetimeOnBasePercentage: '',
        lifetimeSluggingPercentage: '',
        lifetimeOPS: '',
        lifetimeWalkPercentage: '',
        lifetimeStrikeoutPercentage: '',
        lifetimeFieldingPercentage: '',
        lifetimeWHIP: '',
        lifetimeERA: '',
        lifetimeERAPlus: '',
        lifetimeOpposingBattingAverage: '',

        siteWideBattingAverage: '',
        siteWideOnBasePercentage: '',
        siteWideSluggingPercentage: '',
        siteWideOPS: '',
        siteWideWalkPercentage: '',
        siteWideStrikeoutPercentage: '',
        siteWideFieldingPercentage: '',
        siteWideWHIP: '',
        siteWideERA: '',
        siteWideERAPlus: '',
        siteWideOpposingBattingAverage: '',
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setToolsData({                       // In the event a user enters a numerical value for a stat, the value entered is attached to the respective name from toolsData
            ...toolsData,
            [name]: value,
        });
    };

    const handleOffensiveSubmit = async (event) => {
        event.preventDefault();

        const {
            hits,
            atBats,
            walks,
            hitByPitch,
            totalBases,         // counting statistic properties that are to be manipulated based on the users int entry for each
            plateAppearances,
            sacrificeFlies,
            strikeouts,
        } = toolsData;

        try {

            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("User ID not found. Please log in again.");      // ensures the userid created for user is valid before proceeding
                return;
            }


            const parsedStats = {
                hits: parseInt(hits) || 0,
                atBats: parseInt(atBats) || 0,
                walks: parseInt(walks) || 0,                  // parses all objects to make sure they are int, and are set to 0 if null
                hitByPitch: parseInt(hitByPitch) || 0,
                totalBases: parseInt(totalBases) || 0,
                plateAppearances: parseInt(plateAppearances) || 0,
                sacrificeFlies: parseInt(sacrificeFlies) || 0,
                strikeouts: parseInt(strikeouts) || 0,
            };


            const response = await axios.post(
                `http://localhost:8080/api/offensive/calculateOffensive/${userId}`,    //
                parsedStats
            );


            const {
                battingAverage,
                onBasePercentage,
                walkPercentage,
                strikeoutPercentage,  //calculated sabermetric properties to be displayed after successful API call
                sluggingPercentage,
                onBasePlusSlugging,
            } = response.data;

            setToolsData((prevState) => ({
                ...prevState,
                battingAverage: battingAverage?.toFixed(3) ?? "N/A",
                onBasePercentage: onBasePercentage?.toFixed(3) ?? "N/A",
                walkPercentage: walkPercentage?.toFixed(3) ?? "N/A",            //sets the properties to three decimal places, and initializes all
                strikeoutPercentage: strikeoutPercentage?.toFixed(3) ?? "N/A",
                sluggingPercentage: sluggingPercentage?.toFixed(3) ?? "N/A",
                onBasePlusSlugging: onBasePlusSlugging?.toFixed(3) ?? "N/A",
            }));

            alert("Your Offensive Metrics have been calculated successfully!");



        } catch (error) {
            console.error("An error occurred while calculating metrics:", error.response || error);
            alert("Cannot calculate Offensive Metrics. Please try again.");
        }
    };



    // Same as the handleOffensiveSubmit function, just doesn't initialize the parseInt for each property in its own function
    const handleDefensiveSubmit = async (Event) => {
        Event.preventDefault();
        const { putouts, errors, assists, earnedRunsAllowed, hitsAllowed, walksAllowed, leagueAverageERA, defSacrifices, defSacrificeFlies, catchersInterference, inningsPitched, battersFaced } = toolsData;
        try {
            const fieldingPercentageOutput = await axios.post('http://localhost:8080/api/defensive/calculateDefensive', {
                putouts: parseInt(putouts),
                assists: parseInt(assists),
                errors: parseInt(errors)
            });
            const fieldingPercentage = fieldingPercentageOutput.data;

            const earnedRunAverageOutput = await axios.post('http://localhost:8080/api/defensive/calculateDefensive', {
                earnedRunsAllowed: parseInt(earnedRunsAllowed),
                inningsPitched: parseInt(inningsPitched)
            });
            const earnedRunAverage = earnedRunAverageOutput.data;

            const earnedRunAveragePlusOutput = await axios.post('http://localhost:8080/api/defensive/calculateDefensive', {
                leagueAverageERA: parseInt(leagueAverageERA),
                earnedRunAverage: parseFloat(earnedRunAverage)       // parseFloat is used since the already calculated era will be used for this metric
            });
            const earnedRunAveragePlus = earnedRunAveragePlusOutput.data;

            const walkHitsInningsPitchedOutput = await axios.post('http://localhost:8080/api/defensive/calculateDefensive', {
                hitsAllowed: parseInt(hitsAllowed),
                walksAllowed: parseInt(walksAllowed),
                inningsPitched: parseInt(inningsPitched)
            });
            const walkHitsInningsPitched = walkHitsInningsPitchedOutput.data;

            const opposingBattingAverageOutput = await axios.post('http://localhost:8080/api/defensive/calculateDefensive', {
                hitsAllowed: parseInt(hitsAllowed),
                walksAllowed: parseInt(walksAllowed),
                battersFaced: parseInt(battersFaced),
                defSacrificeFlies: parseInt(defSacrificeFlies),
                defSacrifices: parseInt(defSacrifices),
                catchersInterference: parseInt(catchersInterference)
            });
            const opposingBattingAverage = opposingBattingAverageOutput.data;

            setToolsData({
                ...toolsData,
                fieldingPercentage: fieldingPercentage ?? 'N/A',
                earnedRunAverage: earnedRunAverage ?? 'N/A',
                earnedRunAveragePlus: earnedRunAveragePlus ?? 'N/A',                 //updates all of the defensive metric fields, ?? operator checks if each field is null or undefined
                walkHitsInningsPitched: walkHitsInningsPitched ?? 'N/A',
                opposingBattingAverage: opposingBattingAverage ?? 'N/A'
            });

            alert("Your Defensive Metrics have been calculated successfully!");

        } catch (e) {
            console.error("An error has occured...")                                     // catch exception for if an error occurs
            alert("Defensive Metrics cannot be calculated...")
        }
    };

    const fetchMetrics = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error("User ID not found. Please log in again.");    // ensures the correct unique ID is attached to user before user can calculate anything
            }

            const [
                lifetimeBattingAverage,
                siteWideBattingAverage,
                lifetimeOnBasePercentage,
                siteWideOnBasePercentage,
                lifetimeSluggingPercentage,
                siteWideSluggingPercentage,
                lifetimeOPS,
                siteWideOPS,
                lifetimeWalkPercentage,
                siteWideWalkPercentage,                         //properties that are being manipulated and displayed from API calls
                lifetimeStrikeoutPercentage,
                siteWideStrikeoutPercentage,
                lifetimeFieldingPercentage,
                siteWideFieldingPercentage,
                lifetimeWHIP,
                siteWideWHIP,
                lifetimeERA,
                siteWideERA,
                lifetimeERAPlus,
                siteWideERAPlus,
                lifetimeOpposingBattingAverage,
                siteWideOpposingBattingAverage,
            ] = await Promise.all([
                axios.get(`http://localhost:8080/api/offensive/lifetime/batting-average/${userId}`),
                axios.get(`http://localhost:8080/api/offensive/sitewide/batting-average`),
                axios.get(`http://localhost:8080/api/offensive/lifetime/on-base-percentage/${userId}`),
                axios.get(`http://localhost:8080/api/offensive/sitewide/on-base-percentage`),
                axios.get(`http://localhost:8080/api/offensive/lifetime/slugging-percentage/${userId}`),
                axios.get(`http://localhost:8080/api/offensive/sitewide/slugging-percentage`),
                axios.get(`http://localhost:8080/api/offensive/lifetime/ops/${userId}`),
                axios.get(`http://localhost:8080/api/offensive/sitewide/ops`),
                axios.get(`http://localhost:8080/api/offensive/lifetime/walk-percentage/${userId}`),
                axios.get(`http://localhost:8080/api/offensive/sitewide/walk-percentage`),                      //API calls for all the lifetime and site wide averages
                axios.get(`http://localhost:8080/api/offensive/lifetime/strikeout-percentage/${userId}`),
                axios.get(`http://localhost:8080/api/offensive/sitewide/strikeout-percentage`),
                axios.get(`http://localhost:8080/api/defensive/lifetime/fielding-percentage/${userId}`),
                axios.get(`http://localhost:8080/api/defensive/sitewide/fielding-percentage`),
                axios.get(`http://localhost:8080/api/defensive/lifetime/whip/${userId}`),
                axios.get(`http://localhost:8080/api/defensive/sitewide/whip`),
                axios.get(`http://localhost:8080/api/defensive/lifetime/era/${userId}`),
                axios.get(`http://localhost:8080/api/defensive/sitewide/era`),
                axios.get(`http://localhost:8080/api/defensive/lifetime/era-plus/${userId}`),
                axios.get(`http://localhost:8080/api/defensive/sitewide/era-plus`),
                axios.get(`http://localhost:8080/api/defensive/lifetime/opposing-batting-average/${userId}`),
                axios.get(`http://localhost:8080/api/defensive/sitewide/opposing-batting-average`),
            ]);


            console.log("Lifetime Batting Average Data:", lifetimeBattingAverage.data);      // logs the data in the console (used to ensure queries were successful and show correct data)
            console.log("Site Wide Batting Average Data:", siteWideBattingAverage.data);

            // ensures all data for averages are a valid integer for the respective calculations, if 0 print N/A
            // all averages are capped to three decimal places for professionalism and accuracy
            setToolsData({
                ...toolsData,
                lifetimeBattingAverage: isValidNumber(lifetimeBattingAverage.data)
                    ? lifetimeBattingAverage.data.toFixed(3)
                    : "N/A",
                siteWideBattingAverage: isValidNumber(siteWideBattingAverage.data)
                    ? siteWideBattingAverage.data.toFixed(3)
                    : "N/A",
                lifetimeOnBasePercentage: isValidNumber(lifetimeOnBasePercentage.data)
                    ? lifetimeOnBasePercentage.data.toFixed(3)
                    : "N/A",
                siteWideOnBasePercentage: isValidNumber(siteWideOnBasePercentage.data)
                    ? siteWideOnBasePercentage.data.toFixed(3)
                    : "N/A",
                lifetimeSluggingPercentage: isValidNumber(lifetimeSluggingPercentage.data)
                    ? lifetimeSluggingPercentage.data.toFixed(3)
                    : "N/A",
                siteWideSluggingPercentage: isValidNumber(siteWideSluggingPercentage.data)
                    ? siteWideSluggingPercentage.data.toFixed(3)
                    : "N/A",
                lifetimeOPS: isValidNumber(lifetimeOPS.data)
                    ? lifetimeOPS.data.toFixed(3)                                  // ensures all data for averages are a valid integer for the respective calculations, if 0 print N/A
                    : "N/A",
                siteWideOPS: isValidNumber(siteWideOPS.data)
                    ? siteWideOPS.data.toFixed(3)
                    : "N/A",
                lifetimeWalkPercentage: isValidNumber(lifetimeWalkPercentage.data)
                    ? lifetimeWalkPercentage.data.toFixed(3)
                    : "N/A",
                siteWideWalkPercentage: isValidNumber(siteWideWalkPercentage.data)
                    ? siteWideWalkPercentage.data.toFixed(3)
                    : "N/A",
                lifetimeStrikeoutPercentage: isValidNumber(lifetimeStrikeoutPercentage.data)
                    ? lifetimeStrikeoutPercentage.data.toFixed(3)
                    : "N/A",
                siteWideStrikeoutPercentage: isValidNumber(siteWideStrikeoutPercentage.data)
                    ? siteWideStrikeoutPercentage.data.toFixed(3)
                    : "N/A",
                lifetimeFieldingPercentage: isValidNumber(lifetimeFieldingPercentage.data)
                    ? lifetimeFieldingPercentage.data.toFixed(3)
                    : "N/A",
                siteWideFieldingPercentage: isValidNumber(siteWideFieldingPercentage.data)
                    ? siteWideFieldingPercentage.data.toFixed(3)
                    : "N/A",
                lifetimeWHIP: isValidNumber(lifetimeWHIP.data)
                    ? lifetimeWHIP.data.toFixed(3)
                    : "N/A",
                siteWideWHIP: isValidNumber(siteWideWHIP.data)
                    ? siteWideWHIP.data.toFixed(3)
                    : "N/A",
                lifetimeERA: isValidNumber(lifetimeERA.data)
                    ? lifetimeERA.data.toFixed(2)
                    : "N/A",
                siteWideERA: isValidNumber(siteWideERA.data)
                    ? siteWideERA.data.toFixed(2)
                    : "N/A",
                lifetimeERAPlus: isValidNumber(lifetimeERAPlus.data)
                    ? lifetimeERAPlus.data.toFixed(2)
                    : "N/A",
                siteWideERAPlus: isValidNumber(siteWideERAPlus.data)
                    ? siteWideERAPlus.data.toFixed(2)
                    : "N/A",
                lifetimeOpposingBattingAverage: isValidNumber(lifetimeOpposingBattingAverage.data)
                    ? lifetimeOpposingBattingAverage.data.toFixed(3)
                    : "N/A",
                siteWideOpposingBattingAverage: isValidNumber(siteWideOpposingBattingAverage.data)
                    ? siteWideOpposingBattingAverage.data.toFixed(3)
                    : "N/A",
            });

        } catch (error) {
            console.error("Error fetching metrics:", error);
            alert("An error occurred while fetching metrics. Please try again.");
        }
    };

// Helper function to check if a value is a valid number
    const isValidNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

    useEffect(() => {
        fetchMetrics();
    }, []);


    const deleteSubmit = (fieldName) => {
        setToolsData({
            ...toolsData,                           // Deletes the user entry which is called as a button below in HTML section, this deletes the entry and
            [fieldName]: '',
        });
    };

    return (
        <div className='welcomeTools'>
            <header className='toolsHeader'>
                <h1>Your Simple Sabermetrics</h1>
                <p>All in ONE Place! </p>
            </header>
            <div className='metricsSection'>
                <section className='offensiveMetrics'>
                    <h2> Your Offensive Metrics </h2>
                    <form onSubmit={handleOffensiveSubmit}>           {/* Form calls the handleSubmit function */}
                        <label>Total Hits (H):</label>
                        <input
                            type="number"
                            name="hits"
                            value={toolsData.hits}            // sets the type of entry to a numerical entry, the name of the variable the user is manipulating, creating the value based on the user entry, and handling the input using the handleInput function
                            onChange={handleInput}
                            required
                        />
                        <label>Total At Bats (ABs):</label>
                        <input
                            type="number"
                            name="atBats"
                            value={toolsData.atBats}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('hits', 'atBats')}>Delete</button>   {/* Calls the deleteSubmit function to use the function logic to delete the user entry with this button*/}
                        <div className='calculations'>Batting Average: {toolsData.battingAverage || 'N/A'}</div>              {/* Print out field for the users battingAverage, calls the battingAverage property of the toolsData variable*/}

                        <label>Total Walks (BB):</label>
                        <input
                            type="number"
                            name="walks"
                            value={toolsData.walks}                       // sets the type of entry to a numerical entry, the name of the variable the user is manipulating, creating the value based on the user entry, and handling the input using the handleInput function
                            onChange={handleInput}
                            required
                        />
                        <label>Total Hit By Pitch (HBP):</label>
                        <input
                            type="number"
                            name="hitByPitch"
                            value={toolsData.hitByPitch}
                            onChange={handleInput}
                            required
                        />
                        <label>Total Sacrifice Flies (SF):</label>
                        <input
                            type="number"
                            name="sacrificeFlies"
                            value={toolsData.sacrificeFlies}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('walks', 'hitByPitch', 'sacrificeFlies')}>Delete</button>
                        <div className='calculations'>On Base Percentage: {toolsData.onBasePercentage || 'N/A'}</div>

                        <label>Total Bases:</label>
                        <input
                            type="number"
                            name="totalBases"
                            value={toolsData.totalBases}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('totalBases')}>Delete</button>
                        <div className='calculations'>Slugging Percentage: {toolsData.sluggingPercentage || 'N/A'}</div>
                        <div className='calculations'>On Base Plus Slugging: {toolsData.onBasePlusSlugging || 'N/A'}</div>
                        <label>Plate Appearances (PA):</label>
                        <input
                            type="number"
                            name="plateAppearances"
                            value={toolsData.plateAppearances}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('plateAppearances')}>Delete</button>
                        <div className='calculations'>Walk Percentage: {toolsData.walkPercentage || 'N/A'}</div>

                        <label>Strikeouts (K):</label>
                        <input
                            type="number"
                            name="strikeouts"
                            value={toolsData.strikeouts}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('strikeouts')}>Delete</button>
                        <div className="calculations">Strikeout Percentage: {toolsData.strikeoutPercentage || 'N/A'}</div>

                        <button type="submit" className="calcButton">Calculate</button> {/*Submit button to calculate all of the data the user just entered for each property of the toolsData variable*/}
                    </form>
                </section>
                <section className='averagesContainer'>
                    <div className='userOffSabermetricAverages'>
                        <h2>Your Current Offensive Averages:</h2>
                        <div className="calculations">Batting Average: {toolsData.lifetimeBattingAverage || 'N/A'}</div>
                        <div className="calculations">On Base Percentage: {toolsData.lifetimeOnBasePercentage || 'N/A'}</div>
                        <div className="calculations">Slugging Percentage: {toolsData.lifetimeSluggingPercentage || 'N/A'}</div>                   {/* Calculations output is not applicable due to no backend*/}
                        <div className="calculations">On Base Plus Slugging Percentage: {toolsData.lifetimeOPS || 'N/A'}</div>
                        <div className="calculations">Walk Percentage: {toolsData.lifetimeWalkPercentage || 'N/A'}</div>
                        <div className="calculations">Strikeout Percentage: {toolsData.lifetimeStrikeoutPercentage || 'N/A'}</div>
                    </div>                                                                       {/* Placeholder section that calls the calculations for averages, for now is set as N/A due to no backend*/}
                    <div className='siteOffSabermetricAverages'>
                        <h2>Current Site Offensive Averages:</h2>
                        <div className="calculations">Batting Average: {toolsData.siteWideBattingAverage}</div>
                        <div className="calculations">On Base Percentage: {toolsData.siteWideOnBasePercentage}</div>
                        <div className="calculations">Slugging Percentage: {toolsData.siteWideSluggingPercentage}</div>                      {/* Calculations output is not applicable due to no backend*/}
                        <div className="calculations">On Base Plus Slugging Percentage: {toolsData.siteWideOPS}</div>
                        <div className="calculations">Walk Percentage: {toolsData.siteWideWalkPercentage}</div>
                        <div className="calculations">Strikeout Percentage: {toolsData.siteWideStrikeoutPercentage}</div>
                    </div>
                </section>
            </div>
            <div className='metricsSection'>
                <section className="defensiveMetrics">
                    <h2>Your Defensive Metrics</h2>
                    <form onSubmit={handleDefensiveSubmit}>
                        <label>Total Putouts:</label>
                        <input
                            type="number"
                            name="putouts"
                            value={toolsData.putouts}            // sets the type of entry to a numerical entry, the name of the variable the user is manipulating, creating the value based on the user entry, and handling the input using the handleInput function
                            onChange={handleInput}
                            required
                        />
                        <label>Total Assists:</label>
                        <input
                            type="number"
                            name="assists"
                            value={toolsData.assists}
                            onChange={handleInput}
                            required
                        />
                        <label>Total Errors:</label>
                        <input
                            type="number"
                            name="errors"
                            value={toolsData.errors}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('putouts', 'assists', 'errors')}>Delete</button>
                        <div className="calculations">Fielding Percentage: {toolsData.fieldingPercentage || 'N/A'}</div>
                        <label>Total Innings Pitched:</label>
                        <input
                            type="number"
                            name="inningsPitched"
                            value={toolsData.inningsPitched}
                            onChange={handleInput}
                            required
                        />
                        <label> Earned Runs </label>
                        <input
                            type="number"
                            name="earnedRunsAllowed"
                            value={toolsData.earnedRunsAllowed}
                            onChange={handleInput}
                            required
                        />
                        <label> League Average ERA</label>
                        <input
                            type="number"
                            name="leagueAverageERA"
                            value={toolsData.leagueAverageERA}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('inningsPitched', 'earnedRunsAllowed','leagueAverageERA')}>Delete</button>

                        <label>Total Hits Allowed:</label>
                        <input
                            type="number"
                            name="hitsAllowed"
                            value={toolsData.hitsAllowed}
                            onChange={handleInput}
                            required
                        />
                        <label>Total Walks Allowed:</label>
                        <input
                            type="number"
                            name="walksAllowed"
                            value={toolsData.walksAllowed}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('hitsAllowed', 'walksAllowed')}>Delete</button>
                        <div className="calculations">Walk Hits Per Innings: {toolsData.walkHitsInningsPitched || 'N/A'}</div>
                        <label>Batters Faced:</label>
                        <input
                            type="number"
                            name="battersFaced"
                            value={toolsData.battersFaced}
                            onChange={handleInput}
                            required
                        />
                        <label>Sacrifice Hits:</label>
                        <input
                            type="number"
                            name="defSacrifices"
                            value={toolsData.defSacrifices}
                            onChange={handleInput}
                            required
                        />
                        <label>Sacrifice Flies:</label>
                        <input
                            type="number"
                            name="defSacrificeFlies"
                            value={toolsData.defSacrificeFlies}
                            onChange={handleInput}
                            required
                        />
                        <label>Catchers Interference:</label>
                        <input
                            type="number"
                            name="catchersInterference"
                            value={toolsData.catchersInterference}
                            onChange={handleInput}
                            required
                        />
                        <button type="button" onClick={() => deleteSubmit('battersFaced', 'sacrificeHits', 'sacrificeFlies', 'catchersInterference')}>Delete</button>
                        <div className="calculations">Opposing Batting Average: {toolsData.opposingBattingAverage || 'N/A'}</div>
                        <div className="calculations">Earned Run Average: {toolsData.newEarnedRunAverage}</div>

                        <button type="submit" className="calcButton">Calculate</button>          {/*Submit button to calculate all of the data the user just entered for each property of the toolsData variable*/}
                    </form>
                </section>
                <section className='averagesContainer'>
                    <div className='userDefSabermetricAverages'>
                        <h2>Your Current Defensive Averages:</h2>
                        <div className="calculations">Fielding Percentage: {toolsData.lifetimeFieldingPercentage || 'N/A'}</div>
                        <div className="calculations">Earned Run Average: {toolsData.lifetimeERA || 'N/A'}</div>
                        <div className="calculations">Earned Run Average Plus: {toolsData.lifetimeERAPlus || 'N/A'}</div>              {/* Calculations output is not applicable due to no backend*/}
                        <div className="calculations">Walk/Hits Per Innings Pitched: {toolsData.lifetimeWHIP || 'N/A'}</div>
                        <div className="calculations">Opposing Batting Average: {toolsData.lifetimeOpposingBattingAverage || 'N/A'}</div>
                    </div>                                                                 {/* Placeholder section that calls the calculations for averages, for now is set as N/A due to no backend*/}
                    <div className='siteDefSabermetricAverages'>
                        <h2>Current Site Defensive Averages:</h2>
                        <div className="calculations">Fielding Percentage: {toolsData.siteWideFieldingPercentage}</div>
                        <div className="calculations">Earned Run Average: {toolsData.siteWideERA}</div>
                        <div className="calculations">Earned Run Average Plus: {toolsData.siteWideERAPlus}</div>
                        <div className="calculations">Walk/Hits Per Innings Pitched: {toolsData.siteWideWHIP}</div>         {/* Calculations output is not applicable due to no backend*/}
                        <div className="calculations">Opposing Batting Average: {toolsData.siteWideOpposingBattingAverage}</div>
                    </div>
                </section>
            </div>
        </div>

    );
};

export default Tools;


