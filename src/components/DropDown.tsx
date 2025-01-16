import { useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { parseFullName } from "parse-full-name";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ProfileMenu({session}:{session:Session}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pic = session?.user?.image;
  const { first } = parseFullName(session?.user?.name || ' ');
  return (
    <div className="relative">
      {/* Profile Image */}
      <Image
        alt="Profile Image"
        src={ pic || ''}
        className="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center "
        width={40}
        height={40}
        onClick={() => setMenuOpen(!isMenuOpen)}
      />

      {/* Menu */}
      {isMenuOpen && (
        <ul
          role="menu"
          className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 -ml-16  shadow-lg focus:outline-none"
        >
          <li
            role="menuitem"
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-slate-800"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                clipRule="evenodd"
              />
            </svg>
                      <Link href={"/profile"}>
            <p className="text-slate-800 font-medium ml-2">My Profile</p>
                      </Link>
          </li>

          {/* Add other menu items here */}
          <hr className="my-2 border-slate-200" />
          <li
            role="menuitem"
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-slate-800"
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                clipRule="evenodd"
              />
            </svg>
                      <button onClick={()=>signOut()}>
                      
            <p className="text-slate-800 font-medium ml-2">Log Out</p>
                      </button>
          </li>
        </ul>
      )}
    </div>
  );
}
