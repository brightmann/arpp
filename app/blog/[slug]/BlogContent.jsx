'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { allPosts } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import PostCard from '@/app/components/blog/category/PostCard'
import CardCategory from '@/app/components/CardCategory'

import { getMDXComponent } from 'next-contentlayer/hooks'

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const BlogContent = ({ post }) => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  let MDXContent

  if (!posts) return null

  if (!post) {
    console.log('Blog Post not found')
  } else {
    MDXContent = getMDXComponent(post.body.code)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transistion: {
          delay: 0.2,
          duration: 0.5,
        },
      }}
      viewport={{ once: true }}
      className="pt-44 pb-20 container px-4 mx-auto"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          {/* Content title post */}
          <h2 className="text-slate-900 text-center text-4xl/none lg:text-6xl/none font-medium">
            {post.title}
          </h2>

          <p className="text-slate-500 mt-10 text-center">
            <span className="inline-flex space-x-3">
              <span>{format(parseISO(post.date), 'LLL d, yyyy')}</span>
              <span>•</span>
              <span>{post.author}</span>
            </span>

            <span className="mx-3">•</span>

            {post.categories?.map((category, index) => (
              <Link
                href={`/blog/categories/${slugify(category.title)}`}
                key={category.title}
                className="font-medium hover:text-orange-500"
              >
                {category.title}
                {index < post.categories.length - 1 ? ` | ` : ``}
              </Link>
            ))}
          </p>
        </div>

        {/* Content Image post */}
        {post.image && (
          <div className="mb-16">
            <Image
              src={post.image}
              width={1065}
              height={644}
              className="object-fit object-top rounded-md w-Full md:w-12/12 mx-auto"
              alt={post.title}
            />
          </div>
        )}

        {/* Content Article */}
        <div className="flex">
          <CardCategory className="hidden lg:contents w-3/12 mr-2" />
          <article className="prose mx-auto max-w-3xl">
            <MDXContent />
          </article>
        </div>

        <div className="max-w-5xl mx-auto mt-20 lg:mt-32">
          <h2 className="text-2xl text-gray-700 mb-10">
            Plus d&apos;articles de mon blog
          </h2>

          {/* Card others posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts
              .filter((a) => post.title !== a.title)
              .map((item, index) => {
                if (index > 2) return null
                return <PostCard key={index} index={index} post={item} />
              })}
          </div>

          {/* Btn others post */}
          <div className="flex justify-center mt-10">
            <Link
              href="/blog"
              className="transition-all duration-300 ease-in-out text-[11.5px] tracking-[2px] font-bold uppercase
               bg-gradient-to-r from-orange-500 to-orange-800 hover:transparent hover:border-white py-4 px-5 text-white hover:shadown-2xl rounded-md"
            >
              Voir tous les articles
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogContent
