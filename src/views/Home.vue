<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <ScoreBoard msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import ScoreBoard from '@/components/ScoreBoard.vue' // @ is an alias to /src

@Component({
  components: {
    // HelloWorld
    ScoreBoard
  },
  methods: {
    ...mapActions(['getTeams'])
  },
  created () {
    this.getTeams()
  }
})
export default class Home extends Vue {}
</script>
