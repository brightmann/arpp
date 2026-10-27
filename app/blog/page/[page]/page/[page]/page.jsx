import { allPosts } from 'contentlayer/generated'
import { notFound, redirect } from 'next/navigation'
import BlogListing, {
  POSTS_PER_PAGE,
  blogPageUrl,
} from '@/app/components/blog/BlogListing'

export function generateStaticParams() {
  const pageCount = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  return Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => ({
    page: String(index + 2),
  }))
}

export function generateMetadata({ params }) {
  return {
    title: `Blog - Page ${params.page} - Unlcoaching by Jérémy Prat`,
    alternates: { canonical: blogPageUrl(Number(params.page)) },
  }
}

export default function Page({ params }) {
  if (!/^[1-9]\d*$/.test(params.page)) notFound()
  const page = Number(params.page)
  if (page === 1) redirect('/blog')
  return <BlogListing page={page} />
}
