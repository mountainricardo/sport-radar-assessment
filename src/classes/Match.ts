import Team from './Team'

interface MatchInterface {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  started: number;
  finished: boolean;
}
export default class Match implements MatchInterface {
  // Match is created when the Match starts
  // so it initializes Teams, scores to 0, and started time (ms)
  constructor (home: Team, away: Team) {
    this.homeTeam = home
    this.awayTeam = away
    // this.homeTeam.startMatch()
    // this.awayTeam.startMatch()
    this.homeTeam.isPlaying = true
    this.awayTeam.isPlaying = true
    this.homeScore = 0
    this.awayScore = 0
    // Virtually impossible two matches with same number of started ms
    // so, started attribute will work as unique numeric ID
    this.started = new Date().getTime()
    console.log('Match constructor started', this.started)
  }

  // references a team in teams collection
  homeTeam: Team

  awayTeam: Team

  //  keeps home/away score for this match
  homeScore: number

  awayScore: number
  // get started date/time in miliseconsds for ordering the summary
  // alongside with total score ammount
  started = 0
  // finished attribute allow to filter finished matches from score board
  // but keeps them enlisted for summary
  finished = false
  // method for updating match score
  updateScore (home: number, away: number) {
    this.homeScore = home
    this.awayScore = away
  }

  // method for finishing the match
  // it doesn't update score
  finishMatch () {
    this.finished = true
    this.homeTeam.finishMatch()
    this.awayTeam.finishMatch()
  }
}
