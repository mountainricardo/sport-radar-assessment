<template>
  <div class="home">
    <img style="max-width:300px" alt="LFWCSB logo" src="../assets/Soccerball.svg">
    <score-board/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import ScoreBoard from '@/components/ScoreBoard.vue'

@Component({
  components: {
    ScoreBoard
  },
  methods: {
    ...mapActions(['getTeams', 'getMatches'])
  },
  created () {
    this.getTeams()
    this.getMatches()
  }
})
export default class Home extends Vue {}
</script>
