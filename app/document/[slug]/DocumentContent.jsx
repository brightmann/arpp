'use client'
import React from 'react'
import { motion } from 'framer-motion'

import { getMDXComponent } from 'next-contentlayer/hooks'

const DocumentContent = ({ info }) => {
  let MDXContent
  if (!info) return null

  if (!info) {
    console.log('Info not found')
  } else {
    MDXContent = getMDXComponent(info.body.code)
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
      className="container px-4 mx-auto"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-left max-w-4xl mx-auto">
          {/* Content Article */}
          <article className="text-left prose mx-auto max-w-2xl mt-10 pb-10">
            <MDXContent />
          </article>
        </div>
      </div>
    </motion.div>
  )
}

export default DocumentContent
