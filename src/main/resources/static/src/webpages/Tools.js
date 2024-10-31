import React, {useState} from 'react';
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
        opposingBattingAverage: '',
        sluggingPercentage: '',
        onBasePlusSlugging: '',
        earnedRunAverage: '',
        earnedRunAveragePlus: '',
        walkHitsInningsPitched: '',
        newEarnedRunAverage: ''

    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setToolsData({                       // In the event a user enters a numerical value for a stat, the value entered is attached to the respective name from toolsData
            ...toolsData,
            [name]: value,
        });
    };

    const handleOffensiveSubmit = async (event) => {
        event.preventDefault();                  // Exception handling


        const {hits, atBats, walks, hitByPitch, totalBases, plateAppearances, sacrificeFlies, strikeouts} = toolsData;

              // try catch to run through all API calls to proceed with backend/frontend communications
              // each offensive and defensive metric calculated sends a POST request using axios, seen below
        try {

            const parsedHits = parseInt(hits) || 0;
            const parsedAtBats = parseInt(atBats) || 0;
            const parsedWalks = parseInt(walks) || 0;
            const parsedHitByPitch = parseInt(hitByPitch) || 0;
            const parsedSacrificeFlies = parseInt(sacrificeFlies) || 0;    // Sets the properties in the toolsData object to null until user entry, uses parseInt to turn the entry for the property into an int
            const parsedTotalBases = parseInt(totalBases) || 0;
            const parsedPlateAppearances = parseInt(plateAppearances) || 0;
            const parsedStrikeouts = parseInt(strikeouts) || 0;

            const battingAverageOutput = await axios.post('http://localhost:8080/api/offensiveSabermetrics/battingAverage', {
                hits: parsedHits,
                atBats: parsedAtBats,
            });
            const battingAverage = parseFloat(battingAverageOutput.data).toFixed(3);

            const onBasePercentageOutput = await axios.post('http://localhost:8080/api/offensiveSabermetrics/onBasePercentage', {
                hits: parsedHits,
                atBats: parsedAtBats,
                walks: parsedWalks,                                  // turns into integers, calls the respective functions for each parsed property
                hitByPitch: parsedHitByPitch,
                sacrificeFlies: parsedSacrificeFlies,
            });
            const onBasePercentage = parseFloat(onBasePercentageOutput.data).toFixed(3);

            const walkPercentageOutput = await axios.post('http://localhost:8080/api/offensiveSabermetrics/walkPercentage', {
                walks: parsedWalks,
                plateAppearances: parsedPlateAppearances,
            });
            const walkPercentage = parseFloat(walkPercentageOutput.data).toFixed(3);

            const strikeoutPercentageOutput = await axios.post('http://localhost:8080/api/offensiveSabermetrics/strikeoutPercentage', {
                strikeouts: parsedStrikeouts,
                plateAppearances: parsedPlateAppearances,
            });
            const strikeoutPercentage = parseFloat(strikeoutPercentageOutput.data).toFixed(3);

            const sluggingPercentageOutput = await axios.post('http://localhost:8080/api/offensiveSabermetrics/sluggingPercentage', {
                totalBases: parsedTotalBases,
                atBats: parsedAtBats,
            });
            const sluggingPercentage = parseFloat(sluggingPercentageOutput.data).toFixed(3);

            const onBasePlusSluggingOutput = await axios.post('http://localhost:8080/api/offensiveSabermetrics/onBasePlusSlugging', {
                onBasePercentage: parseFloat(onBasePercentage),                // parseFloat due to calculation using other sabermetrics that are being calculated
                sluggingPercentage: parseFloat(sluggingPercentage)
            });
            const onBasePlusSlugging = parseFloat(onBasePlusSluggingOutput.data).toFixed(3);

            setToolsData({
                ...toolsData,
                battingAverage: battingAverage ?? 'N/A',
                onBasePercentage: onBasePercentage ?? 'N/A',
                walkPercentage: walkPercentage ?? 'N/A',                          //updates all of the offensive metric fields, ?? operator checks if each field is null or undefined
                strikeoutPercentage: strikeoutPercentage ?? 'N/A',
                sluggingPercentage: sluggingPercentage ?? 'N/A',
                onBasePlusSlugging: onBasePlusSlugging ?? 'N/A',
            });
            alert("Your Offensive Metrics have been calculated successfully!");
        } catch (error) {
            console.error("An error has occurred...", error.response || error);
            alert("Cannot calculate Offensive Metrics, an error has occurred...");
        }
    };


     // Same as the handleOffensiveSubmit function, just doesn't initialize the parseInt for each property in its own function
    const handleDefensiveSubmit = async (Event) => {
        Event.preventDefault();
        const { putouts, errors, assists, earnedRunsAllowed, hitsAllowed, walksAllowed, leagueAverageERA, defSacrifices, defSacrificeFlies, catchersInterference, inningsPitched, battersFaced } = toolsData;
        try {
            const fieldingPercentageOutput = await axios.post('http://localhost:8080/api/defensiveSabermetrics/fieldingPercentage', {
                putouts: parseInt(putouts),
                assists: parseInt(assists),
                errors: parseInt(errors)
            });
            const fieldingPercentage = fieldingPercentageOutput.data;

            const earnedRunAverageOutput = await axios.post('http://localhost:8080/api/defensiveSabermetrics/earnedRunAverage', {
                earnedRunsAllowed: parseInt(earnedRunsAllowed),
                inningsPitched: parseInt(inningsPitched)
            });
            const earnedRunAverage = earnedRunAverageOutput.data;

            const earnedRunAveragePlusOutput = await axios.post('http://localhost:8080/api/defensiveSabermetrics/earnedRunAveragePlus', {
                leagueAverageERA: parseInt(leagueAverageERA),
                earnedRunAverage: parseFloat(earnedRunAverage)       // parseFloat is used since the already calculated era will be used for this metric
            });
            const earnedRunAveragePlus = earnedRunAveragePlusOutput.data;

            const walkHitsInningsPitchedOutput = await axios.post('http://localhost:8080/api/defensiveSabermetrics/walkHitsInningsPitched', {
                hitsAllowed: parseInt(hitsAllowed),
                walksAllowed: parseInt(walksAllowed),
                inningsPitched: parseInt(inningsPitched)
            });
            const walkHitsInningsPitched = walkHitsInningsPitchedOutput.data;

            const opposingBattingAverageOutput = await axios.post('http://localhost:8080/api/defensiveSabermetrics/opposingBattingAverage', {
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

            alert("Your Defensive Metrics have been calculated successfully!")
        } catch (e) {
            console.error("An error has occured...")                                     // catch exception for if an error occurs
            alert("Defensive Metrics cannot be calculated...")
        }
    };

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
                        <div className="calculations">Batting Average: {toolsData.battingAverage || 'N/A'}</div>
                        <div className="calculations">On Base Percentage: {toolsData.onBasePercentage || 'N/A'}</div>
                        <div className="calculations">Slugging Percentage: {toolsData.sluggingPercentage || 'N/A'}</div>                   {/* Calculations output is not applicable due to no backend*/}
                        <div className="calculations">On Base Plus Slugging Percentage: {toolsData.onBasePlusSlugging || 'N/A'}</div>
                        <div className="calculations">Walk Percentage: {toolsData.walkPercentage || 'N/A'}</div>
                        <div className="calculations">Strikeout Percentage: {toolsData.strikeoutPercentage || 'N/A'}</div>
                    </div>                                                                       {/* Placeholder section that calls the calculations for averages, for now is set as N/A due to no backend*/}
                    <div className='siteOffSabermetricAverages'>
                        <h2>Current Site Offensive Averages:</h2>
                        <div className="calculations">Batting Average: {'N/A'}</div>
                        <div className="calculations">On Base Percentage: {'N/A'}</div>
                        <div className="calculations">Slugging Percentage: {'N/A'}</div>                      {/* Calculations output is not applicable due to no backend*/}
                        <div className="calculations">On Base Plus Slugging Percentage: {'N/A'}</div>
                        <div className="calculations">Walk Percentage: {'N/A'}</div>
                        <div className="calculations">Strikeout Percentage: {'N/A'}</div>
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
                        <div className="calculations">Fielding Percentage: {toolsData.fieldingPercentage || 'N/A'}</div>
                        <div className="calculations">Earned Run Average: {toolsData.earnedRunAverage || 'N/A'}</div>
                        <div className="calculations">Earned Run Average Plus: {toolsData.earnedRunAveragePlus || 'N/A'}</div>              {/* Calculations output is not applicable due to no backend*/}
                        <div className="calculations">Walk/Hits Per Innings Pitched: {toolsData.walkHitsInningsPitched || 'N/A'}</div>
                        <div className="calculations">Opposing Batting Average: {toolsData.opposingBattingAverage || 'N/A'}</div>
                    </div>                                                                 {/* Placeholder section that calls the calculations for averages, for now is set as N/A due to no backend*/}
                    <div className='siteDefSabermetricAverages'>
                        <h2>Current Site Defensive Averages:</h2>
                        <div className="calculations">Fielding Percentage: {'N/A'}</div>
                        <div className="calculations">Earned Run Average: {'N/A'}</div>
                        <div className="calculations">Earned Run Average Plus: {'N/A'}</div>
                        <div className="calculations">Walk/Hits Per Innings Pitched: {'N/A'}</div>         {/* Calculations output is not applicable due to no backend*/}
                        <div className="calculations">Opposing Batting Average: {'N/A'}</div>
                    </div>
                </section>
            </div>
        </div>

    );
};

export default Tools;


