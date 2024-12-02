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
