import dynamic from "next/dynamic";

const Callout = dynamic(() => import("./callout"));
const CodeLine = dynamic(() => import("./code/code-line"));
const CodeBlock = dynamic(() => import("./code/code-block"));

const PointSphereSandpack = dynamic(
  () => import("./widgets/points-sphere/sandpack"),
);

const customComponents = {
  Callout,
  // Sandpack
  PointSphereSandpack,
};

const MDXComponents = {
  pre: CodeBlock,
  code: CodeLine,
  ...customComponents,
};

export default MDXComponents;
