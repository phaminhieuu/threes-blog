import { getAllFilesFrontMatter } from "@/lib/mdx";
import { formatDate } from "date-fns";

export default function Home() {
	const posts = getAllFilesFrontMatter();

	return (
		<div>
			<p className="text-xl">Learning, crafting and sharing.</p>

			<div className="space-y-10 mt-10 group">
				<div className="space-y-5 py-5 border-t">
					<p>2025</p>

					<ul className="space-y-5">
						{posts.map((post) => (
							<li className="flex gap-10 text-muted-foreground" key={post.slug}>
								<div className="w-14">
									{formatDate(new Date(post.date), "MMM dd")}
								</div>

								<a
									href={`/posts/${post.slug}`}
									className="hover:text-foreground transition-colors"
								>
									{post.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
