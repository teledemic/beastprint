<template>
  <div class="item-card">
    <!-- <div class="item-stats">
      <div class="item-name">{{item.name}}</div>
      <div class="item-type">{{item.type}}, {{item.rarity}}</div>
      <div class="description">{{item.description}}</div>
      <div class="description">&nbsp;&nbsp;&nbsp;{{item.description2}}</div>
    </div> -->
    <div class="item-stats">
      <div class="item-name">Hammer of Gond</div>
      <div class="item-type">Weapon (warhammer), legendary</div>
      <div class="item-type">Wielding this hammer requires a strength score of 16 or higher.</div>
      <div class="description">You gain a +1 bonus to attack and damage rolls made with this magic weapon.</div>
      <div class="description"><b>Forge's Rhythm:</b></div>
      <div class="description">&nbsp;&nbsp;&nbsp;You may spend an action hefting the hammer and beginning to swing it about your body.</div>
      <div class="description">&nbsp;&nbsp;&nbsp;Your movement speed is halved while spinning the hammer, and you may not take reactions. If you become prone, restrained, or incapacitated, you stop spinning.</div>
      <div class="description">&nbsp;&nbsp;&nbsp;On your next turn, if you are still spinning, any hits with the hammer do triple damage. You stop spinning at the end of the turn.</div>
      <div class="description"><b>Fury of Gond (Requires Attunement by a cleric or paladin):</b></div>
      <div class="description">&nbsp;&nbsp;&nbsp;As an action, you may smash this hammer into the ground to cast the Thunderwave spell as a 4th level spell, DC15. The hammer can't be used this way again until the next dawn.</div>
      <div class="description">&nbsp;&nbsp;&nbsp;<i>All creatures besides you in a 15-foot cube make DC15 CON save. On fail, 5d8 thunder damage and pushed 10 feet away. On save, 1/2 damage.</i></div>
    </div>
    <div class="item-pic">
      <img src="../assets/warhammer.png" />
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
