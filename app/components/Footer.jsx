'use client'

import React from 'react'
import { BiSolidHeart } from 'react-icons/bi'
import { FaInstagramSquare } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

const footerContent = {
  footerLinks: [
    {
      heading: 'Site Map',
      links: [
        {
          href: '/',
          label: 'Accueil',
        },
      ],
    },
    {
      heading: 'Ressources',
      links: [
        {
          href: '/blog',
          label: 'Blog',
          badge: 'New',
        },
      ],
    },
    {
      heading: 'Performance',
      links: [
        {
          href: 'https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Funlcoaching.com%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo&utm_source=lh-chrome-ext#',
          label: 'LightHouse',
          target: '_Blank',
        },
        {
          href: 'https://www.websitecarbon.com/website/unlcoaching.com',
          label: 'Co²',
          target: '_Blank',
        },
      ],
    },
  ],
}

const Copyright = () => {
  return (
    <div className="pt-2 mb-5 md:mt-5 md:pt-3 border-t border-t-gray-100 text-center text-white ">
      <div className="text-center items-center mx-auto text-sm">
        &copy; 2024{' '}
        <Link href="/" className="text-orange-500">
          Unlcoaching{' '}
        </Link>
        Tous droits réservés. Crée avec{' '}
        <BiSolidHeart className="text-red-400 mx-1 inline-block" />
        par{' '}
        <Link href="#" className="text-orange-500">
          Andy Ramaroson
        </Link>
      </div>
    </div>
  )
}

const Footer = ({ className }) => {
  return (
    <footer className={`${className} overflow-hidden w-full h-full z-[2] `}>
      <div className="container mx-auto px-4 relative mt-10">
        <div className="md:flex ">
          <div className="md:w-4/12 mb-5 md:mb-0">
            <Link href="#" className="text-[28px] text-orange-500 font-bold">
              Unlcoaching
              <span className="text-white">.</span>
            </Link>
            <br />
            <div className="flex mt-5 pr-10">
              <span>
                <Link
                  href="https://www.instagram.com/unlcoaching.school/"
                  className="text-[28px] text-white hover:text-orange-200 font-bold mr-10"
                  alt="Instagrame-iconne"
                >
                  <FaInstagramSquare />
                </Link>
              </span>
              <span>
                <Link
                  href="https://www.facebook.com/Unlcoaching"
                  className="text-[28px] text-white  hover:text-orange-200  font-bold mr-10"
                  alt="facebook-icon"
                >
                  <FaFacebook />
                </Link>
              </span>
            </div>
          </div>

          <div className="md:w-8/12 ">
            <div className="grid grid-cols-2 md:grid-cols-4 ">
              {footerContent.footerLinks.map((item, index) => (
                <div className="mb-5 md:mb-0" key={item.heading}>
                  <h3 className="text-gray-400 mb-3">{item.heading}</h3>
                  <ul className="list-none">
                    {item.links.map((link, index) => (
                      <li className="mb-2" key={link.label}>
                        <Link
                          href={link.href}
                          target={link.target ? '_blank' : null}
                          className={`${
                            link.badge ? 'flex gap-2 items-center' : ''
                          }
                            text-white duration-300 transition-all ease-in-out hover:text-orange-500`}
                        >
                          {link.badge ? (
                            <>
                              <span>{link.label}</span>
                              <span
                                className="py-0.5 px-1 rounded-full bg-orange-100
                                    border border-orange-500 text-[10px] text-orange-500
                                    invisible sm:visible"
                              >
                                {link.badge}
                              </span>
                            </>
                          ) : (
                            link.label
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>{' '}
        {/* Version 2 */}
        <div className="text-right items-right mx-auto text-sm pb-0">
          <Link
            href="/document/privacy"
            className="text-orange-500 hover:text-white"
          >
            Privacy{' '}
          </Link>{' '}
          <Link
            href="/document/terms"
            className="text-white hover:text-orange-500"
          >
            Terms{' '}
          </Link>
        </div>
        <Copyright />
      </div>
      <div className="transform-gpu blur-3xl ">
      <div className="absolute left-0 bottom-0 opacity-50 -z-50 w-32 h-52 md:w-52 md:h-64 bg-gradient-to-tr from-orange-500 to-orange-800"></div>
      <div className="absolute right-0 bottom--1  opacity-100 -z-50 w-52 h-64 bg-gradient-to-tr from-orange-500 to-orange-800"></div>
      </div>
    </footer>
  )
}

export default Footer
