<template>
  <div id="app">
    <div v-if="!beasts.length">
      <input type="file" accept="text/xml" multiple @change="filesChange($event.target.files)" />
    </div>
    <div v-if="beasts" class="beast-list">
      <Beast v-for="beast of beasts" :key="beast.name" :beast="beast" />
    </div>
  </div>
</template>

<script lang="ts">
import * as xml2js from "xml2js";
import { Component, Vue } from "vue-property-decorator";

import Beast from "./components/Beast.vue";
import { Monster, ForceArray } from "./interfaces";

@Component({
  components: {
    Beast
  }
})
export default class App extends Vue {
  private beasts: Monster[] = [];

  public async filesChange(fileList: FileList) {
    const files = Array.from(fileList);
    const parsed = await Promise.all(files.map(item => this.loadXML(item)));
    let monsters: Monster[] = [];
    for (const source of parsed) {
      monsters = monsters.concat(source.compendium.monster);
    }
    const beasts = monsters.filter(item => item.type.startsWith("beast"));
    // || (item.type.startsWith("swarm") && item.type.includes("beasts"))
    for (const beast of beasts) {
      ForceArray(beast, "action");
      ForceArray(beast, "trait");
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
    this.beasts = beasts.slice(0, 12);
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
