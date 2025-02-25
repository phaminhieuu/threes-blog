import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "@/types/post";

const root = process.cwd();

export const getFileBySlug = (slug: string) => {
	const contentDir = path.join(root, "src/contents");
	const fileName = `${slug}.mdx`;
	const filePath = path.join(contentDir, fileName);

	try {
		const fileContent = fs.readFileSync(filePath, "utf8");
		return fileContent;
	} catch (err) {
		console.log(err);
		console.error("File not found");
		return null;
	}
};

export const getAllFilesFrontMatter = () => {
	const files = fs.readdirSync(path.join(root, "src/contents"));

	const posts = files
		.map((post) => {
			const source = fs.readFileSync(
				path.join(root, "src/contents", post),
				"utf8",
			);

			const parsed = matter(source);

			return parsed.data as Post;
		})
		.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

	return posts;
};
