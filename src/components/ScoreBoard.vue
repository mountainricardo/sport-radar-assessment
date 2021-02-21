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
        <div class="new-score-heading">
          <label for="homescore">
            Home Team Score:
            <vue-numeric-input
              name="homescore"
              v-model="homeScore"
              :min="0"
              :max="20"
              :step="1"
              align="center"
            ></vue-numeric-input>
          </label>
          <label for="awayscore">
            Away Team Score:
          <vue-numeric-input
            name="awayscore"
            v-model="awayScore"
            :min="0"
            :max="20"
            :step="1"
            align="center"
          ></vue-numeric-input>
          </label>        </div>
        <ol class="board" style="border: 1px solid dotted">
          <li
            v-for="m in ongoingMatches"
            :key="m.match.started"
            style="border-bottom: 1px solid grey"
          >
            <p>
              <span class="score">
              {{ m.match.homeTeam.name
                + ' vs. ' + m.match.awayTeam.name + ': ' + m.match.homeScore + ' - ' + m.match.awayScore }}
              </span>
              <span class="actions">
                <button
                  @click.stop="updateMatchScore(m.match.started)"
                >Update Score</button>
                <button
                  @click.stop="finishMatch(m.match.started)"
                >Finish Match</button>
              </span>
            </p>
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
          <p>
            {{ m.match.homeTeam.name
              + ' vs. ' + m.match.awayTeam.name + ': ' + m.match.homeScore + ' - ' + m.match.awayScore }}
          </p>
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
import VueNumericInput from 'vue-numeric-input'

@Component({
  components: {
    vSelect,
    VueNumericInput
  },
  props: {

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
    homeScore: {
      get: function () {
        return this.$store.state.homeScore
      },
      set: function (newValue) {
        this.$store.commit('setHomeScore', newValue)
      }
    },
    awayScore: {
      get: function () {
        return this.$store.state.awayScore
      },
      set: function (newValue) {
        this.$store.commit('setAwayScore', newValue)
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
      }
    },
    ongoingMatches: {
      get: function () {
        return this.$store.state.matches.filter((match: Match) => !match.match.finished)
      }
    },
    matchesSummary: {
      get: function () {
        return [...this.$store.state.matches]
          .filter((m: Match) => m.match.finished)
          .sort((a: Match, b: Match) => {
            const aScore = Number(a.match.homeScore) + Number(a.match.awayScore)
            const bScore = Number(b.match.homeScore) + Number(b.match.awayScore)
            return (aScore - bScore !== 0)
              ? bScore - aScore
              : b.match.started - a.match.started
          })
      }
    }
  },
  methods: {
    ...mapActions([
      'getTeams',
      'startGame',
      'updateScore',
      'setHome',
      'setAway',
      'setHomeScore',
      'setAwayScore',
      'finishGame'
    ]),

    nextHome (val) {
      const home = val.name
      this.setHome({ home })
    },

    nextAway (val) {
      const away = val.name
      this.setAway({ away })
    },

    setHomeScore (val) {
      console.log('setHomeScore')
      const score = val
      this.setHomeScore({ score })
    },

    setAwayScore (val) {
      console.log('setAwayScore')
      const score = val
      this.setAwayScore({ score })
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
    updateMatchScore (started: number): void {
      const match = started
      this.updateScore({ match })
    },
    finishMatch (started: number): void {
      const match = started
      this.finishGame({ match })
    }
  },
  created () {
    this.getTeams()
  }
})
export default class ScoreBoard extends Vue {}
</script>

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
    .new-score-heading {
      margin: 2rem 0;
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
    li p {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      .score {
        align-self: flex-start;
      }
      .actions {
        align-self: flex-end;
        *:last-child {
          margin-left: 1rem;
        }
      }
    }
  }
}
</style>
