"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface Props {
  codeString: string;
}

export default function CopyBtn({ codeString }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      type="button"
      className="absolute right-2 top-2 border bg-background hover:bg-muted p-1.5 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
    >
      {isCopied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
}
