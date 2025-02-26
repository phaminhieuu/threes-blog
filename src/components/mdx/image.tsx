"use client";

import NextImage, { type ImageProps } from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/cn";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

const RootImage = (props: ImageProps) => {
  return (
    <NextImage
      {...props}
      className={cn(
        "w-full object-cover h-auto border rounded-lg",
        props.className,
      )}
      sizes="(max-width: 768px) 120vw,
             75vw"
    />
  );
};

export default function Image(props: ImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <RootImage {...props} className="cursor-zoom-in" />
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="md:w-[80dvw] w-[97dvw] sm:max-w-6xl p-0 cursor-zoom-out overflow-hidden focus:outline-none"
      >
        <VisuallyHidden>
          <DialogTitle>{props.alt}</DialogTitle>
        </VisuallyHidden>
        <RootImage
          {...props}
          className="w-[80dvw] md:w-[97dvw]"
          onClick={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
