"use client";
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@nextui-org/react'


const socialMediaLinks = [
  {
    label: 'Tomdieu github account',
    href: 'https://github.com/Tomdieu',
    icon: <Github className="hover:text-blue-500 transition ease-in rounded-sm w-5 h-5" />,
  },
  {
    label: 'Tomdieu Linkedin account',
    href: 'https://www.linkedin.com/in/TomdieuIvan/',
    icon: <Linkedin className="hover:text-blue-500 transition ease-in rounded-sm" />,
  },
  {
    label: 'Tomdieu gmail account',
    href: 'mailto:ivantomdio@gmail.com',
    icon: <Mail className="hover:text-blue-500 transition ease-in rounded-sm" />,
  },
];


const Footer = () => {
  return (
    <footer className="border-t">
      <div className="py-8 px-4 container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col md:flex-row">
            <Image src={"/logo-white.png"} width={500} height={500} alt='Trix Url' className='w-20 h-20' />
           <div>
           <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400 text-sm">
              We are a URL shortener service that helps you shorten your long
              URLs and track their performance.
            </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <p className="text-gray-400 text-sm">
              Email: <a href="mailto:ivantom.python@gmail.com" className='font-bold'>ivantom.python@gmail.com</a>
              <br />
              Address: Yaounde, Cameroon
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-2">
          {socialMediaLinks.map((link, index) => (
        <Link key={index} aria-label={link.label} href={link.href}>
          {link.icon}
        </Link>
      ))}
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-between">
          <p className="flex text-base items-center gap-1">
            <span>&copy; {new Date().getFullYear()}</span>
            <a href="/" className="font-bold">Trix Url</a>
            <div className="w-0.5 my-1 h-3 mx-0.5 bg-gray-400"></div>
            <span>Tomdieu Ivan</span>
            <span>. All rights reserved.</span>
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;