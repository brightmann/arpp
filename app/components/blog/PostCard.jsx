'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

const PostCard = ({ post, index }) => {
  index *= 0.05

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          delay: index,
          duration: 0.5,
        },
      }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-t-md"
    >
      {/* Image top card */}
      {post.image && (
        <Link
          href={`/${post.url}`}
          className="relative block overflow-hidden group"
        >
          <Image
            src={post.image}
            alt={post.title}
            width={1064}
            height={644}
            className="object-cover object-center h-[400px] !max-w-full duration-300
            transition-all ease-in-out group-hover:scale-[1.05] rounded-t-md"
          />
        </Link>
      )}

      <div className="p-4 bg-[#2F2E2E] rounded-b-md">
        <p className="text-gray-500 mb-3 uppercase text-[12px] tracking-[1px]">
          {format(parseISO(post.date), 'LLL d, yyyy')} • {post.author}
        </p>
        <h3 className="mb-4">
          <Link href={`/${urlWithoutBlog}`} className="text-lg leading-none">
            {post.title}
          </Link>
        </h3>
        <div>
          <Link
            href={`/${urlWithoutBlog}`}
            className="text-white uppercase text-[12px] tracking-[2px] border-b-2
            pb-2 inline-block border-orange-500"
          >
            lire l&apos;article
          </Link>
          <span className="text-orange-500 ml-20 md:ml-32">Lecture 5 min</span>
        </div>
      </div>
    </motion.div>
  )
}

export default PostCard
