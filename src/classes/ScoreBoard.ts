import Match from './Match'
interface ScoreBoardInterface {
  matches: Match[],
}
export default class ScoreBoard implements ScoreBoardInterface {
  constructor(matches: Match[]){
    this.matches = matches
  }
  matches: Match[]
  updateScoreBoard (matches: Match[]): void {
    this.matches = matches
  }
  serveOngoingMatches (): Match[] {
    return this.matches.filter(match => !match.finished)
  }
  serveAllMatches (): Match[] {
    return this.matches
  }
}