<template>
  <div class="beast-card">
    <div class="floating-cr">{{beast.cr}}</div>
    <div class="creature-name">{{beast.name}}</div>
    <div class="creature-type">{{beast.size | creatureSize}} {{beast.type}}, {{beast.alignment}}</div>
    <div class="divider"></div>
    <div class="attribute">
      <span class="heading">Armor Class</span>
      {{beast.ac}}
    </div>
    <div class="attribute">
      <span class="heading">Hit Points</span>
      {{beast.hp}}
    </div>
    <div class="attribute">
      <span class="heading">Speed</span>
      {{beast.speed}}
    </div>
    <div class="divider"></div>
    <div class="stats">
      <div class="stat">
        <div class="name">STR</div>
        <div class="value">{{beast.str | attribute}}</div>
      </div>
      <div class="stat">
        <div class="name">DEX</div>
        <div class="value">{{beast.dex | attribute}}</div>
      </div>
      <div class="stat">
        <div class="name">CON</div>
        <div class="value">{{beast.con | attribute}}</div>
      </div>
      <div class="stat" :class="{ override : hidebrain }">
        <div class="name">INT</div>
        <div class="value">{{beast.int | attribute}}</div>
      </div>
      <div class="stat" :class="{ override : hidebrain }">
        <div class="name">WIS</div>
        <div class="value">{{beast.wis | attribute}}</div>
      </div>
      <div class="stat" :class="{ override : hidebrain }">
        <div class="name">CHA</div>
        <div class="value">{{beast.cha | attribute}}</div>
      </div>
    </div>
    <div class="divider"></div>
    <div v-if="beast.save" class="attribute">
      <span class="heading">Saving Throws</span>
      {{beast.save}}
    </div>
    <div v-if="beast.skill" class="attribute">
      <span class="heading">Skills</span>
      {{beast.skill}}
    </div>
    <div v-if="beast.resist" class="attribute">
      <span class="heading">Damage Resistances</span>
      {{beast.resist}}
    </div>
    <div v-if="beast.immune" class="attribute">
      <span class="heading">Damage Immunities</span>
      {{beast.immune}}
    </div>
    <div v-if="beast.conditionImmune" class="attribute">
      <span class="heading">Condition Immunities</span>
      {{beast.conditionImmune}}
    </div>
    <div class="attribute">
      <span class="heading">Senses</span>
      <span v-if="beast.senses">&nbsp;{{beast.senses}},</span>
      passive perception {{beast.passive}}
    </div>
    <div class="attribute">
      <span class="heading">Languages</span>
      {{beast.languages ? beast.languages : '&mdash;'}}
    </div>
    <div class="attribute">
      <span class="heading">Challenge</span>
      {{beast.cr}}
    </div>
    <div class="divider"></div>
    <div v-for="trait of beast.trait" :key="trait.name" class="trait">
      <span class="heading">{{trait.name}}.</span>
      {{trait.text[0]}}
      <div v-for="text of trait.text.slice(1)" :key="text" class="trait-extra">{{text}}</div>
    </div>
    <div v-if="beast.action && beast.action.length">
      <div class="action-header">Actions</div>
      <div v-for="action of beast.action" :key="action.name" class="trait">
        <span class="heading">{{action.name}}.</span>
        <span v-if="action.type" class="attack-type">&nbsp;{{action.type}}</span>
        {{action.text[0]}}
        <div v-for="text of action.text.slice(1)" :key="text" class="action-extra">{{text}}</div>
      </div>
    </div>
    <div v-if="beast.legendary && beast.legendary.length">
      <div class="action-header">Legendary Actions</div>
      <div>The creature can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The creature regains spent legendary actions at the start of its turn.</div>
      <div v-for="legendary of beast.legendary" :key="legendary.name" class="trait">
        <span class="heading">{{legendary.name}}.</span>
        <span v-if="legendary.type" class="attack-type">&nbsp;{{legendary.type}}</span>
        {{legendary.text[0]}}
        <div v-for="text of legendary.text.slice(1)" :key="text" class="action-extra">{{text}}</div>
      </div>
    </div>
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
    attribute: (value: string) => {
      const val = Number(value);
      const modifier = Math.floor((val - 10) / 2);
      return value + " (" + (modifier < 0 ? "" : "+") + modifier + ")";
    }
  }
})
export default class Beast extends Vue {
  @Prop() public beast!: Monster;
  public hidebrain = true;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.beast-card {
  font-style: normal;
  width: 360px;
  font-size: 15px;
  color: black;
  padding: 20px;
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
}
.floating-cr {
  position: absolute;
  right: 0;
  height: 50px;
  width: 50px;
  text-align: center;
  vertical-align: middle;
  background-color: black;
  color: white;
  font-size: 40px;
  font-family: "MrEaves";
}
.divider {
  max-width: 100%;
  min-height: 5px;
  background-image: url(../assets/divider.svg);
  background-size: contain;
  background-repeat: no-repeat;
  margin: 10px 0;
}
.creature-name {
  font-family: "MrEaves";
  /* color: #822000; */
  font-weight: bold;
  font-size: 34px;
}
.creature-type {
  font-style: italic;
  margin-bottom: 15px;
}
.attribute {
  /* color: #822000; */
  margin: 5px 0;
  margin-left: 20px;
  text-indent: -20px;
}
.attribute .heading {
  font-weight: bold;
}
.stats {
  display: flex;
  /* color: #822000; */
  justify-content: space-evenly;
  font-size: 14px;
}
.stats .stat {
  text-align: center;
}
.stats .stat.override {
  opacity: 0.5;
}
.stats .stat .name {
  font-weight: bold;
}
.trait {
  margin: 5px 0;
  line-height: 1.1;
}
.trait .heading {
  font-weight: bold;
  font-style: italic;
}
.action-header {
  font-variant-caps: small-caps;
  /* color: #822000; */
  font-size: 24px;
  border-bottom: 1px black solid;
  margin: 10px 0;
}
.attack-type {
  font-style: italic;
}
.action-extra {
  margin-top: 5px;
  text-indent: 20px;
}
.trait-extra {
  margin-top: 5px;
  margin-left: 20px;
  text-indent: -20px;
}
</style>
