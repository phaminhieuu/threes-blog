"use client";

import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  type SandpackPredefinedTemplate,
  SandpackPreview,
  type SandpackThemeProp,
} from "@codesandbox/sandpack-react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import Tabs, { type Tab } from "./components/tabs";
import setupFiles from "./setup-files";
import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface Props {
  template: SandpackPredefinedTemplate;
  files?: Record<string, any>;
  dependencies?: Record<string, string>;
  autorun?: boolean;
  defaultTab?: Tab;
}

export const theme: SandpackThemeProp = {
  colors: {
    surface1: "var(--color-background)",
    surface2: "var(--color-border)",
    surface3: "var(--color-background)",
    hover: "var(--color-foreground)",
    clickable: "var(--color-muted-foreground)",
    accent: "var(--color-primary)",
    error: "var(--color-destructive)",
    errorSurface: "var(--color-background)",
  },
  syntax: {
    plain: "var(--color-plain)",
    comment: {
      color: "var(--color-comment)",
      fontStyle: "italic",
    },
    tag: "var(--color-primary)",
    keyword: "var(--color-keyword)",
    punctuation: "var(--color-punctuation)",
    definition: "var(--color-function)",
    property: "var(--color-primary)",
    static: "var(--color-static)",
    string: "var(--color-function)",
  },
  font: {
    size: "14px",
    lineHeight: "20px",
  },
};

const EDITOR_HEIGHT = 640;

export default function Sandpack(props: Props) {
  const {
    template,
    files,
    dependencies,
    autorun = true,
    defaultTab = "preview",
  } = props;

  const [consoleKey, setConsoleKey] = useState(0);
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      className={cn("bg-background", {
        "fixed inset-0 z-50": isFullScreen,
        "relative lg:w-[calc(100%+400px)] lg:-mx-[200px]": !isFullScreen,
      })}
    >
      <SandpackProvider
        theme={theme}
        template={template}
        files={{
          ...setupFiles,
          ...files,
        }}
        customSetup={{
          entry: "/index.html",
          dependencies,
        }}
        options={{
          autorun,
        }}
      >
        <SandpackLayout
          style={{
            borderRadius: "8px",
          }}
        >
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full flex flex-col lg:flex-row flex-nowrap overflow-hidden"
          >
            <ResizablePanel className="w-full lg:w-1/2">
              <SandpackCodeEditor
                showTabs
                showLineNumbers
                showInlineErrors
                style={{
                  width: "100%",
                  height: isFullScreen ? "100vh" : EDITOR_HEIGHT,
                }}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="w-full lg:w-1/2 lg:border-l border-t lg:border-t-0">
              <Tabs
                currentTab={tab}
                onTabChange={setTab}
                onClear={() => setConsoleKey((prev) => prev + 1)}
                onFullScreen={() => setIsFullScreen((prev) => !prev)}
              />

              <SandpackPreview
                showRefreshButton={false}
                showOpenInCodeSandbox={false}
                style={{
                  height: isFullScreen
                    ? "calc(100vh - 42px)"
                    : EDITOR_HEIGHT - 42,
                  display: tab === "preview" ? "flex" : "none",
                }}
              />

              <SandpackConsole
                key={consoleKey}
                showHeader
                style={{
                  height: isFullScreen
                    ? "calc(100vh - 42px)"
                    : EDITOR_HEIGHT - 42,
                  display: tab === "console" ? "flex" : "none",
                }}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
