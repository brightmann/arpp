import { render, screen, within } from '@testing-library/react'
import BlogListing, { blogPageUrl } from '@/app/components/blog/BlogListing'
import Page from '@/app/blog/page/[page]/page'

jest.mock('../../.contentlayer/generated/index.mjs', () => ({
  allPosts: Array.from({ length: 12 }, (_, index) => ({
    title: `Post ${index + 1}`,
    date: `2026-10-${String(index + 1).padStart(2, '0')}`,
  })),
}))
jest.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('404')
  },
  redirect: (url) => {
    throw new Error(`redirect:${url}`)
  },
}))
jest.mock('../../app/components/about/SubHero.jsx', () => () => null)
jest.mock('../../app/components/Subscribe.jsx', () => () => null)
jest.mock(
  '../../app/components/blog/Posts.jsx',
  () =>
    function MockPosts({ posts }) {
      return (
        <div>
          {posts.map((post) => (
            <article key={post.title}>{post.title}</article>
          ))}
        </div>
      )
    },
)

describe('Blog pagination', () => {
  it('shows the newest five posts with a real next-page link', () => {
    render(<BlogListing />)
    expect(
      screen.getAllByRole('article').map((node) => node.textContent),
    ).toEqual(['Post 12', 'Post 11', 'Post 10', 'Post 9', 'Post 8'])
    const nav = screen.getByRole('navigation')
    expect(within(nav).getByText('Suivant')).toHaveAttribute(
      'href',
      '/blog/page/2',
    )
    expect(within(nav).queryByText('Précédent')).not.toBeInTheDocument()
    expect(within(nav).getByText('1')).toHaveAttribute('aria-current', 'page')
  })
  it('renders page two independently, with previous and next links', () => {
    render(Page({ params: { page: '2' } }))
    expect(
      screen.getAllByRole('article').map((node) => node.textContent),
    ).toEqual(['Post 7', 'Post 6', 'Post 5', 'Post 4', 'Post 3'])
    expect(screen.getByText('Précédent')).toHaveAttribute('href', '/blog')
    expect(screen.getByText('Suivant')).toHaveAttribute('href', '/blog/page/3')
  })
  it('shows the remaining posts with no next link on the final page', () => {
    render(<BlogListing page={3} />)
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.queryByText('Suivant')).not.toBeInTheDocument()
  })
  it.each(['0', '-1', 'abc', '2.5', '02', '4', '999999999999999999999'])(
    '404s invalid page %s',
    (page) => {
      expect(() => {
        const element = Page({ params: { page } })
        BlogListing(element.props)
      }).toThrow('404')
    },
  )
  it('redirects page one to the canonical blog URL', () => {
    expect(() => Page({ params: { page: '1' } })).toThrow('redirect:/blog')
    expect(blogPageUrl(1)).toBe('/blog')
  })
})
