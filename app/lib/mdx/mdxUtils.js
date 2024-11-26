import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper function to format dates
function formatDate(date) {
  if (!date) return undefined;
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return date;
}

// Helper function to format frontmatter data
function formatFrontmatter(data) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = value instanceof Date ? formatDate(value) : value;
    return acc;
  }, {});
}

export function getProposalFiles(type) {
  try {
    const proposalsDirectory = path.join(process.cwd(), 'proposals', type);
    const fileNames = fs.readdirSync(proposalsDirectory);
    
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const fullPath = path.join(proposalsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug: fileName.replace(/\.mdx$/, ''),
          ...formatFrontmatter(data),
        };
      });
  } catch (error) {
    console.error(`Error reading ${type} proposals:`, error);
    return [];
  }
}

export function getProposalContent(type, slug) {
  try {
    const fullPath = path.join(process.cwd(), 'proposals', type, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      frontMatter: formatFrontmatter(data),
      content,
    };
  } catch (error) {
    console.error(`Error reading proposal ${slug}:`, error);
    return {
      frontMatter: {},
      content: '',
    };
  }
}
