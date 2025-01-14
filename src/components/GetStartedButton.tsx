"use client";

import { signIn } from "next-auth/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function GetStartedButton() {
  return (
    <div className="w-60 mx-auto flex justify-around items-center">
      <button
        className="bg-[#FF8383] w-52 px-8 py-5 font-bold rounded-full text-xl text-white shadow-md hover:shadow-lg transition-all"
        onClick={() => signIn("google")}
      >
        Get Started
      </button>
      <MdOutlineKeyboardArrowRight className="size-6" />
    </div>
  );
}
