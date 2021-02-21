import Vue from 'vue'
import Vuex from 'vuex'
import Team from '@/classes/Team'
import Match from '@/classes/Match'
import TeamService from '@/services/TeamsService'

Vue.use(Vuex)

// const findByName = (teams: Team[], name: string) => teams.find(team => team.name === name)

export default new Vuex.Store({
  state: {
    home: '',
    away: '',
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
      const index = state.matches.findIndex((m: Match) => m.started === match.started)
      if (index >= 0) {
        state.matches[index].updateScore(match.homeScore, match.awayScore)
      }
    },
    setHome (state, home) {
      state.home = home
    },
    setAway (state, away) {
      state.away = away
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
        commit('setHome', '')
        commit('setAway', '')
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
    }
  },
  modules: {
  }
})
