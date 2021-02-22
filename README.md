# lfwc-score-board
I chose Vue as framework for developing the Life Football World Cup Score Board, LFWCSB, combined with Vuex store for keeping data state for the board and two localStorage collections, teams and matches, for persistance of such data between sessions. Minimalistic use of foreign components, reduced to v-select and vue-numeric-input

Finally decided to restrict Summary view to include only already finished matches. Requested Summary method is replaced by a filter/sorting on all matches collection, as well as Ongoing matches, which are also filtered from all matches list. Both boards, Ongoing Matches and Played Matches are shown aside for an easier checking of the implemented solution

TODO Tests have not been implemented, nor unit either e2e.
That's because I've never ever did so before (as can be checked by reading my professional resume).
Testing for all projects I've worked in before where carried by a QA dedicated department. 
Testing architechture within the app came included with Vue scaffolding.
Nevertheless, I'm quite willing and able to learn how to work within a TDD approach.

TODO Avoid duplicated matches, either to avoid a team playing against themselves.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
