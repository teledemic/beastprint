<template>
  <div class="beast-card">
    <h1>{{beast.name}}</h1>
    <div class="creature-type">{{beast.size | creatureSize}} beast, {{beast.alignment}}</div>
    <div class="statistic"><span class="heading">Armor Class</span> {{beast.ac}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Monster } from "../interfaces";

@Component({
  filters: {
    creatureSize: (value: string) => {
      switch (value) {
        case "T":
          return "Tiny";
        case "S":
          return "Small";
        case "M":
          return "Medium";
        case "L":
          return "Large";
        case "H":
          return "Huge";
        case "G":
          return "Gargantuan";
        default:
          return value;
      }
    },
  },
})
export default class Beast extends Vue {
  @Prop() private beast!: Monster;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: "MrEaves";
  color: #822000;
}
.creature-type {
  font-style: italic;
}
.statistic {
  font-style: normal;
}
</style>
