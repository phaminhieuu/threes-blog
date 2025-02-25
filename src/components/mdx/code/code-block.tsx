import CopyBtn from "@/components/copy-btn";
import { highlightCode } from "@/lib/shiki";

interface Props {
  children: {
    props: {
      children: string;
      className: string;
    };
  };
}

export default async function CodeBlock({ children }: Props) {
  const { children: codeString, className } = children.props;

  const lang = className?.replace(/language-/, "");

  const html = await highlightCode(codeString.trim(), lang);

  return (
    <div className="relative group border rounded-md">
      <CopyBtn codeString={codeString.trim()} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
