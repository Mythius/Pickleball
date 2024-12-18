# Pickleball
 
 Sep 28
 I created the html and css for my pickleball application.

I also integrated the google sign in, so that it is functional. 

I created my pages with placeholders for database records and websocket requests. 

Checkout the live demo at
https://startup.web260.msouthwick.com

I created everything in normal html / css / javascript but plan on converting it to a react app.

## Oct 12, 2024 CSS Change
So As I did most of the CSS last time, and after discussing this with Dr. Clement, he informed me that I should focus my time working with React to get the most of this class. So instead I am turning in part one of converting this project to React. I was able to get some components built and styled. If you have any questions let me know.

## React Branch
All of the changes I have made in converting my project to react are in the React branch on github see https://github.com/Mythius/Pickleball/tree/react for the latest code.
The live demo is currently being deployed from the react build. 

## Nov 9 Updates
The react branch is the main branch for my Front End Service, and I have changed the main branch to be the Back-end Service. This last week I have been updating the backend service to have the Tournament Data structure and apis, and I will continue designing the front end service after I have all the back-end api in place. 

The backend service is requires authentication, and is ready and availiable to respond to requests from the fornt end. The front end service will not be served from the back end, but intead will be served from a seperate server. 

Currently My backend service is live at https://backend.msouthwick.com/. 
My front end service is alive https://startup.web260.msouthwick.com/

### React Startup Requirements
- My GitHub Repository Demonstrates Ownership
- I Bundled it with vite + react
- I have a react component for everything on the page see https://github.com/Mythius/Pickleball/tree/react/src/components for a list of all the components I used
- I used the react router to switch between the pages ( see app.js )
- I used react hooks for dynamically creating components, see MyTourneys.js or any of the pages


## Nov 16 Updates
The backend service is completely functional wth the ability to create, organize, update and delete tournaments.
The front end recieved minor updates to create tournaments, but does not utilize the full capabilities of the backend service.
The backend service is running on a separte url, and has cors enabled in order to talk to the front end. 

## Login
I elected to use a third party service for logging in, and I integrated the google login api. I do also have a mongo database connected, but I don't use it to store login information, I just use it for saving tournament data. 

## Dec 2 Updates
Backend and Front end itegrated. Web Sockets has not yet been integrated, so after almost every action you must refresh the page. 

# API Endpoints
## PUBLIC API ENDPOINTS
### `GET` /tournaments
### `GET` /tournaments/:id
### `GET` /current-round/:id

## PRIVATE API ENDPOINTS
### `DELETE` /tournament/:id
### `GET` /profile
### `POST` /tournament 
- body: {name: 'My New Tournament'}
### `POST` /join-tournament/:id/:name
### `POST` /start-tournament/:id
### `POST` /matchResults/:matchId
- body: {winner:'Team Name', score: '11 - 7'}
### `GET` /history

## Dec 5 Updates
WebSockets! 
The App is now completely functional, and tournamnets, results, and players are automatically syncronized accross devices.

# Instructions
- Sign in Using Google. This occasionally takes up to 2 seconds or can be blocked by your browser as it is technically a 3rd party sign in.
- Do not use incognito as it will not sign you in
- Use 3 bars to navigate to my tournaments ( which should be named all tournaments)
- Click the `+` button to create a tournament
- Join tournament and select team name.
- If you need to create multiple teams under one account simply go back to the my tournament page and join tournament a 2nd or 3rd time, etc.
- The ▶️ button will start the tournament and the share button will provide a qr code to this website
- After starting, click on any of the boxes to click the winner, this will track your game in your history, and will move the winner on in the tournament.
- After all matches are complete, the next round of the tournament will begin.