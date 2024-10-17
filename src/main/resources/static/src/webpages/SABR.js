import React from "react";
import '../design/SABR.css'

const SABR = () => {
    return (
        <div className="sabrHeader">
            <section className="introSABR">
                <h1>WHO IS SABR?</h1>
                <img src="sabr logo.png"/>          {/* Embeds sabr logo in the web page*/}
            </section>
            <section className="sabrContent">
                <div className="contentBoxes">
                    <h2>BRIEF HISTORY</h2>                           {/* Content box for providing a brief history of what sabr is */}
                    <p>SABR which is also known as, The Society for American Baseball Research was founded in 1971 in Cooperstown, New York.
                        Their mission is to pioneer research and record handling of the sport of Baseball. In which these analytics and metrics created
                        help fans, players, owners, and coaches use quantitative data to help create qualitative analysis. Using these set simple metrics
                        on this site thanks to SABR themselves, one can analyze and keep track of their offensive and defensive performance for free!

                        Credits to the Society for American Baseball Research (SABR).
                    </p>
                </div>
                <div className="contentBoxes">
                    <h2>FORMULAS</h2>
                    <div className="formulasList">
                        <h3>Offensive Metrics:</h3>                   {/* List syntax is used with bold lettering for each label to list all the formulas and their names */}
                        <ul>
                            <li><strong>Batting Average:</strong> (AB)/(H)</li>
                            <li><strong>OBP (On Base Percentage):</strong> (H + BB + HBP) / (AB + BB + HBP + SF)</li>
                            <li><strong>SLG (Slugging Percentage):</strong> Total Bases / AB</li>
                            <li><strong>OPS (On Base Plus Slugging):</strong> OBS + SLG</li>
                            <li><strong>Walk Percentage:</strong> (BB) / (PA)</li>
                            <li><strong>Strikeout Percentage:</strong> (K) / (PA)</li>
                        </ul>
                        <h3>Defensive Metrics:</h3>
                        <ul>
                            <li><strong>Fielding Percentage (FPCT):</strong> (Putouts + Assists) / (Putouts + Assists + Errors)</li>
                            <li><strong>Earned Run Average (ERA):</strong> (Earned Runs * 9) / (Innings Pitched)</li>
                            <li><strong>ERA+ (Earned Run Average Plus):</strong> (League Average ERA) / (ERA)</li>
                            <li><strong>Walk and Hits per Innings Pitched (WHIP):</strong> (Hits Allowed + Walks Allowed) / (Innings Pitched)</li>
                            <li><strong>Opposing Team Batting Average:</strong> (Total Allowed Hits) / (Batters Faced – Walks – Hit Batters – Sac Hits – Sac Flies – Catchers Interference)</li>
                        </ul>
                    </div>
                </div>
                <div className="contentBoxes">               {/* div element to provide some insight on how to analyze the calculations of personal sabermetrics */}
                    <h2>HOW TO ANALYZE?</h2>
                    <p>Using these metric calculations one can make improvements to their game! For example, if one were to analyze their WHIP (Walk/Hits per Innings Pitched)
                    and it is high, then they would have to make improvements on certain assets in their game. With a high WHIP, that usually means one struggles to throw
                    strikes consistently and often. That means the player would have to work on throwing more strikes to put opposing hitters at a disadvantage.</p>
                </div>
            </section>
        </div>
    );
};
export default SABR;