# TMD TC

*Didn't want to use any keywords to make this easily searchable.*

This is a small web app that uses [OpenWeather API](https://openweathermap.org/api) in a React application.
The app will **show current and forecasted weather**.

## Core features

- Use react hooks not classes
- MobX state management
- Filter by city name
- Use geolocation to populate input field and send the first request
- Save user's location preference(s) for future session
- Make the UI look good; I'll use Material UI-react for this
- Use Jest for testing

## Extra features or ideas

Things I may want to do but might not have the time for:
- Customizable weather panel per user's preference

## Running this app:

Need to create an `.env.local` file with the contents

    NODE_ENV_OPEN_WEATHER_API_KEY=somekey
    REACT_APP_SERVER_PORT=6005

## Progress

I plan to do this within 5 days and without having to go over a daily time limit.
- First and second day for planning the app and building the basic features
  - Planning what features need what data
  - Learning the API, creating the necessary API calls
  - Building out different types/models for different data
  - Actually building out the application
- Third day for building the UI out
  - Sketch out the components and how they fit together
  - Programming out the components
- Fourth day for testing with Jest
  - Learn Jest
  - Apply Jest
- Fifth day for anything extra I want to add (optional)
  - Optimizations with loading
  - Making themes or styling look better
  - Maybe self-host it so the application is easily useable haha.

I will also keep track of the amount of hours I spend on each portion of this project for my own sake; in my [PROGRESS](./docs/PROGRESS.md) file.

## Disclaimer

- I am quite new to React, but my prior experiences in frontend and backend will be useful.
- Concerns I have are using old and unsafe React APIs or using old and unmaintainable packages.
- I also am also quite new to building UI components so that will be a challenge for me, I think building the React app should be easier for me.
- I will be referencing some pervious React learning-projects I've being using to learn React with.
- Finally my spelling could use some work. :D

## Known limitations

Missing features or limits of what this app can do
- Multi language support; only supports english.
- Doesn't ask for cookie permissions. Assume cookies are allowed!
- Loads all locations saved (one API per location), every time the user reloads the page.
  - If there are a lot of locations this could end up in a lot of API calls (not good for my api key haha)
  - Also this means it doesn't lazy load things.... right?...
- ~~Searching by location name rather than geolocations~~
- No weather alerts shown
- Future: add feature for searching by zip code...
- No error catching to default into a normal state