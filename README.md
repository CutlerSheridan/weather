# WEATHER APP

## Look up the weather forecast for any given city

#### TO-DO NEXT

#### TO-DO LATER

##### Features

-   add API call after each keystroke to suggest other city via dropdown

##### Behavior

##### Style

-   adjust styling for landscape on phone

#### DONE

_1.0.0_

-   get rid of localStorage clearing after any search
-   clear out console.logs
-   adjust search bar styling and positioning
-   reposition main section
-   change search text color

_0.7.2_

-   add loading screen to startup page
-   make loading overlay prettier

_0.7.1_

-   fix units buttons to highlight the correct one on startup
-   auto-fill Los Angeles info if localStorage is empty on startup

_0.7.0_

-   implement localStorage to remember units, current city, and current coords

_0.6.1_

-   fix time call so it doesn't read "10:3" if it's 10:03
-   add OpenWeather attribution

_0.6.0_

-   make loading overlay disappear after rejected searches too
-   fix loading text color consistency (for real this time)
-   add local time and date to results

_0.5.2_

-   add loading overlay that disappears upon background image load
-   fix loading text so it remains a consistent color even if new background dictates a different text color

_0.5.1_

-   remove temp high and low as the API is actually saying the highest and lowest possible temperature _at the present moment in the current location_
-   replace with cloud coverage and wind speed
-   make units swapping dynamically replace wind speed units
-   make air info units a little smaller than values
-   properly align air info units

_0.5.0_

-   implement geocoding API to translate ZIP into coordinates
-   make ZIP searches pull the city name

_0.4.0_

-   add material icons for weather symbols

_0.3.1_

-   improve handleSearch() promise chain

_0.3.0_

-   write function to calculate time phase of day
-   pull appropriate background pic for time of day
-   add photo credit attribute
-   add site credit

_0.2.1_

-   make searches split by "," and only use first array element as stored city name (so if user searches "manchester, us" it displays as "manchester" but shows the one in the us instead of the uk)

_0.2.0_

-   fix empty decimal showing up in temperature
-   move units buttons and search bar to header
-   make active class switch to clicked units button
-   make condition icon appear upon search
-   make day's high and low populate
-   blur search box after submitting search if search is valid
-   add body classes for light vs dark text
-   play with font size styling

_0.1.1_

-   only execute units switch if units are going to change

_0.1.0_

-   implement geocoding API to translate city name into coordinates
-   add model.currentCity variable to remember and display the input city name in case the coordinates slightly change the city name (such as "paris" changing to "palais-royal")
-   catch and display error if city doesn't exist
-   guard against uncaught errors in handleSearch() promise chain

_0.0.2_

-   add search box to search for city

_0.0.1_

-   write function to get data from API
-   write function to switch between celsius and fahrenheit

_0.0.0_

-   Initial commit
