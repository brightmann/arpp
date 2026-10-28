'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import IconLogo from './../asset/Icons/logo.svg'
import { motion } from 'framer-motion'
import { BiSolidPaperPlane } from 'react-icons/bi'

const subscribeContent = {
  heading: {
    title: 'Ne manquez jamais une actualité.',
    subtitle: 'Rejoinds la communauté',
    description:
      'Je partage de nombreux conseils et pratique chaques semaines dans mes articles !',
  },
  form: {
    placeholder: 'Entrer ton Email',
  },
}

const Subscribe = ({ className }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage('Merci pour votre abonnement !')
        setEmail('')
      } else {
        setMessage("Erreur lors de l'envoi de l'email. Veuillez réessayer.")
      }
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'email. Veuillez réessayer.")
    }
  }

  return (
    <section className={`${className}`}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-center items-center">
          <Image
            src={IconLogo}
            width={150}
            height={150}
            alt="logo"
            className="rounded-full"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-8/12 flex gap-0">
            <div className="text-center w-screen max-w-md mx-auto ">
              {subscribeContent.heading.subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: true }}
                  className="uppercase tracking-[3px] text-[12.5px] text-slate-600 flex justify-center mt-10"
                >
                  {subscribeContent.heading.subtitle}
                </motion.div>
              )}

              {subscribeContent.heading.title && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3, duration: 0.5 },
                  }}
                  viewport={{ once: true }}
                  className="text-2xl lg:text-3xl text-slate-900"
                >
                  {subscribeContent.heading.title}
                </motion.h2>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-auto justify-center mt-10">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 0.5 },
            }}
            viewport={{ once: true }}
            className="flex relative w-auto max-w-xl mx-auto justify-center gap-5 items-center"
            onSubmit={handleSubmit}
          >
            <input
              className="appearance-none bg-white  py-4 px-7 w-auto lg:w-screen
                !pr-16 mx-w-md shadow-md rounded-md outline outline-none"
              placeholder={subscribeContent.form.placeholder}
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="apperance-none absolute top-1 right-1
              bg-gradient-to-r from-orange-500 to-orange-800 text-[#1D1D1D] shadow-md w-12 h-12 rounded-full flex items-center justify-center"
              alt="submit"
              aria-label="Submit Form"
            >
              <BiSolidPaperPlane />
            </button>
          </motion.form>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.9, duration: 0.5 },
              }}
              viewport={{ once: true }}
              className="w-auto max-w-md mx-auto mt-10 text-center text-slate-600"
            >
              {message}
            </motion.p>
          )}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.9, duration: 0.5 },
            }}
            viewport={{ once: true }}
            className="w-auto max-w-md mx-auto mt-10 text-center text-slate-600"
          >
            {subscribeContent.heading.description}
          </motion.p>
        </div>
      </div>
      <div className="transform-gpu blur-3xl">
        <div className="absolute right-0 bottom-60 opacity-50 -z-50 w-32 h-48 md:w-52 md:h-64 bg-gradient-to-tr from-orange-500 to-orange-800"></div>
      </div>
    </section>
  )
}

export default Subscribe
