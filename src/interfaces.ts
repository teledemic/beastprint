export interface Monster {
  type: string;
  name: string;
  size: string;
  alignment: string;
  ac: string;
  hp: string;
  speed: string;
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
  save?: string;
  skill?: string;
  resist?: string;
  conditionImmune?: string;
  immune?: string;
  senses?: string;
  passive: string;
  languages?: string;
  action: Trait[];
  trait: Trait[];
  cr: number;
}

interface Trait {
  name: string;
  text: string[];
  type?: string;
}

export function ForceArray(obj: any, property: string) {
  if (obj[property]) {
    if (!Array.isArray(obj[property])) {
      obj[property] = [obj[property]];
    }
  } else {
    obj[property] = [];
  }
}
