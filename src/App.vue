<template>
  <div id="app">
    <input type="file" accept="text/xml" multiple @change="filesChange($event.target.files)" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import * as xml2js from "xml2js";

import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  public async filesChange(fileList: FileList) {
    const files = Array.from(fileList);
    const parsed = await Promise.all(files.map((item) => this.loadXML(item)));
    let monsters: Monster[] = [];
    for (const source of parsed) {
      monsters = monsters.concat(source.compendium.monster);
    }
    const beasts = monsters.filter((item) => item.type.startsWith("beast"));
    console.log(beasts);
  }
  public async loadXML(file: File): Promise<any> {
    const xml: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target!.result as string;
        resolve(result);
      };
      reader.onerror = (e) => {
        reject(new Error("Error reading" + file.name + ": " + e.target!.result));
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

interface Monster {
  ac: string;
  type: string;
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
