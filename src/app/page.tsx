import { getServerSession } from "next-auth";
import { authoption } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GetStartedButton from "@/components/GetStartedButton";

export default async function Home() {
  const session = await getServerSession(authoption);

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="w-4/6 mx-auto text-center">
          <h1 className="text-7xl font-bold pt-40 text-gray-800 leading-tight">
            Support Your<br />
            <span className="text-yellow-500">Creative Journey</span>
          </h1>
          <h2 className="text-xl mt-4 mb-8 text-gray-600">
            Welcome support for your work with ease.<br />
            Making it simple to fund your passion!
          </h2>
          {session ? (
            <div className="w-60 mx-auto">
              <Link
                href="/profile"
                className="flex justify-around items-center gap-2"
              >
                <button className="bg-[#FF8383] w-52 px-8 py-5 font-bold rounded-full text-xl text-white shadow-md hover:shadow-lg transition-all">
                  Go to profile
                </button>
                <MdOutlineKeyboardArrowRight className="w-6 h-6 text-gray-800" />
              </Link>
            </div>
          ) : (
            <GetStartedButton />
          )}
        </div>
      </div>
    </main>
  );
}
