import Link from 'next/link';
import { getProposalFiles } from './lib/mdx/mdxUtils';

function StatusBadge({ status }) {
  const statusClass = {
    'Draft': 'status-draft',
    'Active': 'status-active',
    'Review': 'status-review',
  }[status] || 'status-draft';

  return (
    <span className={`status-badge ${statusClass}`}>
      {status}
    </span>
  );
}

export default function Home() {
  const xipProposals = getProposalFiles('xip');
  const irProposals = getProposalFiles('ir');

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Protocol Proposals
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Explore and contribute to protocol improvements and implementation requests.
            Help shape the future of decentralized technology.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* XIP Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Protocol Improvements</h2>
                <p className="text-gray-400">XIP Proposals</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {xipProposals.map((proposal) => (
                <Link 
                  key={proposal.slug}
                  href={`/proposals/xip/${proposal.slug}`}
                  className="card block group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {proposal.title}
                    </h3>
                    <StatusBadge status={proposal.status} />
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    By {proposal.author} • {proposal.created}
                  </div>
                  {proposal.summary && (
                    <p className="mt-4 text-gray-300">{proposal.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>

          {/* IR Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Implementation Requests</h2>
                <p className="text-gray-400">IR Proposals</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {irProposals.map((proposal) => (
                <Link 
                  key={proposal.slug}
                  href={`/proposals/ir/${proposal.slug}`}
                  className="card block group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {proposal.title}
                    </h3>
                    <StatusBadge status={proposal.status} />
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    By {proposal.author} • {proposal.created}
                  </div>
                  {proposal.summary && (
                    <p className="mt-4 text-gray-300">{proposal.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
