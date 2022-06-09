# WEATHER APP

## Look up the weather forecast for any given city

#### TO-DO NEXT

-   figure out layout

#### TO-DO LATER

##### Features

-   implement geocoding API to translate ZIP into coordinates
-   add ability to search zip code
-   add API call after each keystroke to suggest other city via dropdown, even if searching by zip code
-   implement localStorage to remember units and current city
-   change background depending on weather
-   change background depending on time of day

##### Behavior

##### Style

#### DONE

-   _0.1.0_
-   implement geocoding API to translate city name into coordinates
-   add model.currentCity variable to remember and display the input city name in case the coordinates slightly change the city name (such as "paris" changing to "palais-royal")
-   catch and display error if city doesn't exist
-   guard against uncaught errors in handleSearch() promise chain

-   _0.0.2_
-   add search box to search for city

-   _0.0.1_
-   write function to get data from API
-   write function to switch between celsius and fahrenheit

-   _0.0.0_

-Initial commit
