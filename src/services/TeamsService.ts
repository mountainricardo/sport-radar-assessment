import Team from '@/classes/Team'
import jsonFwcCountries from '@/assets/fwcCountries.json'

const TEAMS_STORAGE_KEY = 'lfwcsb'

export default class TeamsService {
  fetch(): Team[] {
    const teams = JSON.parse(localStorage.getItem(TEAMS_STORAGE_KEY) || '[]')
    if(teams.length === 0) {
      for (let country of jsonFwcCountries) {
        teams.push(new Team(country))
      }
      this.save(teams)
    }
    return teams
  }

  save(teams: Team[]) {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams))
  }
}
