import Link from 'next/link';

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

export default function ProposalLayout({ children, frontMatter }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Proposals
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white flex-grow">
              {frontMatter.title}
            </h1>
            <StatusBadge status={frontMatter.status} />
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Author: <span className="text-white ml-1">{frontMatter.author}</span>
            </div>
            {frontMatter.created && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Created: <span className="text-white ml-1">{frontMatter.created}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <article className="prose prose-invert max-w-none 
          prose-headings:text-white 
          prose-p:text-gray-300 
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
          prose-strong:text-white
          prose-code:text-indigo-300 prose-code:bg-indigo-950/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-[var(--card)] prose-pre:border prose-pre:border-[var(--border)]
          prose-blockquote:border-l-indigo-500
          prose-li:text-gray-300
        ">
          {children}
        </article>
      </div>
    </div>
  );
}
