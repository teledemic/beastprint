<template>
  <div id="app">
    <!-- <MagicItem></MagicItem> -->
    <div v-if="!allBeasts.length">
      <input type="file" accept="text/xml" multiple @change="filesChange($event.target.files)" />
    </div>
    <div v-if="allBeasts.length && !printBeasts.length">
      <select v-model="selectedBeasts" multiple class="beast-select">
        <option
          v-for="beast of allBeasts"
          :key="beast.name"
          :value="beast"
        >{{beast.name}} (CR {{beast.cr}})</option>
      </select>
      <button @click="selectBeasts">Print beasts</button>
    </div>
    <div v-if="printBeasts" class="beast-list">
      <Beast v-for="beast of printBeasts" :key="beast.name" :beast="beast" />
    </div>
  </div>
</template>

<script lang="ts">
import * as xml2js from "xml2js";
import { Component, Vue } from "vue-property-decorator";

import Beast from "./components/Beast.vue";
import MagicItem from "./components/MagicItem.vue";
import { Monster, ForceArray } from "./interfaces";

const IGNORE_VARIANT = true;

@Component({
  components: {
    Beast,
    MagicItem
  }
})
export default class App extends Vue {
  private allBeasts: Monster[] = [];
  private selectedBeasts: Monster[] = [];
  private printBeasts: Monster[] = [];

  public async filesChange(fileList: FileList) {
    const files = Array.from(fileList);
    const parsed = await Promise.all(files.map(item => this.loadXML(item)));
    let monsters: Monster[] = [];
    for (const source of parsed) {
      monsters = monsters.concat(source.compendium.monster);
    }
    let beasts = monsters.filter(item => item.type.startsWith("beast"));
    // let beasts = monsters.filter(item => item.type.includes("demon") && item.cr >= 4 && item.cr <= 6);
    // || (item.type.startsWith("swarm") && item.type.includes("beasts"))
    beasts = beasts.sort((a, b) => b.cr - a.cr);
    for (const beast of beasts) {
      ForceArray(beast, "action");
      ForceArray(beast, "trait");
      for (const trait of beast.trait) {
        ForceArray(trait, "text");
      }
      if (IGNORE_VARIANT) {
        beast.action = beast.action.filter(
          item => !item.name.toLowerCase().startsWith("variant:")
        );
      }
      for (const action of beast.action) {
        ForceArray(action, "text");
        const attack = action.text[0].indexOf("Attack:");
        if (attack >= 0) {
          action.type = action.text[0].slice(0, attack + 7);
          action.text[0] = action.text[0].slice(
            attack + 7,
            action.text[0].length
          );
        }
      }
      beast.trait = beast.trait.filter(item => item.name !== "Source");
    }
    this.allBeasts = beasts;
  }
  public selectBeasts() {
    this.printBeasts = this.selectedBeasts;
  }
  public async loadXML(file: File): Promise<any> {
    const xml: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target!.result as string;
        resolve(result);
      };
      reader.onerror = e => {
        reject(
          new Error("Error reading" + file.name + ": " + e.target!.result)
        );
      };
      reader.readAsText(file);
    });
    const parsed = await new Promise((resolve, reject) => {
      xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return parsed;
  }
}
</script>

<style>
#app {
  font-family: "ScalySans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;
}
.beast-select {
  height: 600px;
  width: 200px;
}
.beast-list {
  display: flex;
  flex-wrap: wrap;
}
@font-face {
  font-family: "MrEaves";
  src: url("assets/Mr Eaves Small Caps.otf");
}
@font-face {
  font-family: "ScalySans";
  src: url("assets/Scaly Sans.otf");
  font-style: normal;
}
</style>
