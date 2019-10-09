<template>
  <div class="item-card">
    <div class="item-stats">
      <div class="item-name">{{item.name}}</div>
      <div class="item-type">{{item.type}}, {{item.rarity}}</div>
      <div class="description">{{item.description}}</div>
      <div class="description">&nbsp;&nbsp;&nbsp;{{item.description2}}</div>
    </div>
    <div class="item-pic">
      <img src="../assets/talon.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Monster } from "../interfaces";

@Component
export default class MagicItem extends Vue {
  public item = {
    name: "Talon (upgraded)",
    type: "Weapon (longsword)",
    rarity: "rare",
    description:
      "You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.",
    description2:
      "In addition, you can speak the sword's command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-card {
  font-style: normal;
  width: 600px;
  font-size: 15px;
  color: black;
  padding: 20px;
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
  display: flex;
}
.item-stats {
  margin-right: 20px;
}
.item-pic img {
  max-width: 200px;
}
.item-name {
  font-family: "MrEaves";
  /* color: #822000; */
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 4px;
}
.item-type {
  font-style: italic;
  margin-bottom: 15px;
}
.description {
  margin: 5px 0;
  line-height: 1.1;
}
.description .heading {
  font-weight: bold;
  font-style: italic;
}
</style>
