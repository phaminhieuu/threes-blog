import { TooltipProvider } from "@/components/ui/tooltip";
import {
	ClearConsoleBtn,
	FullScreenBtn,
	RefreshBtn,
	ResetCodeBtn,
} from "./custom-sandpack-buttons";
import { cn } from "@/lib/cn";

export type Tab = "preview" | "console";

interface Props {
	currentTab: Tab;
	onTabChange: (tab: Tab) => void;
	onClear: () => void;
	onFullScreen: () => void;
}

export default function Tabs({
	currentTab,
	onTabChange,
	onClear,
	onFullScreen,
}: Props) {
	return (
		<div className="flex items-center justify-between bg-background border-b border-border px-2">
			<div className="flex gap-1 h-[42px] items-center">
				<TabBtn currentTab={currentTab} onTabChange={onTabChange} tab="preview">
					Preview
				</TabBtn>

				<TabBtn currentTab={currentTab} onTabChange={onTabChange} tab="console">
					Console
				</TabBtn>
			</div>

			<div className="flex">
				<TooltipProvider>
					<ResetCodeBtn />
					<RefreshBtn />
					<FullScreenBtn onFullScreen={onFullScreen} />
					<ClearConsoleBtn onClear={onClear} />
				</TooltipProvider>
			</div>
		</div>
	);
}

export const TabBtn = ({
	children,
	currentTab,
	onTabChange,
	tab,
}: {
	children: React.ReactNode;
	currentTab: Tab;
	onTabChange: (tab: Tab) => void;
	tab: Tab;
}) => {
	return (
		<button
			type="button"
			className={cn(
				"hover:text-foreground transition-colors cursor-pointer px-2 text-muted-foreground font-inter",
				{
					"text-primary": currentTab === tab,
				},
			)}
			onClick={() => onTabChange(tab)}
		>
			{children}
		</button>
	);
};
