import Vue from 'vue'
import Vuex from 'vuex'
import Team from '@/classes/Team'
import Match from '@/classes/Match'
import TeamService from '@/services/TeamsService'

Vue.use(Vuex)

// const findByName = (teams: Team[], name: string) => teams.find(team => team.name === name)

export default new Vuex.Store({
  state: {
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
    }
  },
  modules: {
  }
})
