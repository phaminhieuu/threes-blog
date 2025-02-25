import { createHighlighterCore, type ThemeInput } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine-javascript.mjs";
import { transformerNotationHighlight } from "@shikijs/transformers";

const theme: ThemeInput = {
  name: "novaera",
  bg: "var(--color-background)",
  fg: "var(--color-plain)",
  settings: [
    {
      scope: ["comment"],
      settings: {
        foreground: "var(--color-comment)",
        fontStyle: "italic",
      },
    },
    {
      scope: ["string"],
      settings: {
        foreground: "var(--color-function)",
      },
    },
    {
      scope: ["keyword.operator"],
      settings: {
        foreground: "var(--color-plain)",
      },
    },
    {
      scope: [
        "keyword.control",
        "keyword.operator.new",
        "storage.type",
        "storage.modifier",
        "variable.language",
      ],
      settings: {
        foreground: "var(--color-keyword)",
      },
    },
    {
      scope: [
        "entity.name.function",
        "entity.name.tag",
        "variable.other.object.property",
        "variable.other.property",
        "variable.object.property",
        "support.variable.property",
      ],
      settings: {
        foreground: "var(--color-primary)",
      },
    },
    {
      scope: ["constant", "variable.language.super"],
      settings: {
        foreground: "var(--color-static)",
      },
    },
  ],
};

export async function highlightCode(code: string, lang: string) {
  const highlighter = await createHighlighterCore({
    langs: [
      import("@shikijs/langs/javascript"),
      import("@shikijs/langs/typescript"),
      import("@shikijs/langs/jsx"),
      import("@shikijs/langs/tsx"),
      import("@shikijs/langs/glsl"),
      import("@shikijs/langs/markdown"),
      import("@shikijs/langs/html"),
      import("@shikijs/langs/css"),
    ],
    themes: [theme],
    engine: createJavaScriptRegexEngine(),
  });

  return highlighter.codeToHtml(code, {
    lang,
    theme: "novaera",
    transformers: [transformerNotationHighlight()],
  });
}
