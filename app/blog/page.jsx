import BlogListing from '../components/blog/BlogListing'

export const metadata = {
  title: 'Blogs - Unlcoaching by Jérémy Prat',
  alternates: { canonical: '/blog' },
}

export default function Page() {
  return <BlogListing />
}
