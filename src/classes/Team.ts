interface TeamInterface {
  name: string
  isPlaying: boolean
}
export default class Team implements TeamInterface {
  constructor(name: string){
    this.name = name
  }
  name:string
  isPlaying = false
  startMatch () {
    this.isPlaying = true
  }
  finishMatch () {
    this.isPlaying = false
  }
}