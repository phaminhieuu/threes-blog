import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	useSandpack,
	useSandpackConsole,
	useSandpackNavigation,
} from "@codesandbox/sandpack-react";
import { Maximize, RefreshCw, SkipBack, X } from "lucide-react";

export function RefreshBtn() {
	const { refresh } = useSandpackNavigation();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon" onClick={refresh}>
					<RefreshCw size={14} />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Refresh preview</p>
			</TooltipContent>
		</Tooltip>
	);
}

export function ResetCodeBtn() {
	const { sandpack } = useSandpack();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => {
						sandpack.resetAllFiles();
					}}
				>
					<SkipBack size={14} />
				</Button>
			</TooltipTrigger>
			<TooltipContent>Reset code</TooltipContent>
		</Tooltip>
	);
}

export function ClearConsoleBtn({
	onClear,
}: {
	onClear: () => void;
}) {
	const { reset } = useSandpackConsole({
		resetOnPreviewRestart: true,
	});

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => {
						reset();
						onClear();
					}}
				>
					<X size={18} />
				</Button>
			</TooltipTrigger>
			<TooltipContent>Clear console</TooltipContent>
		</Tooltip>
	);
}

export function FullScreenBtn({ onFullScreen }: { onFullScreen: () => void }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon" onClick={onFullScreen}>
					<Maximize size={14} />
				</Button>
			</TooltipTrigger>
			<TooltipContent>Full screen</TooltipContent>
		</Tooltip>
	);
}
