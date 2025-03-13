import { getAllFilesFrontMatter } from "@/lib/mdx";
import { formatDate } from "date-fns";

export default function Home() {
  const posts = getAllFilesFrontMatter();

  return (
    <div>
      <div className="flex items-center gap-4">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 512 512"
          preserveAspectRatio="xMidYMid meet"
        >
          <title>Logo</title>
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill="currentColor"
            stroke="none"
          >
            <path d="M2460 5107 c-19 -7 -435 -224 -925 -481 -678 -356 -899 -477 -927 -506 -89 -92 -82 -241 14 -326 19 -17 440 -245 935 -507 665 -352 914 -479 947 -483 30 -4 61 -1 93 9 26 9 453 227 948 486 664 346 909 479 938 507 88 88 84 238 -10 326 -28 26 -1806 953 -1872 976 -43 15 -96 15 -141 -1z" />
            <path d="M447 3446 c-60 -17 -115 -60 -144 -116 l-23 -43 0 -1091 c0 -1034 1 -1093 19 -1131 10 -22 33 -54 52 -70 42 -37 1686 -973 1731 -986 103 -29 217 23 271 125 l22 41 0 1105 0 1105 -22 46 c-13 25 -35 57 -50 71 -23 21 -1477 819 -1673 918 -70 35 -122 43 -183 26z" />
            <path d="M4565 3451 c-40 -10 -11 5 -920 -488 -440 -239 -815 -449 -832 -466 -72 -68 -68 3 -68 -1222 l0 -1100 22 -41 c48 -90 146 -143 240 -130 53 7 27 -7 568 301 231 131 584 332 785 446 201 114 382 222 404 240 21 18 47 51 57 73 18 39 19 90 19 1129 0 1176 3 1117 -54 1184 -47 56 -152 91 -221 74z" />
          </g>
        </svg>

        <p className="text-xl">Learning, crafting and sharing.</p>
      </div>

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
