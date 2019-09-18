export interface Monster {
  name: string;
  size: string;
  alignment: string;
  ac: string;
  type: string;
  action: Action[];
  skill: string;
  senses: string;
  languages: string;
}

interface Action {
  attack: string;
  name: string;
  text: string;
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
