import {writeFileSync} from "fs";
import antdTokens from "./dark/antd-tokens.js";

const LOCKED = "700";

const VARIATIONS = [
  ["100", "78%, white"],
  ["200", "82%, white"],
  ["300", "86%, white"],
  ["400", "90%, white"],
  ["500", "94%, white"],
  ["600", "98%, white"],
  ["700", "100%, black"],
  ["800", "90%, black"],
  ["900", "80%, black"],
];

const toKebabCase = (str) => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const getPaletteElement = (color, isMainColor) => {
  return `<div style="display: inline-block; height:60px; width:200px;margin-right:15px;background-color: var(${color})"> 
    <span style="${isMainColor ? 'border-top:1px solid white;' : ''}display:inline-block; width:100%;background-color: ${antdTokens.colorBgBase};">${color}</span>
    </div>`
}

const twTheme = [];
const htmlPalette = [`<html><body style="color:white;background-color:${antdTokens.colorBgBase}">`];
for (let tn in antdTokens) {
  const twName = toKebabCase(tn);
  if(twName.split("-")[0] !== "color"){
    continue;
  }
  htmlPalette.push(`<div style="margin-top:60px"><h3>${twName}</h3>`)
  twTheme.push(`  --${twName}: ${antdTokens[tn]};`);
  twTheme.push(`  --${twName}-${LOCKED}: ${antdTokens[tn]};`);

  for(const v of VARIATIONS){
    const c = `--${twName}-${v[0]}`;
    twTheme.push(`  ${c}: color-mix(in srgb, var(--${twName}) ${v[1]});`)
    htmlPalette.push(getPaletteElement(c, v[0] == LOCKED));
  }
  htmlPalette.push(`</div>`)
}

htmlPalette.push(`</body>`)

const paletteFile = `<style>\n:root{\n${twTheme.join("\n")}\n}\n</style>\n\n${htmlPalette.join("\n")}`;
writeFileSync("palette.html", paletteFile, "utf8");

const twFile = `@theme{\n${twTheme.join("\n")}\n}\n`;
writeFileSync("dark/tailwind.css", twFile, "utf8");