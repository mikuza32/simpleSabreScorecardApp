***Simple Sabermetrics Scorecard Application***

Hello everyone! This is my simpleSabreScorecard web application project that I completed in CEN-4350C (Open Source Web Technologies) 
while pursuing my B.A.S in Computing Technologies and Software Development at Valencia College. This project was developed to help 
baseball players, coaches, fans, or analysts of the game create qualitative analysis based on quantitative results. Although, the
data produced from this application does not provide 100 percent correct conclusions on overall performance, as context always needs
to be taken into account when deriving qualitative conclusions of overall performance when playing or watching the sport. This application
was built with modern web technologies, has user-friendly interfaces, and persisitent data storage for users and the application as a whole.

***FEATURES***
- User Authentication and account creation
- User session and lifetime offensive and defensive sabermetrics aree calculated accurately
- Site-wide lifetime sabermetrics are calculated based on all authorized user entry
- Metrics calculated include:

  *Offensive Simple Sabermetrics*
  
    - Batting Average (AVG)
    - On-Base Percentage (OBP)
    - On-Base Plus Slugging (OPS)
    - Walk Percentage (BB%)
    - Strikeout Percentage (K%)
 
  *Defensive Simple Sabermetrics*

    - Fielding Percentage (FPCT)
    - Walks + Hits per Innings Pitched (WHIP)
    - Earned Run Average (ERA)
    - Earned Run Average Plus (ERA+)
    - Opponent Batting Average (OBA)
 
***TECHNOLOGIES USED***

*Front-end*

  - React Framework: Used to create dynamic user interface
  - JavaScript: Interactivity with applications UI
  - HTML/CSS: Structure and styling of the application
    
*Back-end*

  - Spring Boot: Creation of RESTful APIs and back-end layers
  - Java: For back-end functionality and logic
    
*Database*

  - MySQL:  Relational persistent storage of authorized user data and sabermetrics
    
*Tools and Libraries*

  - Axios: Handling API requests and responses
  - Hibernate (JPA): Object-relational mapping and database interactivity
  - Spring Data JPA: Simple database operations
