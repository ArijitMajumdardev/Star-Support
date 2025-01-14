'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { parseFullName } from 'parse-full-name';
import { FaSearch } from 'react-icons/fa';
import { Poppins } from 'next/font/google';




const Header = () => {
  const { data: session } = useSession();
  const pic = session?.user?.image;
  const { first } = parseFullName(session?.user?.name || ' ');



  return (
    <>
      <header className={`w-full h-20 bg-white/75 shadow-lg fixed top-0 left-0 z-50 backdrop-blur-sm`}>
        <nav className="w-full max-w-screen-xl mx-auto h-full flex">
          {/* Brand Section */}
          <div className="flex-1 flex items-center justify-center font-semibold text-2xl">
            <Link href="/" className='flex '>
              <Image src={"/soda_icon.png"} alt='logo' width={36} height={36} />
              <span>Buy me a coke</span>
            </Link>
          </div>

          {/* Search Bar Section */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search creator"
                className="w-full py-2 pl-4 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-100"
              />
              <button className="absolute right-3 top-2 text-gray-600  ">
                <FaSearch size={24} className=''/>
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 flex items-center justify-center space-x-6 font-medium">
            <Link href="/about" className="hover:text-red-500 transition duration-300">
              About
            </Link>
            <Link href="/faq" className="hover:text-red-500 transition duration-300">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-red-500 transition duration-300">
              Contact
            </Link>
            {session ? (
              <Link
                href="/profile"
                className="bg-yellow-300 rounded-full py-1 px-4 flex items-center hover:shadow-lg transition duration-300"
              >
                <Image
                  width="38"
                  height="38"
                  src={pic || ''}
                  alt="avatar"
                  className="rounded-full"
                />
                <span className="ml-2 truncate">{first}</span>
              </Link>
            ) : (
              <button
                className="border border-red-300 rounded-full px-4 py-2 hover:bg-red-100 transition duration-300"
                onClick={() => signIn('google')}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>
      <div className="h-20"></div> {/* Spacer to prevent content overlap */}
    </>
  );
};

export default Header;
