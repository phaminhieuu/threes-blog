import MDXComponents from "@/components/mdx/mdx-components";
import { getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx";
import type { Post as PostType } from "@/types/post";
import { formatDate } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllFilesFrontMatter();

  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

export default async function Post({ params }: Props) {
  const { slug } = await params;

  const source = getFileBySlug(slug);

  if (!source) return;

  const data = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: MDXComponents,
  });

  const content = data.content;
  const frontmatter = data.frontmatter as unknown as PostType;
  const { title, date, updated } = frontmatter;

  return (
    <div>
      <a
        href="/"
        className="text-muted-foreground hover:text-foreground transition-colors italic"
      >
        ← Home
      </a>

      <article className="py-5">
        <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
        <div className="text-muted-foreground mt-2 mb-10">
          {formatDate(new Date(date), "MMMM dd, yyyy")}
        </div>
        <div className="prose prose-invert prose-pre:my-0 prose-pre:px-0 max-w-full prose-code:after:content-none prose-code:before:content-none prose-a:text-primary prose-a:no-underline prose-a:hover:underline">
          {content}
        </div>
      </article>
    </div>
  );
}
