<template>
  <div class="hello">
    <h1>LFWCSB</h1>
    <div class="score-board">
      <div class="ongoing">
        <h2>Ongoing Matches</h2>
        <div class="new-match-heading">
          <v-select
          label="name"
          @input="nextHome"
          :options="teams"
          placeholder="Home"
          :value="home.name"
          :clearable="false"
          class="team-select"
        ></v-select>
          <v-select
          label="name"
          @input="nextAway"
          :options="teams"
          placeholder="Away"
          :value="away.name"
          :clearable="false"
          class="team-select"
        ></v-select>
          <button
            @click="startNewGame(home, away)"
            :disabled="!home || !away"
          >Start new Match</button>
        </div>
        <ol class="board" style="border: 1px solid dotted">
          <li
            v-for="m in ongoingMatches"
            :key="m.match.started"
            style="border-bottom: 1px solid grey"
          >
            {{ m.match.homeTeam.name
              + ' vs. ' + m.match.awayTeam.name + ': ' + m.match.homeScore + ' - ' + m.match.awayScore }}
          </li>
        </ol>

      </div>
      <div class="summary">
        <h2>All Played Matches</h2>
        <ol class="board" style="border: 1px solid dotted">
          <li
            v-for="m in matchesSummary"
            :key="m.match.started"
            style="border-bottom: 1px solid grey"
          >
            {{ m.match.homeTeam.name
              + ' vs. ' + m.match.awayTeam.name + ': ' + m.match.homeScore + ' - ' + m.match.awayScore }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Match from '@/classes/Match'
import Team from '@/classes/Team'
import { mapActions } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

@Component({
  components: {
    vSelect
  },
  computed: {
    home: {
      get: function () {
        return this.$store.state.home
      }
    },
    away: {
      get: function () {
        return this.$store.state.away
      }
    },
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
        return [...this.$store.state.matches].sort((a: Match, b: Match) => {
          const aScore = Number(a.match.homeScore) + Number(a.match.awayScore)
          const bScore = Number(b.match.homeScore) + Number(b.match.awayScore)
          return (aScore - bScore !== 0)
            ? aScore - bScore
            : b.match.started - a.match.started
        })
      }
    }
  },
  methods: {
    ...mapActions(['getTeams', 'startGame', 'setHome', 'setAway']),

    nextHome (val) {
      const home = val.name
      this.setHome({ home })
    },

    nextAway (val) {
      const away = val.name
      this.setAway({ away })
    },

    startNewGame (home: Team, away: Team): void {
      const homeIndex = this.teams.findIndex((t: Team) => t.name === home.home)
      const awayIndex = this.teams.findIndex((t: Team) => t.name === away.away)
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
.score-board {
  display: flex;
  flex-direction: row;
  .ongoing{
    width: 50%;
    display: flex;
    flex-direction: column;
    .new-match-heading {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .team-select {
        width:200px;
      }
    }
  }
  .summary {
    width: 50%;
  }
  .board {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
