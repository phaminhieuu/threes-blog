import dynamic from "next/dynamic";
import Image from "./image";

const Callout = dynamic(() => import("./callout"));
const CodeLine = dynamic(() => import("./code/code-line"));
const CodeBlock = dynamic(() => import("./code/code-block"));

const SpringVisualizer = dynamic(
  () => import("./widgets/spring-animation/spring-visualizer"),
);

const PointSphereSandpack = dynamic(
  () => import("./widgets/points-sphere/sandpack"),
);

const customComponents = {
  Callout,
  SpringVisualizer,
  // Sandpack
  PointSphereSandpack,
};

const MDXComponents = {
  pre: CodeBlock,
  code: CodeLine,
  Image,
  ...customComponents,
};

export default MDXComponents;
