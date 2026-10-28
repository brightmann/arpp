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
      className="relative overflow-hidden"
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

      <div className="p-4 bg-white border border-t-0 border-gray-200 rounded-b-md">
        <p className="text-gray-500 mb-3 uppercase text-[12px] tracking-[1px]">
          {format(parseISO(post.date), 'LLL d, yyyy')} • {post.author}
        </p>
        <h3 className="mb-4">
          <Link
            href={`/${post.url}`}
            className="text-orange-500 text-lg leading-none"
          >
            {post.title}
          </Link>
        </h3>

        <div>
          <Link
            href={`/${post.url}`}
            className={`text-gray-500 hover:text-orange-500 text-[12px] tracking-[2px] uppercase
            pb-2 inline-block  duration-300 transistion-all bg-white-600
            ease-in-out relative before:content-['']
            before:absolute before:bottom-0 before:left-0 before:w-full
            before:h-[2px] before:bg-gradient-to-r from-orange-500 to-orange-800 before:origin-[100%, 50%]
            before:transistion-all before:duration-300 before:ease-in-out
            before:scale-x-0 before:scale-y-[1] before:scale-z[1]
            before:wil-change-transform hover:before:origin-[100%, 0%]
            hover:before:scale-x-[1] hover:before:scale-y-[1]
            hover:before:scale-z-[1] `}
          >
            lire l&apos;article
          </Link>
          <span className="text-orange-500 ml-20">Lecture 5 min</span>
        </div>
      </div>
    </motion.div>
  )
}

export default PostCard
