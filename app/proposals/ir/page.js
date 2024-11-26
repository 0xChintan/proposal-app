import Link from 'next/link';
import { getProposalFiles } from '@/app/lib/mdx/mdxUtils';

export default function IRList() {
  const proposals = getProposalFiles('ir');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Implementation Requests (IR)</h1>
      
      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <div key={proposal.slug} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">
              <Link 
                href={`/proposals/ir/${proposal.slug}`}
                className="text-blue-500 hover:text-blue-600"
              >
                {proposal.title}
              </Link>
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div>Status: <span className="font-semibold">{proposal.status}</span></div>
              <div>Author: <span className="font-semibold">{proposal.author}</span></div>
            </div>
            {proposal.summary && (
              <p className="mt-4 text-gray-700">{proposal.summary}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
