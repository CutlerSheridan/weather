# WEATHER APP

## Look up the weather forecast for any given city

#### TO-DO NEXT

#### TO-DO LATER

##### Features

-   implement geocoding API to translate ZIP into coordinates
-   add ability to search zip code
-   add API call after each keystroke to suggest other city via dropdown, even if searching by zip code
-   implement localStorage to remember units and current city
-   change background depending on weather

##### Behavior

##### Style

-   add more today details
-   add today hourly
-   add week predictions
-   add OpenWeather attribution
-   add site credit
-   add single-color icons for app to use that correlate with icons from OpenWeather

#### DONE

_0.3.0_

-   write function to calculate time phase of day
-   pull appropriate background pic for time of day
-   add photo credit attribute

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
