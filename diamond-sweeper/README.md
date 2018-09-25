# Diamond Sweeper

### Setup instructions
To start the Application:

* Install the dependencies (via `npm install`)
* Start the app by running `npm run serve`
* Visit `http://localhost:8080` to see the application

### Changes made to starter app

* `webpack-dev-server@2.7.1` is used as development server so that we dont need to compile the code and reload the app every time a change is made
* `jsdom@9.9.1` is used to execute tests without a browser

### Completed actions

* The game board has 8x8 squares (initially, all represented by question marks)
* There are 8 diamonds hidden on the board, each diamond behind one of the squares
* When the user clicks on a square
    * If the square was hiding a diamond, the diamond appears
    * Otherwise, the square is opened, and blank
* The game ends when all diamonds are found. The user's score is the number of squares still left unturned.

## Bonus Sections Implemented

1. (UI) - Improve the board to semantic html. The default HTML provided uses tables.
4. (Javascript) - Cover logic in your application with meaningful tests (implemented partly)
5. (Infra) - Get hot reloading working
6. (Infra) - Get asset pipelining and minification working (minification of js implemented)
