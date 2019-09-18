<template>
  <div id="app">
    <input type="file" accept="text/xml" multiple @change="filesChange($event.target.files)" />
    <div v-if="beasts">
      <Beast v-for="beast of beasts" :key="beast.name" :beast="beast" />
    </div>
  </div>
</template>

<script lang="ts">
import * as xml2js from "xml2js";
import { Component, Vue } from "vue-property-decorator";

import Beast from "./components/Beast.vue";
import { Monster } from "./interfaces";

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
    this.beasts = monsters.filter(item => item.type.startsWith("beast"));
    console.log(this.beasts);
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
  color: #2c3e50;
  margin-top: 60px;
}
@font-face {
  font-family: "MrEaves";
  src: url("assets/Mr Eaves Small Caps.otf");
}
@font-face {
  font-family: "Bookinsanity";
  src: url("assets/Bookinsanity.otf");
}
@font-face {
  font-family: "Bookinsanity";
  src: url("assets/Bookinsanity Italic.otf");
  font-style: italic, oblique;
}
@font-face {
  font-family: "Bookinsanity";
  src: url("assets/Bookinsanity Bold.otf");
  font-weight: bold;
}
@font-face {
  font-family: "Bookinsanity";
  src: url("assets/Bookinsanity Bold Italic.otf");
  font-weight: bold;
  font-style: italic, oblique;
}
@font-face {
  font-family: "ScalySans";
  src: url("assets/Scaly Sans.otf");
  font-style: normal;
}
@font-face {
  font-family: "ScalySans";
  src: url("assets/Scaly Sans Italic.otf");
  font-style: italic, oblique;
}
@font-face {
  font-family: "ScalySans";
  src: url("assets/Scaly Sans Bold.otf");
  font-weight: bold;
}
@font-face {
  font-family: "ScalySans";
  src: url("assets/Scaly Sans Bold Italic.otf");
  font-weight: bold;
  font-style: italic, oblique;
}
</style>
