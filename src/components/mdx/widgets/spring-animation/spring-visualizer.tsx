"use client";

import { motion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRightLeft, Expand, Rotate3d, RotateCw } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { curveBasisOpen } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { cn } from "@/lib/cn";

const loop = (stiffness: number, mass: number, damping: number) => {
  /* Spring Length, set to 1 for simplicity */
  const springLength = 1;

  /* Object position and velocity. */
  let x = 0;
  let v = 0;

  const k = -stiffness;

  const d = -damping;

  const frameRate = 1 / 60;

  const positions = [];
  let i = 0;

  while (i < 600) {
    const Fspring = k * (x - springLength);
    const Fdamping = d * v;

    const a = (Fspring + Fdamping) / mass;
    v += a * frameRate;
    x += v * frameRate;

    i++;

    positions.push({
      y: x,
      x: i,
    });
  }

  return positions;
};

const getX = (d: { x: number; y: number }) => d.x;
const getY = (d: { x: number; y: number }) => d.y;

const height = 200;
const width = 320;

type SpringType = "move" | "scale" | "rotate";

export default function SpringVisualizer() {
  const boxRef = useRef<HTMLDivElement>(null);

  const [stiffness, setStiffness] = useState(300);
  const [mass, setMass] = useState(1);
  const [damping, setDamping] = useState(20);

  const [type, setType] = useState<SpringType>("move");

  const initialData = loop(stiffness, mass, damping);
  const [data, setData] = useState(initialData);

  const [count, setCount] = useState(0);

  const xScale = scaleLinear({
    range: [width, 0],
    domain: [data[data.length - 1].x, data[0].x],
    nice: true,
  });

  const yScale = scaleLinear({
    range: [height, 0],
    domain: [
      Math.min.apply(
        Math,
        data.map((d) => d.y),
      ),
      Math.max.apply(
        Math,
        data.map((d) => d.y),
      ),
    ],
    nice: true,
  });

  useEffect(() => {
    setData(loop(stiffness, mass, damping));
    setCount(count + 1);
  }, [stiffness, mass, damping, type]);

  return (
    <div className="border rounded-lg bg-background flex flex-col md:flex-row overflow-hidden">
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <svg width={width} height={height}>
              <title>Spring Visualizer</title>
              <LinePath
                data={data}
                x={(d) => xScale(getX(d)) ?? 0}
                y={(d) => yScale(getY(d)) ?? 0}
                curve={curveBasisOpen}
                strokeWidth={2}
                strokeOpacity={0.8}
                strokeLinecap="round"
                fill="none"
                className="stroke-function"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              Stiffness
              <div>{stiffness}</div>
            </div>
            <Slider
              defaultValue={[stiffness]}
              max={500}
              step={1}
              onValueChange={([value]) => setStiffness(value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              Mass
              <div>{mass}</div>
            </div>
            <Slider
              defaultValue={[mass]}
              max={5}
              step={1}
              onValueChange={([value]) => setMass(value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              Damping
              <div>{damping}</div>
            </div>
            <Slider
              defaultValue={[damping]}
              max={25}
              step={1}
              onValueChange={([value]) => setDamping(value)}
            />
          </div>
        </div>
      </div>
      <div className="border-t md:border-t-0 md:border-l w-full space-y-6">
        <div className="relative aspect-square w-full">
          <svg
            className="absolute inset-0 w-full text-border"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.25"
            strokeLinecap="square"
          >
            <title>Grid</title>
            {/* <line x1="0" y1="0.125" x2="100" y2="0.125" /> */}
            <line x1="0" y1="99.875" x2="100" y2="99.875" />
            <line x1="0" y1="12.5" x2="100" y2="12.5" />
            <line x1="0" y1="25" x2="100" y2="25" />
            <line x1="0" y1="37.5" x2="100" y2="37.5" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <line x1="0" y1="62.5" x2="100" y2="62.5" />
            <line x1="0" y1="75" x2="100" y2="75" />
            <line x1="0" y1="87.5" x2="100" y2="87.5" />

            <line x1="12.5" y1="0" x2="12.5" y2="100" />
            <line x1="25" y1="0" x2="25" y2="100" />
            <line x1="37.5" y1="0" x2="37.5" y2="100" />
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="62.5" y1="0" x2="62.5" y2="100" />
            <line x1="75" y1="0" x2="75" y2="100" />
            <line x1="87.5" y1="0" x2="87.5" y2="100" />
          </svg>
          <div
            className="absolute inset-0 z-20 grid place-items-center"
            style={{
              perspective: "250px",
              perspectiveOrigin: "50% 50%;transform-style:preserve-3d",
            }}
          >
            <MotionConfig
              transition={{
                type: "spring",
                stiffness,
                mass,
                damping,
                delay: 0.25,
              }}
            >
              {type === "move" && (
                <motion.div
                  ref={boxRef}
                  key={count}
                  initial={{
                    x: "-100%",
                  }}
                  animate={{
                    x: "100%",
                  }}
                  className="bg-primary size-1/4 rounded-lg"
                />
              )}
              {type === "scale" && (
                <motion.div
                  ref={boxRef}
                  key={count}
                  initial={{
                    scale: 1,
                  }}
                  animate={{
                    scale: 2,
                  }}
                  className="bg-primary size-1/4 rounded-lg"
                />
              )}
              {type === "rotate" && (
                <motion.div
                  ref={boxRef}
                  key={count}
                  initial={{
                    rotate: 0,
                  }}
                  animate={{
                    rotate: 180,
                  }}
                  className="bg-primary size-1/4 rounded-lg"
                />
              )}
            </MotionConfig>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 pb-6">
          <TypeBtn currentType={type} type="move" setTypeAction={setType}>
            <ArrowRightLeft /> Move
          </TypeBtn>

          <TypeBtn currentType={type} type="scale" setTypeAction={setType}>
            <Expand /> Scale
          </TypeBtn>

          <TypeBtn currentType={type} type="rotate" setTypeAction={setType}>
            <Rotate3d /> Rotate
          </TypeBtn>
        </div>
      </div>
    </div>
  );
}

export const TypeBtn = ({
  type,
  currentType,
  setTypeAction,
  children,
}: {
  type: SpringType;
  currentType: SpringType;
  setTypeAction: (type: SpringType) => void;
  children: ReactNode;
}) => {
  return (
    <Button
      variant="outline"
      className={cn("w-full", {
        "text-primary border-primary bg-primary/10 hover:text-primary hover:bg-primary/10":
          type === currentType,
      })}
      onClick={() => setTypeAction(type)}
    >
      {children}
    </Button>
  );
};
