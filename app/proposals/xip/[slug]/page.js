import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProposalContent } from '@/app/lib/mdx/mdxUtils';
import ProposalLayout from '@/app/components/ProposalLayout/ProposalLayout';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
    format: 'mdx',
  },
};

export default async function ProposalPage({ params }) {
  const { frontMatter, content } = getProposalContent('xip', params.slug);

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Proposal Not Found</h1>
        <p>The requested proposal could not be found.</p>
      </div>
    );
  }

  return (
    <ProposalLayout frontMatter={frontMatter}>
      <MDXRemote source={content} options={options} />
    </ProposalLayout>
  );
}
