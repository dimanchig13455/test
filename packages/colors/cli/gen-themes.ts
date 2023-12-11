import fs from "node:fs";

import * as cssTree from "css-tree";
import prettier from "prettier";
import tiny from "tinycolor2";

import {ThemeConfig, ThemeFileType} from "./config";
import genButtonShades from "./gen-button-shades";

const generateTheme = ({source, type}: {source: string; type: ThemeFileType}) => {
  const buttonBases = [
    "signal-primary",
    "signal-secondary",
    "signal-danger",
    "signal-warning",
    "signal-info",
    "signal-success",
    "interaction-norm",
    "interaction-weak",
  ];

  const buttonShadeNames = ["-minor-2", "-minor-1", "", "-major-1", "-major-2", "-major-3", "-contrast"];

  const ast = cssTree.parse(source);

  cssTree.walk(ast, (node, item, list) => {
    if (node.type !== "Declaration") {
      return;
    }

    if (node.value.type !== "Raw") {
      return;
    }

    const baseName = node.property.substring(2);

    if (!buttonBases.includes(baseName)) {
      return;
    }

    /*
     * make sure we don't visit the same base name again
     * by removing it from the array of button base names
     */
    buttonBases.splice(buttonBases.indexOf(baseName), 1);

    const isLight = type === "light";

    const base = tiny(node.value.value);

    const buttonShades = genButtonShades(base, isLight);

    /* here we don't use tiny.mostReadable to prioritize white against black color. */
    const buttonContrast = tiny(tiny.isReadable(base, "white", {level: "AA", size: "large"}) ? "white" : "black");

    // use original input when color contains alpha channel (opacity, e.g. rgba)
    const declarations = [...buttonShades, buttonContrast].map((color, i) =>
      list.createItem({
        type: "Declaration",
        important: false,
        property: "--" + baseName + buttonShadeNames[i],
        value: {type: "Raw", value: color.getAlpha() === 1 ? color.toHexString() : color.toString()},
      }),
    );

    if (!item.next) {
      for (const declaration of declarations) {
        list.append(declaration);
      }
    } else {
      /* list.insert() inserts after the next element, so we reverse insertion order */
      for (let i = declarations.length - 1; i >= 0; i--) {
        list.insert(declarations[i], item.next);
      }
    }

    /* base is consumed, we don't need it anymore, and we don't want to re-visit */
    list.remove(item);
  });

  return cssTree.generate(ast);
};

export const main = async ({output, files}: ThemeConfig) => {
  const sources = files.map(({path, type}) => ({
    source: fs.readFileSync(path, {encoding: "utf-8"}),
    type,
  }));

  const generatedCssFiles = sources.map(generateTheme);

  const autoGenerateDisclaimer = [
    "/*",
    " * This file is automatically generated.",
    " * Manual changes will be lost.",
    " */",
  ].join("\n");

  const cssFile = [autoGenerateDisclaimer, ...generatedCssFiles].join("\n\n");

  const prettierCssFile = await prettier.format(cssFile, {parser: "css"});

  fs.writeFileSync(output, prettierCssFile);

  return output;
};