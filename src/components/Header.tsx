'use client'

import React from 'react'
import Link from "next/link";
import { useSession,signIn,signOut } from 'next-auth/react';
import Image from 'next/image';
import { parseFullName } from 'parse-full-name'

const Header = () => {
  const {data : session , status} = useSession()
  console.log("",session)
  const pic = session?.user.image 
  console.log("pic ", pic)
  const {first} = parseFullName(session?.user.name || ' ')

  return (
      <>
          <header className="w-full h-24 bg-white">
          <nav className="w-full h-full bg-green-300 flex justify-between">
          <div className="h-full w-1/4 bg-yellow-200 font-semibold text-2xl flex justify-center items-center ">
          <Link href="/">Buy me a coke</Link>
          </div>
            <div className="h-full w-2/4   flex justify-around items-center font-medium">
            <Link href="/about">About</Link>
            <Link href="/about">FAQ</Link>
            <Link href="/about">Contact</Link>
            
              
            <div className="w-1/3 flex justify-between ">
              {
                session ? (
                  <>
                     <Link href={'/profile'} className="bg-yellow-300 rounded-full py-1 flex items-center justify-around min-w-20">

                    <Image width="38" height="38"
                      src={session.user?.image as string || ""}
                      // alt={session.user?.name || "User"}
                        alt="avatar"
                      className="rounded-full"
                      />
                      
                     <span className='text-center min-w-16  max-w-20 truncate mr-3 ml-2'> {first}</span>
                   
                  </Link>
                  </>
                ) : (
                    <>
                       <button className="border-2 rounded-full px-6 py-2 " onClick={()=>signIn('google')} >
                    Login
                  </button>
                  <button className="bg-yellow-300 rounded-full px-6 py-2">
                    Sign up
                  </button>

                    </>
                )
              }
             
              </div>
            </div>

          </nav>
        </header>
      </>
  )
}

export default Header