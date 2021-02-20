import Vue from 'vue'
import Vuex from 'vuex'
import Team from '@/classes/Team'
import TeamService from '@/services/TeamsService'

Vue.use(Vuex)

const createScoreBoard = (teams: Team[]) => teams.map(team => Object.freeze(Object.assign({}, team)))
const findByName = (teams: Team[], name: string) => teams.find(team => team.name === name)

export default new Vuex.Store({
  state: {
    teams: <Team[]>[]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
