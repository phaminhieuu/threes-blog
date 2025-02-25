import Sandpack from "@/components/mdx/code/sandpack";
import Sphere from "./sphere";

const SCENES: Record<string, any> = {
	scene1: Sphere,
};

interface Props {
	scene: string;
}

export default function PointSphereSandpack({ scene }: Props) {
	return (
		<Sandpack
			template="vanilla-ts"
			dependencies={{
				three: "0.173.0",
			}}
			files={{
				...SCENES[scene],
			}}
		/>
	);
}
