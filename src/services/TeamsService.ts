import Team from '@/classes/Team'

// 'lfwcsb' stands for Live Football World Cup Store Board
const TEAMS_STORAGE_KEY = 'lfwcsb_teams'
const countries = [
  'Argentina',
  'Australia',
  'Brazil',
  'Canada',
  'France',
  'Germany',
  'Italy',
  'Mexico',
  'Spain',
  'Uruguay'
]

export default class TeamsService {
  async fetch (): Promise<Team[]> {
    const teams = await JSON.parse(localStorage.getItem(TEAMS_STORAGE_KEY) || '[]')
    if (teams.length === 0) {
      for (const country of countries) {
        teams.push(new Team(country))
      }
      this.save(teams)
    }
    return teams
  }

  save (teams: Team[]) {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams))
  }
}
