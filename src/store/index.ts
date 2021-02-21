import Vue from 'vue'
import Vuex from 'vuex'
import Team from '@/classes/Team'
import Match from '@/classes/Match'
import TeamService from '@/services/TeamsService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    home: '',
    away: '',
    homeScore: 0,
    awayScore: 0,
    teams: [] as Team[],
    matches: [] as Match[]
  },
  mutations: {
    getTeams (state, teams) {
      state.teams = teams
    },
    startGame (state, match) {
      state.matches.push(match)
    },
    finishGame (state, match) {
      const index = state.matches.findIndex((m: Match) => m.started === match.started)
      if (index >= 0) {
        state.matches[index].finishMatch()
      }
    },
    updateScore (state, match) {
      console.log('mutation updateScore match', match)
      const _match = state.matches.find((m: Match) => m.match.started === match)
      _match.match.homeScore = state.homeScore
      _match.match.awayScore = state.awayScore
    },
    finishGame (state, match) {
      console.log('mutation updateScore match', match)
      const _match = state.matches.find((m: Match) => m.match.started === match)
      _match.match.finished = true
      _match.match.homeTeam.isPlaying = false
      _match.match.awayTeam.isPlaying = false
    },
    setHome (state, home) {
      state.home = home
    },
    setAway (state, away) {
      state.away = away
    },
    setHomeScore (state, score) {
      state.homeScore = score
    },
    setAwayScore (state, score) {
      state.awayScore = score
    }
  },
  actions: {
    async getTeams ({ commit }) {
      try {
        const teams = await new TeamService().fetch()
        commit('getTeams', teams)
      } catch (error) {
        console.log('getTeams error %o', error)
      }
    },
    startGame ({ commit }, { match }) {
      try {
        commit('startGame', { match })
      } catch (error) {
        console.log('startGame error %o', error)
      }
    },
    setHome ({ commit }, { home }) {
      try {
        commit('setHome', { home })
      } catch (error) {
        console.log('nextHome error %o', error)
      }
    },
    setAway ({ commit }, { away }) {
      try {
        commit('setAway', { away })
      } catch (error) {
        console.log('nextAway error %o', error)
      }
    },
    setHomeScore ({ commit }, { score }) {
      try {
        commit('setHomeScore', { score })
      } catch (error) {
        console.log('setHomeScore error %o', error)
      }
    },
    setAwayScore ({ commit }, { score }) {
      try {
        commit('setAwayScore', { score })
      } catch (error) {
        console.log('setAwayScore error %o', error)
      }
    },
    updateScore ({ commit }, { match }) {
      commit('updateScore', match)
    },
    finishGame ({ commit }, { match }) {
      commit('finishGame', match)
    }
  },
  modules: {
  }
})
