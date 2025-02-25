import { cn } from "@/lib/cn";

interface Props {
  variant: "info" | "warning" | "danger";
  children: React.ReactNode;
}

export default function Callout({ variant, children }: Props) {
  return (
    <div
      className={cn("border border-l-[5px] px-4 rounded-lg", {
        "border-l-primary bg-primary/10": variant === "info",
        "border-l-destructive bg-destructive/10": variant === "warning",
        "border-l-warning bg-warning/10": variant === "danger",
      })}
    >
      {children}
    </div>
  );
}
