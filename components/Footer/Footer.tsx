"use client";
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@nextui-org/react'


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="py-8 px-4">
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

          <div>
            <h2 className="text-xl font-bold mb-4">Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4 sm:gap-2">
            <Link aria-label="Tomdieu github account" href="https://github.com/Tomdieu">
            <Button isIconOnly>
              <Github size={16} className="hover:text-blue-500 transition ease-in rounded-sm" />
              </Button>
            </Link>
            <Link aria-label='Tomdieu Linkein account' href="https://www.linkedin.com/in/TomdieuIvan/">
              <Button isIconOnly>
              <Linkedin size={16} className="hover:text-blue-500 transition ease-in rounded-sm" />
              </Button>
            </Link>
            <Link aria-label='Tomdieu Linkein account' href="mailto:ivantomdio@gmail.com">
              <Button isIconOnly>
              <Mail size={16} className="hover:text-blue-500 transition ease-in rounded-sm" />
              
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-between">
          <p className="flex text-base items-center gap-1">
            <span>&copy; {new Date().getFullYear()}</span>
            <a href="/" className="font-bold">Trix Url</a>
            <div className="w-0.5 my-1 h-3 mx-0.5 bg-gray-400"></div>
            <span>Tomdieu Ivan</span>
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;