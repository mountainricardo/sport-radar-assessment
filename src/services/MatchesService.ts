import Match from '@/classes/Match'

// 'lfwcsb' stands for Live Football World Cup Store Board
const MATCHES_STORAGE_KEY = 'lfwcsb_matches'

export default class MatchesService {
  async fetch (): Promise<Match[]> {
    const matches = await JSON.parse(localStorage.getItem(MATCHES_STORAGE_KEY) || '[]')
    return matches
  }

  save (matches: Match[]) {
    localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches))
  }
}
