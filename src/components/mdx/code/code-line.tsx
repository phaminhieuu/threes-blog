interface Props {
	children: string;
}
export default function CodeLine(props: Props) {
	return (
		<code
			{...props}
			className="p-1 rounded-md border text-primary"
		/>
	);
}
