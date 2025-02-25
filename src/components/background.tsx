export default function Background() {
	return (
		<div
			className="fixed h-screen w-screen top-0 -z-1 origin-top"
			style={{
				backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
				backgroundSize: "120px 100px",
				transform: "perspective(1000px) rotateX(25deg) rotateY(0deg)",
			}}
		>
			<div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/50 to-black" />
		</div>
	);
}
