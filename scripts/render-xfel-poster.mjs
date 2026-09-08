import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";

process.chdir(fileURLToPath(new URL("../",import.meta.url)));
// Compile only our local artwork component so the social preview shares its geometry.
const source=await readFile("components/xfel-system-map.tsx","utf8");
const compiled=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const artwork=new Function("require","exports",`${compiled}\nreturn exports;`)(createRequire(import.meta.url),{}).XfelMapArtwork;
const palette={"--surface":"#101012","--background-default":"#000000","--text-primary":"#f5f5f7","--text-secondary":"#a1a1a6","--accent":"#7bd5ff","--brand-accent":"#f18f1f","--map-reveal":"1"};
const css=(await readFile("app/xfel-map.css","utf8")).split(".case-card-art:has")[0].replace(/var\((--[\w-]+)\)/g,(_,key)=>palette[key]||"1");
const markup=renderToStaticMarkup(React.createElement(artwork));
const svg=markup.replace('<svg ', '<svg width="1600" height="900" style="width:1600px;height:900px" ').replace(/(<svg[^>]+>)/,`$1<style>${css}.xfel-route-active path{stroke-dashoffset:0}.xfel-packet{display:none}.xfel-channel-nodes{opacity:1}</style><rect width="960" height="640" fill="#101012"/>`);
await writeFile("public/media/xfel-system-map.svg",svg);
await sharp(Buffer.from(svg)).flatten({background:"#101012"}).png().toFile("public/media/xfel-system-map.png");
console.log("Rendered the shared system-map artwork to public/media/xfel-system-map.svg and .png");
