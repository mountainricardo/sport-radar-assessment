<template>
  <div class="hello">
    <h1>LFWCSB</h1>
    <button @click="startNewGame('Spain', 'Argentina')">Start</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Match from '@/classes/Match'
import Team from '@/classes/Team'
import { mapActions } from 'vuex'

@Component({
  components: {

  },
  computed: {
    teams: {
      get: function () {
        return this.$store.state.teams
      }
    },
    matches: {
      get: function () {
        return this.$store.state.matches
      },
      set: function (newValue: Match[]) {
        // this.matches = newValue
      }
    },
    ongoingMatches: {
      get: function () {
        return this.$store.state.matches.filter((match: Match) => !match.finished)
      }
    },
    matchesSummary: {
      get: function () {
        return this.$store.state.matches.sort((a: Match, b: Match) => {
          const aScore = a.homeScore + a.awayScore
          const bScore = b.homeScore + b.awayScore
          return (aScore - bScore !== 0)
            ? aScore - bScore
            : a.started - b.started
        })
      }
    }
  },
  methods: {
    ...mapActions(['getTeams', 'startGame']),

    startNewGame (home: string, away: string): void {
      const homeIndex = this.teams.findIndex((t: Team) => t.name === home)
      console.log('homeTeam index', homeIndex)
      const awayIndex = this.teams.findIndex((t: Team) => t.name === away)
      console.log('awayTeam index', awayIndex)
      console.log('homeTeam isPlaying', !this.teams[homeIndex].isPlaying)
      console.log('awayTeam isPlaying', !this.teams[awayIndex].isPlaying)
      if (
        homeIndex >= 0 &&
        awayIndex >= 0 &&
        !this.teams[homeIndex].isPlaying &&
        !this.teams[awayIndex].isPlaying
      ) {
        const match = new Match(this.teams[homeIndex], this.teams[awayIndex])
        this.startGame({ match })
      }
    },

    finishGame (match: Match): void {
      const _match = this.matches.findIndex((m: Match) => m.started === match.started)
      if (_match >= 0) {
        this.matches[_match].homeTeam.isPlaying = false
        this.matches[_match].awayTeam.isPlaying = false
        this.matches[_match].finished = true
      }
    },
    updateScoreBoard (home: number, away: number): void {
      // matchIndex = this.matches.find
      // this.matches = matches
    }
  },
  created () {
    this.getTeams()
  }
})
export default class ScoreBoard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
