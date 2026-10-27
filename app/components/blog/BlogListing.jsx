import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SubHero from '../about/SubHero'
import Posts from './Posts'
import Subscribe from '../Subscribe'

export const POSTS_PER_PAGE = 5

export const blogPageUrl = (page) =>
  page === 1 ? '/blog' : `/blog/page/${page}`

export default function BlogListing({ page = 1 }) {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  )
  const pageCount = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))

  if (!Number.isSafeInteger(page) || page < 1 || page > pageCount) notFound()

  const currentPosts = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  )
  const linkClass =
    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-4 py-2 bg-orange-600 text-white hover:bg-white hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500'

  return (
    <>
      <SubHero className="pt-32" title="Dernier articles" subTitle="Mon blog" />
      <Posts className="pt-0 pb-12" posts={currentPosts} />
      {pageCount > 1 && (
        <nav
          aria-label="Pagination du blog"
          className="container mx-auto px-4 pb-32"
        >
          <p className="text-center text-white mb-6">
            Page {page} sur {pageCount}
          </p>
          <ul className="flex flex-wrap justify-center items-center gap-3">
            {page > 1 && (
              <li>
                <Link
                  className={linkClass}
                  href={blogPageUrl(page - 1)}
                  rel="prev"
                >
                  Précédent
                </Link>
              </li>
            )}
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (number) => (
                <li key={number}>
                  {number === page ? (
                    <span
                      aria-current="page"
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-4 py-2 bg-white text-orange-600"
                    >
                      {number}
                    </span>
                  ) : (
                    <Link
                      className={linkClass}
                      href={blogPageUrl(number)}
                      aria-label={`Page ${number}`}
                    >
                      {number}
                    </Link>
                  )}
                </li>
              ),
            )}
            {page < pageCount && (
              <li>
                <Link
                  className={linkClass}
                  href={blogPageUrl(page + 1)}
                  rel="next"
                >
                  Suivant
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
      <Subscribe className="py-16 lg:py-32" />
    </>
  )
}
