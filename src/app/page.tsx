import { getServerSession } from "next-auth";
import { authoption } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { signIn } from "next-auth/react";
import GetStartedButton from "@/components/GetStartedButton";


export default async function Home() {
const session = await getServerSession(authoption)
  return (
    <main className="w-full min-h-screen  ">
      <div className="w-full h-[90vh]  flex justify-center">
        <div className="w-4/6 h-full  mx-auto text-center  ">
              <h1 className="text-7xl font-bold pt-40">
              Support Your<br/>
              Creative Journey
            </h1>
            <h2 className="text-xl mt-4 mb-8">
            Welcome support for your work with ease.<br/>
            Making it simple to fund your passion!
          </h2>
          {
            session ?
              (
                <div className=" w-60 mx-auto ">
                   <Link href="/profile" className="flex justify-around items-center  ">
                <button  className="bg-[#FF8383] w-52 px-8 py-5 font-bold rounded-full text-xl ">
            Go to profile
                  </button>
                  <MdOutlineKeyboardArrowRight className="size-6" />
                </Link>
               </div>
            )
            :
            (<GetStartedButton/>)
          }
            {/* <button  className="bg-[#FF8383] px-8 py-5 mt-5 font-bold rounded-full text-xl ">
              Start my page
          </button> */}
          
        </div>
      </div>
    </main>
  );
}
