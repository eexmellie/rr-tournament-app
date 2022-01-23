# Round-robin Tournamnet Management App

This app allows user to create, hold and review tournaments based on [round-robin tournament scheme](https://en.wikipedia.org/wiki/Round-robin_tournament). 

## Games and Matches
Each *tournament* consists of multiple *rounds*,  each *round* consists of multiple *games*.
Every *game* is played until one of the opponents scores required number of points. To win the *match*, a player needs to win 2 games ("best-of-three"). Thus, every match can consist of 2 or 3 games.

## Tournament
Every match brings the winning player 1 tournament point, while the losing player gets no points. Due to the "best of 3" type of matches, ties are not possible.
After all the matches are played, the participant with the biggest number of points becomes the winner of the tournament.

For the sake of simplicity, if two or more players have the same number of points, all of them are ranked equally, so there may be multiple winners.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
